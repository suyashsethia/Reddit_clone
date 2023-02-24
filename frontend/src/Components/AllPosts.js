import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import withAuth from './withAuth';

const AllPosts = () => {
    let navigate = useNavigate()
    const [AllPosts, setAllPosts] = useState([])

    useEffect(() => {
        GetAllPosts();
    }, [])

    const GetAllPosts = async () => {
        let res = await fetch('http://localhost:100/api/AllPosts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        let x = await res.json()
        console.log(x)
        setAllPosts(x.All_Posts)
    }
    const lejao = (e) => {
        console.log("lejao")
        // navigate(`/GreditPage/${e.target.id}`)
    }
    return (
        <div>
            {AllPosts.map(({ PostName, PostDescription ,PostUpvotes,PostDownvotes,PostCreatorUserName,PostSubGreditName }) => (
                <div key={PostName} className=" my-3 card w-75 ">
                    <div className="card-body my-3">
                        <h5 className="card-title">{PostName}</h5>
                        <p className="card-text">{PostDescription}</p>
                        <p className="card-text">SubgreditName : {PostSubGreditName}</p>
                        <p className="card-text">CreatorName : {PostCreatorUserName}</p>
                        <p className="card-text">Upvotes : {PostUpvotes}</p>
                        <p className="card-text">Upvotes : {PostDownvotes}</p>
                        <button className="btn btn-info" id={PostName} onClick={lejao}>Know More</button>
                    </div>
                </div>
            ))
            }</div>
    )
}

export default withAuth(AllPosts)