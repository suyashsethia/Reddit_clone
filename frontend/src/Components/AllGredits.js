import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AllGredits = () => {
    let navigate = useNavigate()
    const [AllGredits, setAllGredits] = useState([])
    const [local_GreditFollowing, Setlocal_GreditFollowing] = useState([])
    useEffect(() => {
        GetAllGredits();
        getLocal_GreditFollowing()
    }, [])

    const GetAllGredits = async () => {
        let res = await fetch('http://localhost:100/api/AllGredits', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        let x = await res.json()
        console.log(x)
        setAllGredits(x.All_Gredits)
    }
    const lejao = (e) => {
        console.log("lejao")
        navigate(`/GreditPage/${e.target.id}`)
    }
    const Follow = key => async (e) => {
        // console.log(JSON.parse(localStorage.getItem('UserData')).UserName)
        // console.log(key)
        e.preventDefault()
        let res = await fetch('http://localhost:100/api/FollowGreditPAge',
            {
                method: "POST",
                body: JSON.stringify({
                    GreditNameTofollow: key,
                    UserNameOfLogin: JSON.parse(localStorage.getItem('UserData')).UserName
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        let x = await res.json()
        // console.log(x)
        // for (let index = 0; index < local_following.length; index++) {
        //     // const element = array[index];
        //     // e.target

        // }
        if (x.success === true) {
            alert('Followed')
            // e.target.style.display = 'none'
        }
    }
    let userName_local = JSON.parse(localStorage.getItem('UserData')).UserName
    // console.log(userName_local)
    const getLocal_GreditFollowing = async (e) => {
        // e.preventDefault()
        let res = await fetch('http://localhost:100/api/GetLocal_GreditFollowing',
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
        Setlocal_GreditFollowing(x.GreditPageFollowed)
        // local_following = x.Following;
    }

    let IsalreadyFollowedbyLocalUSer = false;

    let pool = []
    let y = 1;

    for (let j = 0; j < AllGredits.length; j++) {
        for (let index = 0; index < local_GreditFollowing.length; index++) {

            const element = local_GreditFollowing[index];
            if (local_GreditFollowing[index].GreditName === AllGredits[j].GreditName) {
                y = 1
                pool.push(
                    {
                        GreditName: AllGredits[j].GreditName,
                        GreditDescription: AllGredits[j].GreditDescription,
                        IsalreadyFollowedbyLocalUSer: true
                    }
                )
                break
            }
            if (y) {
                pool.push(
                    {
                        GreditName: AllGredits[j].GreditName,
                        GreditDescription: AllGredits[j].GreditDescription,
                        IsalreadyFollowedbyLocalUSer: false
                    }
                )
            }
        }
    }
    console.log(pool)
        return (
            <div>
                {AllGredits.map(({ GreditName, GreditDescription }) => (
                    <div key={GreditName} className=" my-3 card w-75 ">
                        <div className="card-body my-3">
                            <h5 className="card-title">{GreditName}</h5>
                            <p className="card-text">{GreditDescription}</p>
                            <button className="btn btn-info " id={GreditName} onClick={lejao}>Know More</button>
                            {/* <button onClick={Follow(GreditName)}disabled={IsalreadyFollowedbyLocalUSer} className="btn btn-info mx-2">Follow</button> */}
                     

                        </div>
                    </div>
                ))
                }</div>
        )
    }

    export default AllGredits