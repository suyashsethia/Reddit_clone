import React, { useEffect, useState } from 'react'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'
// import useParams from 'react'
import { useParams } from 'react-router-dom'
import withAuth from './withAuth';


const Joining = () => {

  const [JoiningList, setJoiningList] = useState([])
  const [l, setl] = useState(0)
  const params = useParams()
  const [a, seta] = useState(true)
  useEffect(() => {

    const Joining = async () => {
      let res = await fetch('http://localhost:100/api/GetGreditJoining', {

        method: "POST",
        body: JSON.stringify({
          "JoiningSubGreditName": params.Name
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
      let data = await res.json()
      console.log("responsedata", data)
      setJoiningList(data.JoiningList)
      setl(JoiningList.length)
    }
    Joining()

  }, [l])
  const func = async (id, value, GreditName) => {
    console.log("e.target.id", id)
    console.log("e.target.value", value)

    console.log("suyashthegreat")
    let res = await fetch('http://localhost:100/api/JoiningtoFollower', {
      method: "POST",
      body: JSON.stringify({
        "JoiningId": id,
        "value": value,

      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    let data = await res.json()
    console.log("responsedata", data.success)
    if (data.success && value === "accept") {
      alert("User Added to Follower")
      seta(false)
      window.location.reload()
    }
    if (data.success === false) {
      alert("User Already in Follower")
    }
  }
  return (
    <div>
      <h5 className="card-title">Joining List</h5>
      {JoiningList.map(({ _id, JoiningSubGreditName, JoiningUserName, JoiningSubGreditCreatorUserName }) => (
        <div key={_id} className=" my-3 card w-75">
          <div className="card-body my-3">
            <h6 className="card-title">GreditName</h6>
            <p className="card-text">{JoiningSubGreditName}</p>

            <h6 className="card-title">Joining User Name</h6>
            <p className="card-text">{JoiningUserName}</p>
            {/* {console.log("JoiningSubGreditCreatorName",JoiningSubGreditCreatorUserName)} */}
            <ButtonGroup style={{ display: ((JoiningSubGreditCreatorUserName === (JSON.parse(localStorage.getItem("UserData")).UserName))) ? "block" : "none" }}>

              <button className="btn btn-success" onClick={() => { func(_id, "accept", JoiningSubGreditName) }}>Accept</button>
              <button className="btn btn-danger" onClick={() => { func(_id, "reject", JoiningSubGreditName) }}>Reject</button>


            </ButtonGroup>

          </div>
        </div>
      ))}
    </div>
  )
}

export default withAuth(Joining)