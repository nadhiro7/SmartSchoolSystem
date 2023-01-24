import React from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "./App";
function Index() {
  const navGate = React.useCallback((user) => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.type == "teacher") {
        navigate("/teacher");
      }
      if (user.type == "admin") {
        navigate("/admin");
      }
      if (user.type == "parent") {
        navigate("/parent");
      }
      if (user.type != "secretary") {
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

export default Index;
