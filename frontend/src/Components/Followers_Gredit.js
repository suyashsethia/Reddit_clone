// import React, { useEffect, useState } from 'react'

// const Followers_Gredit = () => {
//     const [followers_of_Gredit, setfollowers_of_Gredit] = useState([])
//     const Followersoflogin = async () => {

//         let res = await fetch('http://localhost:100/api/FollowersOfLogin', {
//             method: "POST",
//             body: JSON.stringify({
//                 UserNameOfLogin: JSON.parse(localStorage.getItem('UserData')).UserName
//             }),
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         })
//         let x = await res.json()
//         console.log(x)
//         let y = x.Follower_Of_Login
//         console.log(y)
//         setfollowers_of_login(y)

//     }
//     useEffect(() => {
//         Followersoflogin();
//     }, [])

//     const RemoveFollowing = key => async (e) => {

//         // console.log(JSON.parse(localStorage.getItem('UserData')).UserName)
//         // console.log(key)
//         e.preventDefault()
//         let res = await fetch('http://localhost:100/api/RemoveFollower',
//             {
//                 method: "POST",
//                 body: JSON.stringify({
//                     UserNameToRemovefollower: key,
//                     UserNameOfLogin: JSON.parse(localStorage.getItem('UserData')).UserName
//                 }),
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             })
//         let x = await res.json()
//         console.log(x)
//         if (x.success === true) {
//             alert('Unfollowed')
//             e.target.style.display = 'none'
//         }
//         else {
//             alert('Something went wrong')
//         }
//     }


//     return (
//         <div>
//             {/* <button>naam hai button</button> */}
//             <div>
//                 <div className="row">
//                     <div className="col">
//                         <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
//                             <h2>Followers</h2>
//                             {/* <ol className="breadcrumb mb-0">
//                                 <li className="breadcrumb-item"><a href="#">Home</a></li>
//                                 <li className="breadcrumb-item"><a href="#">User</a></li>
//                                 <li className="breadcrumb-item active" aria-current="page">User Profile</li>
//                             </ol> */}
//                         </nav>
//                     </div>
//                 </div>
//                 {followers_of_login.map(({ FollowersUserName, FollowersEmail, FollowersFirstName, FollowersLastName }) => (
//                     <div key={FollowersUserName} className=" my-3 card w-75">
//                         <div className="card-body my-3">
//                             <h5 className="card-title">{FollowersUserName}</h5>
//                             <p className="card-text">Name : {FollowersFirstName + " " + FollowersLastName}</p>
//                             <p className="card-text">Email : {FollowersEmail}</p>
//                             <button onClick={RemoveFollowing(FollowersUserName)} className="btn btn-info">RemoveFollower</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Followers_Gredit
import React from 'react'

const Followers_Gredit = () => {
    return (
        <div>Followers_Gredit</div>
    )
}

export default (Followers_Gredit)