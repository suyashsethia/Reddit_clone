import React, { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';

const SignIn = () => {
    const [Error, SetError] = useState("start")


    // fetch('http://localhost:100/SignIn')
    //     .then(res => res.json())
    //     .then(data => (SetError(data)))
    //     .then(console.log(Error))




    const [Email, SetEmail] = useState("")
    const [Password, SetPassword] = useState("")

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
        SetError(response.error)
        console.log(Error)
            // .then((res) => res.json())
            // (data => (SetError(data.error)
            // .then(console.log(Error))
            // .then(() => {
            //     SetEmail('');
            //     SetPassword('');
            // })
            // .catch((err) => {
            //     console.log(err.message);
            // });

    }
    return (
        <div>
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
                                            <div className="form-outline mb-4">
                                                <input onChange={change} value={Email} type="email" id="SignInEmail" className="form-control" />
                                                <label className="form-label" id="a" htmlFor="form3Example3 inputEmail4">Email address</label>
                                            </div>
                                            {/* Password input */}
                                            <div className="form-outline mb-4">
                                                <input value={Password} onChange={change} type="password" id="SignInPassword" className="form-control" />
                                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                            </div>
                                            {/* Checkbox */}
                                            <div className="form-check d-flex justify-content-center mb-4">
                                                <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example33" defaultChecked />
                                                <label className="form-check-label" htmlFor="form2Example33">
                                                    Remember Me
                                                </label>
                                            </div>
                                            {/* Submit button */}
                                            <button onClick={posttoexpress} type="submit" className="btn btn-primary btn-block mb-4">
                                                Sign in
                                            </button>
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