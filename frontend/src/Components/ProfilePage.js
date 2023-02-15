import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import withAuth from './withAuth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useMatch, useNavigate
} from "react-router-dom";
import SignIn from './SignIn';
// import { Link } from 'react-router-dom';


const ProfilePage = () => {
    let navigate = useNavigate();
    const func = (e) => {
        if (e.target.id === 'Followers') {
            navigate('/ProfilePage/Followers')
        }
        else if (e.target.id === 'Following') {
            navigate('/ProfilePage/Following')
        }
    }
    const [User_data, SetUser_data] = useState({})
    const [Following_Number, SetFollowing_Number] = useState(0)
    const [Followers_Number, SetFollowers_Number] = useState(0)


    useEffect(() => {
        let string_saved_in_local_storage = localStorage.getItem('UserData')
        console.log(string_saved_in_local_storage)

        SetUser_data(JSON.parse(string_saved_in_local_storage))
        console.log(User_data)
        const GetFollowersandFollowing = async () => {
            let res = await fetch('http://localhost:100/api/GetFollowersandFollowing', {
                method: "POST",
                body: JSON.stringify({
                    UserName: JSON.parse(localStorage.getItem('UserData')).UserName
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            let x = await res.json()
            console.log(x)
            console.log(x.Followers_length)
            console.log(x.Following_length)
            SetFollowers_Number(x.Followers_length)
            SetFollowing_Number(x.Following_length)

        }
        GetFollowersandFollowing()


    }, [])
    // let { path, url } = useMatch();
    let followers = 10;
    return (
        <div className='w-full'><section style={{ backgroundColor: '#eee' }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                            <h2>Profile</h2>
                            {/* <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">User</a></li>
                                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                            </ol> */}
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                {/* <h5 className="my-3">John Smith</h5> */}
                                <h5 className="my-3">{User_data.UserName}</h5>
                                <p className="text-muted mb-1">Full Stack Developer</p>
                                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="btn btn-info">Follow</button>
                                    <button type="button" className="btn btn-outline-info ms-1">Message</button>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fas fa-globe fa-lg text-warning" />
                                        <p className="mb-0">https://mdbootstrap.com</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-github fa-lg" style={{ color: '#333333' }} />
                                        <p className="mb-0">mdbootstrap</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }} />
                                        <p className="mb-0">@mdbootstrap</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }} />
                                        <p className="mb-0">mdbootstrap</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }} />
                                        <p className="mb-0">mdbootstrap</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{User_data.FirstName} {User_data.LastName}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{User_data.Email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Phone</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">(+91) {User_data.PhoneNumber}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Age</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{User_data.Age}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Password</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">********</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-3'>
                            <button type="button" onClick={func} id="Followers" className="btn btn-info p-4 mx-5">Followers: {Followers_Number}</button>
                            <button type="button" onClick={func} id='Following' className="btn btn-info p-4 ">Following: {Following_Number}</button>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-4 mb-md-0">
                                    <div className="card-body">
                                        <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                        </p>
                                        <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                                        <div className="progress rounded" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                                        <div className="progress rounded" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
                                        <div className="progress rounded" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                                        <div className="progress rounded" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                                        <div className="progress rounded mb-2" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card mb-4 mb-md-0">
                                    <div className="card-body">
                                        <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                        </p>
                                        <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                                        <div className="progress rounded" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</p>
                                        <div className="progress rounded" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</p>
                                        <div className="progress rounded" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</p>
                                        <div className="progress rounded" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</p>
                                        <div className="progress rounded mb-2" style={{ height: '5px' }}>
                                            <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default withAuth(ProfilePage)