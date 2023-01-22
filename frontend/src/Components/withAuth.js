import React from "react";
// import { Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";

const withAuth = (Component) => {
    const AuthRoute = () => {
        const isAuth = !!localStorage.getItem("UserData");
        console.log(isAuth)
        if (isAuth) {
            return <Component />;
        }
         else {
            return <Navigate to="/SignIn" />;
        }
    };

    return AuthRoute;
};

export default withAuth