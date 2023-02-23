// import React, { useEffect } from 'react'
// // import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import withAuth from './withAuth';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import SignIn from './SignIn';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useParams,
//     useMatch, useNavigate
// } from "react-router-dom";
// // import { set } from 'mongoose';
// // import { Link } from 'react-router-dom';




// const ProfilePage = () => {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);

//     const Editrequest = async () => {
//         setShow(true);
//         let res = await fetch('http://localhost:100/api/EditDetails', {
//             method: 'POST',
//             body: JSON.stringify({
//                 "UserName": User_data.UserName,
//                 "Email": User_data.Email,
//                 "Password": User_data.Password,
//                 "FirstName": User_data.FirstName,
//                 "LastName": User_data.LastName,
//                 "Age": User_data.Age,
//                 "PhoneNumber": User_data.PhoneNumber,
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//         })


//         let x = await res.json()
//         console.log(x.status)
//         if (x.success) {
//             localStorage.setItem('UserData', JSON.stringify(User_data))
//             console.log('success')
//             toast.success('Details Updated Successfully')
//         }
//         else {
//             console.log('fail')
//             SetUser_data(JSON.parse(localStorage.getItem('UserData')))
//             toast.error('Details Update Failed')
//         }
//     }
//     const handleShow = () => {
//         setShow(true);


//     }
//     let navigate = useNavigate();
//     const func = (e) => {
//         if (e.target.id === 'Followers') {
//             navigate('/ProfilePage/Followers')
//         }
//         else if (e.target.id === 'Following') {
//             navigate('/ProfilePage/Following')
//         }
//     }
//     const [User_data, SetUser_data] = useState({})
//     const [Following_Number, SetFollowing_Number] = useState(0)
//     const [Followers_Number, SetFollowers_Number] = useState(0)


//     useEffect(() => {
//         let string_saved_in_local_storage = localStorage.getItem('UserData')
//         // console.log(string_saved_in_local_storage)
//         let user = JSON.parse(localStorage.getItem('UserData'))
//         SetUser_data(user)
//         console.log("User_data",User_data)
//         const GetFollowersandFollowing = async () => {
//             let res = await fetch('http://localhost:100/api/GetFollowersandFollowing', {
//                 method: "POST",
//                 body: JSON.stringify({
//                     "UserName": User_data.UserName
//                 }),
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             })

//             let x = await res.json()
//             console.log(x)
//             console.log(x.Followers_length)
//             console.log(x.Following_length)
//             SetFollowers_Number(x.Followers_length)
//             SetFollowing_Number(x.Following_length)

//         }
//         GetFollowersandFollowing()

//     }, [])
//     // let { path, url } = useMatch();
//     let followers = 10;
//     return (

