import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Example from './Modal_Post'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GreditPage = () => {

    const params = useParams();
    const [showmodal, setShowmodal] = useState(false);
    const [ReportConcern, setReportConcern] = useState('');
    const location = useLocation()
    const navigate = useNavigate()
    const [Gredit_Posts, setGredit_Posts] = useState([])
    const [Following_Number, SetFollowing_Number] = useState(0)
    const [Followers_Number, SetFollowers_Number] = useState(0)
    // const [Tags, setTags] = useState([])
    const local_user = JSON.parse(localStorage.getItem('UserData'))

    // console.log(params.Name)
    // console.log("location ",location.pathname.slice(0,11))
    const [Gredit_Page, setGredit_Page] = useState()


    const lejao = (e) => {
        // console.log("lejao")
        // navigate(`/GreditPage/${e.target.id}`)
    }

    const func = (e) => {
        if (e.target.id === 'Followers_Gredit') {
            navigate('/GreditPage/Followers')
        }
        else if (e.target.id === 'Following_Gredit') {
            navigate('/GreditPage/Following')
        }
    }

    // Tags = []
    useEffect(() => {
        const GetgreditDetails = async () => {
            // e.preventDefault()

            let res = await fetch('http://localhost:100/api/GreditPage',
                {
                    method: "POST",
                    body: JSON.stringify({
                        GreditName: params.Name
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
            // console.log("fuck")
            let x = await res.json()

            // console.log(x)
            if (x.error) {
                // console.log("error hai")
            }
            // // console.log(x)
            else if (x === undefined) {
                // console.log("undefined hai  BC")
                setGredit_Page({
                    GreditName: 'Undefined',
                    GreditDescription: 'Undefined',
                    GreditCreatorEmail: 'Undefined',
                    GreditCreatorUserName: 'Undefined',
                    GreditTags: [],
                    GreditPosts: [],
                    GreditFollowers: [],
                    GreditBannedwords: [],
                    __v: 0
                })
            }
            else {
                // console.log("undefined nahi hai  BC")
                setGredit_Page(x.Gredit_Page[0])
                console.log("Gredit details", x.Gredit_Page[0])
            }
        }
        const Get_Gredit_Posts = async () => {
            let res = await fetch('http://localhost:100/api/Get_Gredit_Posts', {
                method: "POST",
                body: JSON.stringify({
                    "GreditName": params.Name
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            let x = await res.json()
            // console.log(x)
            setGredit_Posts(x.Gredit_Posts)
        }
        GetgreditDetails();
        Get_Gredit_Posts();
    }, [])


    const Follow = async (e) => {
        e.preventDefault()
        let res = await fetch('http://localhost:100/api/FollowGreditPAge',
            {
                method: "POST",
                body: JSON.stringify({
                    GreditNameTofollow: params.Name,
                    UserNameOfLogin: local_user.UserName
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        let x = await res.json()

        if (x.success === true) {
            // alert('Followed')
            toast.success('Followed')
            // e.target.style.display = 'none'
        }


    }
    const Unfollow = async (e) => {

        e.preventDefault()


    }
    const checkiffollower = async (e) => {
        e.preventDefault()


    }

    const changeHandler = (e) => {
        if (e.target.id === 'ReportConcern') {
            setReportConcern(e.target.value)
        }

    }

    const handleshowmodal = () => {
        setShowmodal(true)

    }
    // console.log(params.Name)
    // console.log("local_user.UserName,", local_user.UserName, "local_user.Email,", local_user.Email)
    const Report = async (e) => {
        e.preventDefault()
        console.log("ReportedUserName", e.target.id)
        let res = await fetch('http://localhost:100/api/Report',
            {

                method: "POST",
                body: JSON.stringify({
                    ReportedByUserName: local_user.UserName,
                    ReportedByUserEmail: local_user.Email,
                    ReportedUserName: e.target.id,
                    ReportedGreditName: params.Name,
                    ReportConcern: ReportConcern,
                    ReportedPostName: e.target.className,
                    ReportedGreditCreatorUserName: Gredit_Page.GreditCreatorUserName,
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        let x = await res.json()
        console.log(x)
        if (x.success === true) {
            toast.success('Reported')
        }
        else {
            toast.error('Report already present')
        }
        setShowmodal(false)
        setReportConcern('')
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
            <section style={{ backgroundColor: '#eee' }}>
                <div className="container py-5">
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                    <h5 className="my-3">John Smith</h5>
                                    <p className="text-muted mb-1">Full Stack Developer</p>
                                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        {/* <button onClick={Follow()} disabled={IsalreadyFollowedbyLocalUSer} className="btn btn-info mx-2">Follow</button> */}
                                        <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                {Gredit_Page && <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Name of Gredit</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{Gredit_Page.GreditName}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Description</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{Gredit_Page.GreditDescription}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Creator</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{Gredit_Page.GreditCreatorUserName}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Tags </p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{Gredit_Page.GreditTags } </p>
                                            {/* {Gredit_Page.map(({ GreditName, GreditTags }) => (
                                                <div key={GreditName}>
                                                </div>
                                            ))} */}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Banned Words</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{Gredit_Page.GreditBannedwords}</p>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div>
                                <Example></Example>
                            </div>
                            <div className='my-3'>
                                <button type="button" onClick={func} id="Followers" className="btn btn-info p-4 mx-5">Followers: {Following_Number}</button>
                                <button type="button" onClick={func} id='Following' className="btn btn-info p-4 ">Following: {Followers_Number}</button>
                            </div>
                            <div>

                                {Gredit_Posts.map(({ PostName, PostDescription, PostUpvotes, PostDownvotes, PostCreatorUserName, PostGreditName }) => (
                                    <div key={PostName} className=" my-3 card w-75 ">
                                        <div className="card-body my-3">
                                            <h5 className="card-title">{PostName}</h5>
                                            <p className="card-text">{PostDescription}</p>
                                            <p className="card-text">SubgreditName : {PostGreditName}</p>
                                            <p className="card-text">CreatorName : {PostCreatorUserName}</p>
                                            <p className="card-text">Upvotes : {PostUpvotes}</p>
                                            <p className="card-text">Upvotes : {PostDownvotes}</p>
                                            <button className="btn btn-info " id={PostName} >UpVote</button>
                                            <button className="btn btn-warning mx-2 " id={PostName} >DownVote</button>
                                            <button className="btn btn-danger" onClick={handleshowmodal}>Report</button>
                                            <Modal show={showmodal} onHide={() => setShowmodal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Report</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Label>Cause of Report</Form.Label>
                                                        <Form.Control as="textarea" id="ReportConcern" value={ReportConcern} onChange={changeHandler}
                                                            type="Text"
                                                            autoFocus
                                                        />
                                                    </Form.Group>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => setShowmodal(false)}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" className={PostName} id={PostCreatorUserName} onClick={Report} >
                                                        Report
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                ))

                                }</div>

                        </div>
                    </div>
                </div>
            </section >
        </div >

    )
}

export default GreditPage