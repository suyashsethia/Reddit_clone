import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import withAuth from './withAuth';

const Gredit_Users = () => {

  const params = useParams()
  console.log("params", params.Name)
  const [Gredit_Users, setGredit_Users] = useState([])
  const [BlockedUsers, setBlockedUsers] = useState([])
  const userName_local = JSON.parse(localStorage.getItem('UserData')).UserName
  // console.log("userName_local", userName_local)

  useEffect(() => {
    const GetGredit_Users = async () => {
      let res = await fetch('http://localhost:100/api/GetGreditFollowers', {
        method: "POST",
        body: JSON.stringify({
          "GreditName": params.Name
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
      let data = await res.json()
      console.log("responsedata", data.GreditFollowers)
      setGredit_Users(data.GreditFollowers)
      setBlockedUsers(data.BlockedUsers)
      // setGredit_Users()
    }
    GetGredit_Users()
  }, [])
  // console.log("Gredit_Users", Gredit_Users)

  const leave = async (GreditFollowerUserName) => {
    console.log("GreditFollowerUserName", GreditFollowerUserName)
    let res = await fetch('http://localhost:100/api/LeaveGredit', {
      method: "POST",
      body: JSON.stringify({
        "GreditName": params.Name,
        "GreditFollowerUserName": GreditFollowerUserName,
        "UserNameOfLogin": userName_local
      }),


      headers: {
        "Content-Type": "application/json"
      },
    })
    let data = await res.json()
    console.log("responsedata", data)
    // setGredit_Users(data.GreditFollowers)
    if (data.success === true) {
      window.location.reload()
      alert("You have left the Gredit")
    }
    else if (data.success === false) {
      if (data.status === 'creator') {

        alert("HOW CAN YOU LEAVE !! You are the creator of this Gredit")
      }
      else {
        alert("You are not a member of this Gredit")
      }
    }

  }

  return (
    <div>
      {/* <button>naam hai button</button> */}
      <div>

        <h5 className="card-title">{params.Name} Followers</h5>
        {Gredit_Users.map(({ GreditFollowerUserName, GreditFollowerEmail }) => (
          <div key={GreditFollowerUserName} className=" my-3 card w-75">
            <div className="card-body my-3">
              <h6 className="card-title">UserName</h6>
              <p className="card-text">{GreditFollowerUserName}</p>

              <h6 className="card-title">Email</h6>
              <p className="card-text">{GreditFollowerEmail}</p>
              <button onClick={() => { leave(GreditFollowerUserName) }} className="btn btn-danger">Leave</button>
            </div>
          </div>
        ))}
        <h5 className="card-title"> Blocked Users</h5>

        {BlockedUsers.map(({ BlockedUserName }) => (
          <div key={BlockedUserName} className=" my-3 card w-75">
            <div className="card-body my-3">
              <h6 className="card-title">UserName</h6>
              <p className="card-text">{BlockedUserName}</p>

              {/* <h6 className="card-title">Email</h6>
              <p className="card-text">{GreditFollowerEmail}</p> */}
              {/* <button disabled={IsaFollowerofLocalUSer} id={UserName} onClick={Follow(UserName)} className="btn btn-info">Follow</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withAuth(Gredit_Users)