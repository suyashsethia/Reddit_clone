import React from 'react'
import { useLocation } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
const Auth = () => {
    let location = useLocation()
    console.log(location)
    // let navigate = useNavigate();
    if (location.search === "?signin") {
        return (
            <SignIn></SignIn>
        )
    }
    else if (location.search === '?signup') {
        return (
            <SignUp></SignUp>
        )
    }
}

export default Auth