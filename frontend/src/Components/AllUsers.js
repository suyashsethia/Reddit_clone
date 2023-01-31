import React, { useEffect, useState } from 'react'
// useState

// let x 

var x, y
const AllUsers = () => {

    const [Users, setUsers] = useState([])
    // console.log(Users)

    const GetAllUsers = async () => {

        let res = await fetch('http://localhost:100/AllUsers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        // console.log(Users)
        x = await res.json()
        // console.log(x.AllUsers[1].UserName)
        y = x.AllUsers
        // console.log(y)
        // setUsers(await res.json())
        // y.map ( (item) => {
        //     // console.log(item)
        //     setUsers(Users => [...Users, {item}])
        // })
        setUsers(y)

        // console.log(Object.keys(y))
    }
    useEffect(() => {
        GetAllUsers();
    }, [])

    // console.log(`apna waala`, Users)

    const Follow = key => async (e) => {
        console.log(JSON.parse(localStorage.getItem('UserData')).UserName)
        console.log(key)
        e.preventDefault()
        let res = await fetch('http://localhost:100/Follow',
            {
                method: "POST",
                body: JSON.stringify({
                    UserNameTofollow: key,
                    UserNameOfLogin: JSON.parse(localStorage.getItem('UserData')).UserName
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
    }

    // console.log('ewewr1',y)

    return (
        <div>
            {/* <button>naam hai button</button> */}

            <div>
                {Users.map(({ UserName }) => (
                    <div key={UserName} className=" my-3 card w-75">
                        <div className="card-body my-3">
                            <h5 className="card-title">{UserName}</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <button onClick={Follow(UserName)} className="btn btn-info">Follow</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllUsers 