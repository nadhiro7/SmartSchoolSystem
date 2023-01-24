import React from 'react';
export const themes = {
    dark: "dark",
    light: "light",
};

export const ThemeContext = React.createContext( {
    theme: themes.dark,
    changeTheme: () => { },
} );
