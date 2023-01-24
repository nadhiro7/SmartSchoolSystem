import React from "react";
import Routes from "./../../Routes/VisitorRouter";
import { useNavigate } from "react-router-dom";

function Visitor() {
  const navGate = React.useCallback((user)=>{
      if(user){
          console.log(user["type"])
          if ( user.type == 'admin' )
          {
              navigate( '/admin' );
          } else if ( user.type == 'secretary' )
          {
              navigate( '/secretary' );
          } else if ( user.type == 'teacher' )
          {
              navigate( '/teacher' );
          } else if ( user.type == 'parent' )
          {
              navigate( '/parent' );
          }
      }
  })
  const navigate = useNavigate();
  React.useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'));
      navGate(user)
  },[])
  return <Routes />;
}

export default Visitor;
