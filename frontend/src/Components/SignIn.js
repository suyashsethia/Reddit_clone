import React, { useRef, useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
// import Alert from './BasicAlert';/
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import withAuth from './withAuth';



const SignIn = () => {

    let navigate = useNavigate()
    // const [Error, SetError] = useState("start")
    const [Email, SetEmail] = useState("")
    const [Password, SetPassword] = useState("")
    const ref = React.useRef(null)
    const log = () => {
        // console.log(this.state)
        console.log(Email)
        console.log(Password)
    }


    const change = (e) => {

        if (e.target.id === 'SignInEmail') {
            SetEmail(e.target.value)
        }
        else if (e.target.id === 'SignInPassword') {

            SetPassword(e.target.value)
        }
    }

    const posttoexpress = async (e) => {
        if ((Password === '') || (Email === '')) {
            const notify = () => toast.error("Fill all fields")
            // toast.error("Fill all fields")
            // alert("fill all fields")
            notify()
        }
        else {

            e.preventDefault();
            let res = await fetch('http://localhost:100/SignIn', {
                method: 'POST',
                body: JSON.stringify({
                    "Email": Email,
                    "Password": Password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            let response = await res.json()
            // SetError(response.error)
            // console.log(Error)Na
            // let error = response.error
            console.log(response.error)
            console.log(response.User_data)

            if (response.error === "Correct Login id") {


                localStorage.setItem("UserData", JSON.stringify(response.User_data))



                // alert("correct")


                // <ToastContainer>
                //     toast.success("Correct Login id")
                // </ToastContainer>
                toast.success("Correct Login id")
                navigate("/ProfilePage")

            }
            else {
                toast.error(response.error)
                // const notify = () => toast.error(response.error)
                // notify()
                // alert(response.error)
            }

            // toast("WOW")
            {/* Same as */ }
            SetEmail('');
            SetPassword('');

        }
    }
    return (
        <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            <section className>

                {/* Jumbotron */}
                <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
                    <div className="container">
                        <div className="row gx-lg-5 align-items-center">
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <h1 className="my-5 display-3 fw-bold ls-tight">
                                    The best offer <br />
                                    <span className="text-primary">for your business</span>
                                </h1>
                                <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                                    quibusdam tempora at cupiditate quis eum maiores libero
                                    veritatis? Dicta facilis sint aliquid ipsum atque?
                                </p>
                            </div>
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <div className="card">
                                    <div className="card-body py-5 px-md-5">
                                        <form>
                                            {/* 2 column grid layout with text inputs for the first and last names */}
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    {/* <div className="form-outline">
                                                        <input type="text" id="form3Example1" className="form-control" />
                                                        <label className="form-label" htmlFor="form3Example1">First name</label>
                                                        </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                        <input type="text" id="form3Example2" className="form-control" />
                                                        <label className="form-label" htmlFor="form3Example2">Last name</label>
                                                    </div> */}
                                                </div>
                                            </div>
                                            {/* Email input */}
                                            <div className="text-center form-outline mb-4">
                                                <input onChange={change} value={Email} type="email" id="SignInEmail" className="form-control" required />
                                                <label className="form-label" id="a" htmlFor="form3Example3 inputEmail4">Email address</label>
                                            </div>
                                            {/* Password input */}
                                            <div className="text-center form-outline mb-4">
                                                <input value={Password} onChange={change} type="password" id="SignInPassword" className="form-control" required />
                                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                            </div>
                                            {/* Checkbox */}
                                            {/* <div className="form-check d-flex justify-content-center mb-4">
                                                <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example33" defaultChecked />
                                                <label className="form-check-label" htmlFor="form2Example33">
                                                Remember Me
                                                </label>
                                            </div> */}
                                            {/* div for alert  */}
                                            <div ref={ref}>

                                            </div>
                                            {/* Submit button */}
                                            <div className="text-center">
                                                <button onClick={posttoexpress} type="submit" className=".justify-content-center .text-center btn btn-primary btn-block mb-4">
                                                    Sign in
                                                </button>
                                            </div>
                                            {/* Register buttons */}
                                            <div className="text-center">
                                                <p>or sign  with:</p>
                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-facebook-f" />
                                                </button>
                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-google" />
                                                </button>
                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-twitter" />
                                                </button>
                                                <button type="button" className="btn btn-link btn-floating mx-1">
                                                    <i className="fab fa-github" />
                                                </button>
                                            </div>
                                            <div className="text-center">

                                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/SignIn?signup"
                                                    className="link-danger">SignUp</Link></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Jumbotron */}
            </section></div>
    )
}

export default SignIn