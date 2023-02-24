import React from "react";
// import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import withAuth from './withAuth';



const withAuth = (Component) => {
    const AuthRoute = () => {
        console.log(Component.URL)
        let navigate = useNavigate()

        const isAuth = !!localStorage.getItem("UserData");
        console.log(isAuth)
        if (isAuth) {
            return <Component/>;
        }
        else {
            return <Navigate to={navigate({
                pathname: '/SignIn',
                search: '?signin',
            })} />;
        }
    };

    return AuthRoute;
};

export default withAuth