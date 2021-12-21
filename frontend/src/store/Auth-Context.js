import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  checkAuth: () => {},
  isLoggedIn: null,
  onLogin: (token, user) => {},
  onLogout: () => {},
  userData: {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState({});

  const checkAuth = async () => {
    if (localStorage.getItem("token")) {
      let response;
      try {
        response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}auth/validateToken`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setUserData(responseData.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserData(undefined);
      }
    } else {
      setIsLoggedIn(false);
      setUserData(undefined);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(undefined);
  };

  const loginHandler = (token, user) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUserData(user);
  };

  return (
    <AuthContext.Provider
      value={{
        checkAuth,
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        userData
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