//         <div className='w-full'><section style={{ backgroundColor: '#eee' }}>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//             <div className="container py-5">
//                 <div className="row">
//                     <div className="col">
//                         <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
//                             <h2>Profile</h2>
//                             {/* <ol className="breadcrumb mb-0">
//                                 <li className="breadcrumb-item"><a href="#">Home</a></li>
//                                 <li className="breadcrumb-item"><a href="#">User</a></li>
//                                 <li className="breadcrumb-item active" aria-current="page">User Profile</li>
//                             </ol> */}
//                         </nav>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-lg-4">
//                         <div className="card mb-4">
//                             <div className="card-body text-center">
//                                 <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
//                                 {/* <h5 className="my-3">John Smith</h5> */}
//                                 <h5 className="my-3">{User_data.UserName}</h5>
//                                 <p className="text-muted mb-1">Full Stack Developer</p>
//                                 <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
//                                 <div className="d-flex justify-content-center mb-2">
//                                     <button type="button" className="btn btn-info">Follow</button>
//                                     <button type="button" className="btn btn-outline-info ms-1">Message</button>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                     <div className="col-lg-8">
//                         <div className="card mb-4">
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="col-sm-3">
//                                         <p className="mb-0">Full Name</p>
//                                     </div>
//                                     <div className="col-sm-9">
//                                         <p className="text-muted mb-0">{User_data.FirstName} {User_data.LastName}</p>
//                                     </div>
//                                 </div>
//                                 <hr />
//                                 <div className="row">
//                                     <div className="col-sm-3">
//                                         <p className="mb-0">Email</p>
//                                     </div>
//                                     <div className="col-sm-9">
//                                         <p className="text-muted mb-0">{User_data.Email}</p>
//                                     </div>
//                                 </div>
//                                 <hr />
//                                 <div className="row">
//                                     <div className="col-sm-3">
//                                         <p className="mb-0">Phone</p>
//                                     </div>
//                                     <div className="col-sm-9">
//                                         <p className="text-muted mb-0">(+91) {User_data.PhoneNumber}</p>
//                                     </div>
//                                 </div>
//                                 <hr />
//                                 <div className="row">
//                                     <div className="col-sm-3">
//                                         <p className="mb-0">Age</p>
//                                     </div>
//                                     <div className="col-sm-9">
//                                         <p className="text-muted mb-0">{User_data.Age}</p>
//                                     </div>
//                                 </div>
//                                 <hr />
//                                 <div className="row">
//                                     <div className="col-sm-3">
//                                         <p className="mb-0">Password</p>
//                                     </div>
//                                     <div className="col-sm-9">
//                                         <p className="text-muted mb-0">********</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="editmodal">
//                             <Button variant="primary" onClick={handleShow}>
//                             Edit Details
//                             </Button>

//                             <Modal show={show} onHide={handleClose}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>Edit Details</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <Form>
//                                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                             <Form.Label>UserName (unchangable)</Form.Label>
//                                             <Form.Control
//                                                 type="Name"
//                                                 // placeholder="
//                                                 autoFocus
//                                                 value={User_data.UserName}

//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                             <Form.Label>FirstName</Form.Label>
//                                             <Form.Control
//                                                 type="Name"
//                                                 // placeholder="name@example.com"
//                                                 autoFocus
//                                                 value={User_data.FirstName}
//                                                 onChange={(e) => {
//                                                     SetUser_data({ ...User_data, FirstName: e.target.value })
//                                                 }}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                             <Form.Label>LastName</Form.Label>

//                                             <Form.Control
//                                                 type="Name"
//                                                 // placeholder="
//                                                 autoFocus
//                                                 value={User_data.LastName}
//                                                 onChange={(e) => {
//                                                     SetUser_data({ ...User_data, LastName: e.target.value })
//                                                 }}
//                                             />
//                                         </Form.Group>

//                                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                             <Form.Label>Age</Form.Label>
//                                             <Form.Control

//                                                 type="Age"
//                                                 // placeholder="
//                                                 autoFocus
//                                                 value={User_data.Age}
//                                                 onChange={(e) => {
//                                                     SetUser_data({ ...User_data, Age: e.target.value })
//                                                 }}

//                                             />
//                                         </Form.Group>



//                                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                             <Form.Label>Email address (is fixed )</Form.Label>
//                                             <Form.Control
//                                                 type="email "
//                                                 // placeholder="name@example.com"
//                                                 autoFocus
//                                                 value={User_data.Email}
//                                             // onChange={(e) => {
//                                             //     SetUser_data({ ...User_data, Email: e.target.value })
//                                             // }}
//                                             />
//                                         </Form.Group>
//                                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                             <Form.Label>Phone Number</Form.Label>
//                                             <Form.Control
//                                                 type="Phone"
//                                                 // placeholder="
//                                                 autoFocus
//                                                 value={User_data.PhoneNumber}
//                                                 onChange={(e) => {
//                                                     SetUser_data({ ...User_data, PhoneNumber: e.target.value })
//                                                 }}
//                                             />
//                                         </Form.Group>


