<?php

namespace App\Actions\Fortify;

use App\Models\User;
use lluminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;


class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input , Request $request)
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

         $user = new User;
        $user ->firstname = $request->firstname;
        $user ->lastname = $request->lastname;
        $user ->username = $request->username;
        $user ->phone = $request->phone;
        $user ->image = $request->image;
        $user ->gender = $request->gender;
        $user ->email = $request->email;
        $user ->type = $request->type;
        $user ->password = $request->password;
        $user ->birthday = $request->birthday;
        $user ->address = $request->address;

        $user->save();
        return $user;
    }
}
