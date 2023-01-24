import React from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";
function Parent() {
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
      if (user.type == "secretary") {
        navigate("/secretary");
      }
      if (user.type != "parent") {
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

export default Parent;
