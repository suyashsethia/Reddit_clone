import React, { useEffect, useState } from 'react'
// useState
import withAuth from './withAuth';

// let x 

var x, y
const AllUsers = () => {

    const [local_following, setlocal_Following] = useState([])
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
        console.log(y)
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

    useEffect(() => {
        // GetAllUsers();
        getLocal_Following()
    }, [local_following])

    // console.log(`apna waala`, Users)

    const Follow = key => async (e) => {
        // console.log(JSON.parse(localStorage.getItem('UserData')).UserName)
        // console.log(key)
        e.preventDefault()
        let res = await fetch('http://localhost:100/api/Follow',
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
        let x = await res.json()
        // console.log(x)
        for (let index = 0; index < local_following.length; index++) {
            // const element = array[index];
            // e.target

        }
        if (x.success === true) {
            alert('Followed')
            // e.target.style.display = 'none'
        }
    }
    // let local_following = []
    let userName_local = JSON.parse(localStorage.getItem('UserData')).UserName
    // console.log(userName_local)
    const getLocal_Following = async (e) => {
        // e.preventDefault()
        let res = await fetch('http://localhost:100/api/GetLocal_Following',
            {
                method: "POST",
                body: JSON.stringify({
                    UserNameOfLogin: userName_local
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        let x = await res.json()
        // console.log(x.Following)
        setlocal_Following(x.Following)
        // local_following = x.Following;
    }
    console.log(local_following)

    // console.log(local_following)
    let pool = []
    // let local_following = JSON.parse(localStorage.getItem('UserData')).Following
    let y = 1
    // console.log(local_following)
    // console.log(Users)
    for (let j = 0; j < Users.length; j++) {
        // console.log("haha")
        for (let index = 0; index < local_following.length; index++) {
            y = 1;
            // const element = array[index];
            // console.log(local_following[index].FollowersUserName, Users[j].UserName)
            if (local_following[index].FollowingUserName === Users[j].UserName) {
                console.log("haha")
                y = 0
                pool.push({
                    UserName: Users[j].UserName,
                    IsaFollowerofLocalUSer: true
                })
                break
            }

        }
        if (y) {
            pool.push({
                UserName: Users[j].UserName,
                IsaFollowerofLocalUSer: false
            })
        }

    }
    // console.log(pool)

    // const IsaFollowerofLocalUSer = 0;
    // console.log(j)
    return (
        <div>
            {/* <button>naam hai button</button> */}
            <div>

                {pool.map(({ UserName, IsaFollowerofLocalUSer }) => (
                    <div key={UserName} style={{ display: (userName_local === UserName) ? 'none' : 'block' }} className=" my-3 card w-75">
                        <div className="card-body my-3">
                            <h5 className="card-title">{UserName}</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

                            <button disabled={IsaFollowerofLocalUSer} id={UserName} onClick={Follow(UserName)} className="btn btn-info">Follow</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withAuth(AllUsers)