//                                     </Form>
//                                 </Modal.Body>
//                                 <Modal.Footer>
//                                     <Button variant="secondary" onClick={handleClose}>
//                                         Close
//                                     </Button>
//                                     <Button variant="primary" onClick={Editrequest}>
//                                         Save Changes
//                                     </Button>
//                                 </Modal.Footer>
//                             </Modal>
//                         </div>
//                         <div className='my-3'>
//                             <button type="button" onClick={func} id="Followers" className="btn btn-info p-4 mx-5">Followers: {Followers_Number}</button>
//                             <button type="button" onClick={func} id='Following' className="btn btn-info p-4 ">Following: {Following_Number}</button>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </section></div>
//     )
// }

// export default withAuth(ProfilePage)
import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import withAuth from './withAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SignIn from './SignIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useMatch, useNavigate
} from "react-router-dom";
// import { set } from 'mongoose';
// import { Link } from 'react-router-dom';




const ProfilePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const Editrequest = async () => {
        setShow(true);
        let res = await fetch('http://localhost:100/api/EditDetails', {
            method: 'POST',
            body: JSON.stringify({
                "UserName": User_data.UserName,
                "Email": User_data.Email,
                "Password": User_data.Password,
                "FirstName": User_data.FirstName,
                "LastName": User_data.LastName,
                "Age": User_data.Age,
                "PhoneNumber": User_data.PhoneNumber,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })


        let x = await res.json()
        console.log(x.status)
        if (x.success) {
            localStorage.setItem('UserData', JSON.stringify(User_data))
            console.log('success')
            toast.success('Details Updated Successfully')
            setShow(false);
        }
        else {
            console.log('fail')
            SetUser_data(JSON.parse(localStorage.getItem('UserData')))
            toast.error('Details Update Failed')
        }
    }
    const handleShow = () => {
        setShow(true);


    }
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
    console.log("User_data", User_data)

    return (

        <div className='w-full'><section style={{ backgroundColor: '#eee' }}>
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
                                    {/* <button type="button" className="btn btn-info">Follow</button> */}
                                    {/* <button type="button" className="btn btn-outline-info ms-1">Message</button> */}
                                </div>
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
                        <div className="editmodal">
                            <Button variant="primary" onClick={handleShow}>
                                Edit Details
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>UserName (unchangable)</Form.Label>
                                            <Form.Control
                                                type="Name"
                                                // placeholder="
                                                autoFocus
                                                value={User_data.UserName}

                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>FirstName</Form.Label>
                                            <Form.Control
                                                type="Name"
                                                // placeholder="name@example.com"
                                                autoFocus
                                                value={User_data.FirstName}
                                                onChange={(e) => {
                                                    SetUser_data({ ...User_data, FirstName: e.target.value })
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>LastName</Form.Label>

                                            <Form.Control
                                                type="Name"
                                                // placeholder="
                                                autoFocus
                                                value={User_data.LastName}
                                                onChange={(e) => {
                                                    SetUser_data({ ...User_data, LastName: e.target.value })
                                                }}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control

                                                type="Age"
                                                // placeholder="
                                                autoFocus
                                                value={User_data.Age}
                                                onChange={(e) => {
                                                    SetUser_data({ ...User_data, Age: e.target.value })
                                                }}

                                            />
                                        </Form.Group>



                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email address (is fixed )</Form.Label>
                                            <Form.Control
                                                type="email "
                                                // placeholder="name@example.com"
                                                autoFocus
                                                value={User_data.Email}
                                            // onChange={(e) => {
                                            //     SetUser_data({ ...User_data, Email: e.target.value })
                                            // }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="Phone"
                                                // placeholder="
                                                autoFocus
                                                value={User_data.PhoneNumber}
                                                onChange={(e) => {
                                                    SetUser_data({ ...User_data, PhoneNumber: e.target.value })
                                                }}
                                            />
                                        </Form.Group>


                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={Editrequest}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div className='my-3'>
                            <button type="button" onClick={func} id="Followers" className="btn btn-info p-4 mx-5">Followers: {Followers_Number}</button>
                            <button type="button" onClick={func} id='Following' className="btn btn-info p-4 ">Following: {Following_Number}</button>
                        </div>

                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default withAuth(ProfilePage)
