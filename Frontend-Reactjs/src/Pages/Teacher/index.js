import React from "react";
import App from "./App";
import { BrowserRouter, useNavigate } from "react-router-dom";

function Teacher() {
  const navGate = React.useCallback((user) => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.type == "parent") {
        navigate("/parent");
      }
      if (user.type == "admin") {
        navigate("/admin");
      }
      if (user.type == "secretary") {
        navigate("/secretary");
      }
      if (user.type != "teacher") {
        navigate("/login");
      }
    }
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    navGate(user);
  }, []);
  return <App />;
}

export default Teacher;
