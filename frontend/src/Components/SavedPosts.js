import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from './withAuth';


const SavedPosts = () => {

    const local_user = JSON.parse(localStorage.getItem('UserData'))
    const [Saved_Posts, setSaved_Posts] = useState([])
    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch('http://localhost:100/api/GetSavedPosts',
                {
                    method: "POST",
                    body: JSON.stringify({
                        local_user: local_user
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
            let x = await res.json()
            if (x.success === true) {
                console.log(x.SavedPosts)
                setSaved_Posts(x.SavedPosts)
            }

        }
        getPosts()
    }, [])
    console.log("Saved_Posts", Saved_Posts)

    const RemoveSaved = async (SavedPostName) => {
        const res = await fetch('http://localhost:100/api/RemoveSavedPost',
            {
                method: "POST",
                body: JSON.stringify({
                    local_user: local_user,
                    SavedPostName: SavedPostName
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        let x = await res.json()
        if (x.success === true) {
            toast.success("Removed from Saved")
            window.location.reload()
        }
        else {
            toast.error("Error")
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
            <h2 className="text-center">Saved Posts</h2>
            {Saved_Posts.map(({ SavedPostName,
                SavedPostGreditName,
                SavedPostCreatorUserName,
                SavedPostCreatorEmail,
                SavedPostDescription,
                SavedForUserName,
                SavedForUserEmail, }) => (
                <div key={SavedPostName} className=" my-3 card w-75 ">
                    <div className="card-body my-3">
                        <h5 className="card-title">PostName: {SavedPostName}</h5>
                        <p className="card-text">Post GreditName: {SavedPostGreditName}</p>
                        <p className="card-text">Post CreatorUserName: {SavedPostCreatorUserName}</p>
                        <p className="card-text">Post CreatorEmail: {SavedPostCreatorEmail}</p>
                        <p className="card-text">Post Description: {SavedPostDescription}</p>
                        <button className="btn btn-danger" onClick={() => { RemoveSaved(SavedPostName) }}>Remove from Saved</button>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default withAuth(SavedPosts)