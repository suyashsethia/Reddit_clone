import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from './withAuth';


function Example() {

    const params = useParams()
    console.log("params.Name", params.Name)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [PostName, setPostName] = useState('');
    const [PostDescription, setPostDescription] = useState('');

    const change = (e) => {
        if (e.target.id === 'PostName') {
            setPostName(e.target.value)
            console.log(PostName)
        }
        else if (e.target.id === 'PostDescription') {
            setPostDescription(e.target.value)
        }

    }
    const makePost = async (e) => {
        e.preventDefault();
        const User_local = JSON.parse(localStorage.getItem('UserData'))
        // console.log(User_local)
        let res = await fetch('http://localhost:100/api/CreatePost', {
            method: 'POST',
            body: JSON.stringify({
                "PostName": PostName,
                "PostDescription": PostDescription,
                "PostCreatorUserName": User_local.UserName,
                "PostCreatorEmail": User_local.Email,
                "PostGreditName": params.Name,
                "PostUpvotes": 0,
                "PostDownvotes": 0,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },



        })
        let x = await res.json()
        console.log(x)
        if (x.success) {
            toast.success("Post Created Successfully")
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
        else {
            toast.error("Post Creation Failed")
        }
        setShow(false)
        setPostName('')
        setPostDescription('')
    }

    return (
        <>
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
            <Button variant="primary" onClick={handleShow}>
                Create Post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control id="PostName" value={PostName} onChange={change}
                                type="email"
                                placeholder="Post Name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"

                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" id="PostDescription" value={PostDescription} rows={3} onChange={change} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={makePost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// render(<Example />);
export default withAuth(Example);