import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import withAuth from './withAuth';


const SignUp = () => {
    let navigate = useNavigate()
    const [FirstName, SetFirstName] = useState('')
    const [LastName, SetLastName] = useState('')
    const [Age, SetAge] = useState(0)
    const [UserName, SetUSerName] = useState('')
    const [Password, SetPassword] = useState('')
    const [Email, SetEmail] = useState('')
    const [PhoneNumber, SetPhoneNumber] = useState(0)

    const change = (e) => {


        if (e.target.id === 'SignUpFirstName') {
            SetFirstName(e.target.value)
        }
        else if (e.target.id === 'SignUpAge') {
            SetAge(e.target.value)
        }
        else if (e.target.id === 'SignUpPassword') {
            // let PasswordLength = e.target.value.length
            SetPassword(e.target.value)
        } else if (e.target.id === 'SignUpUserName') {
            SetUSerName(e.target.value)
        } else if (e.target.id === 'SignUpEmail') {
            SetEmail(e.target.value)
        } else if (e.target.id === 'SignUpPhoneNumber') {
            SetPhoneNumber(e.target.value)
        } else if (e.target.id === 'SignUpLastName') {
            SetLastName(e.target.value)
        }
    }
console.log(FirstName)
    const posttoexpress = (e) => {
        if ((FirstName === '') || (Age === 0) || (Password === '') || (LastName === '') || (PhoneNumber === 0) || (Email === '') || (UserName === '')) {
            alert("fill all fields")
        }
        else {
            e.preventDefault();
            fetch('http://localhost:100/SignUp', {
                method: 'POST',
                body: JSON.stringify({
                    "FirstName": FirstName,
                    "LastName": LastName,
                    "Age": Age,
                    "Password": Password,
                    "UserName": UserName,
                    "Email": Email,
                    "PhoneNumber": PhoneNumber
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    SetFirstName('');
                    SetLastName('');
                    SetUSerName('')
                    SetAge(0);
                    SetEmail('');
                    SetPhoneNumber(0)
                    SetPassword('')
                })
                .catch((err) => {
                    console.log(err.message);
                });
            navigate('/SignIn?signin')
        }
    }
    return (
        <div className='w-full'>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" onChange={change} id="SignUpFirstName" value={FirstName} className="form-control form-control-lg" required />
                                                    <label className="form-label" htmlFor="firstName">First Name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 ">
                                                <div className="form-outline">
                                                    <input type="text" onChange={change} id="SignUpLastName" value={LastName} className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="lastName">Last Name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                    <input type="text" onChange={change} className="form-control form-control-lg" id="SignUpUserName" value={UserName} required='required' />
                                                    <label htmlFor="birthdayDate" className="form-label">Username</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <input type="text" onChange={change} className="form-control form-control-lg" id="SignUpAge" value={Age} required />
                                                <label htmlFor="birthdayDate" className="form-label">Age</label>


                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="email" id="SignUpEmail" onChange={change} value={Email} className="form-control form-control-lg" required />
                                                    <label className="form-label" htmlFor="emailAddress">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <input type="tel" onChange={change} id="SignUpPhoneNumber" value={PhoneNumber} className="form-control form-control-lg" required />
                                                    <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="form-group col-md-6 ">
                                                <input type="password" onChange={change} name="password" className="form-control" id="SignUpPassword" value={Password} placeholder="Password" required />
                                                <label Htmlfor="inputPassword4">Password</label>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-2">
                                            <input onClick={posttoexpress} className="btn btn-primary btn-lg" type="submit" defaultValue="Submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section></div>
    )
}

export default SignUp