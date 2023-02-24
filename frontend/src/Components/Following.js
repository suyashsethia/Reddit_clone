import React, { useEffect, useState } from 'react'
import withAuth from './withAuth';
const Following = () => {
    const [following_of_login, setfollowing_of_login] = useState([])
    const Followingoflogin = async () => {

        let res = await fetch('http://localhost:100/api/FollowingOfLogin', {
            method: "POST",
            body: JSON.stringify({
                UserNameOfLogin: JSON.parse(localStorage.getItem('UserData')).UserName
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        let x = await res.json()
        console.log(x)
        let y = x.Following_Of_Login
        console.log(y)
        setfollowing_of_login(y)

    }
    useEffect(() => {
        Followingoflogin();
    }, [])

    const UnFollow = key => async (e) => {

        e.preventDefault()
        let res = await fetch('http://localhost:100/api/UnFollow',
            {
                method: "POST",
                body: JSON.stringify({
                    UserNameToUnFollow: key,
                    UserNameOfLogin: JSON.parse(localStorage.getItem('UserData')).UserName
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        let x = await res.json()
        console.log(x)
        if (x.success === true) {
            alert('UnFollowed')
            e.target.style.display = 'none'
        }
        else {
            alert('UnFollowed')
        }
    }

    return (
        <div>
            {/* <button>naam hai button</button> */}
            <div>
            <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                            <h2>Following</h2>
                            {/* <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">User</a></li>
                                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                            </ol> */}
                        </nav>
                    </div>
                </div>
                {following_of_login.map(({ FollowingUserName, FollowingEmail, FollowingFirstName, FollowingLastName }) => (
                    <div key={FollowingUserName} className=" my-3 card w-75">
                        <div className="card-body my-3">
                            <h5 className="card-title">{FollowingUserName}</h5>
                            <p className="card-text">Name : {FollowingFirstName + " " + FollowingLastName}</p>
                            <p className="card-text">Email : {FollowingEmail}</p>
                            <button onClick={UnFollow(FollowingUserName)} className="btn btn-info">UnFollow</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withAuth(Following)