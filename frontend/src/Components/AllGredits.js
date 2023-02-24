import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js';
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
    const ApplytoJoin = async (GreditName, GreditCreatorUserName) => {
        let k = JSON.parse(localStorage.getItem('UserData')).UserName
        if (k === GreditCreatorUserName) {
            alert('You are the creator of this Gredit')
            return
        }
        let res = await fetch('http://localhost:100/api/ApplytoJoin',
            {
                method: "POST",
                body: JSON.stringify({
                    "JoiningSubGreditName": GreditName,
                    "JoiningSubGreditCreatorUserName": GreditCreatorUserName,
                    "JoiningUserName": k
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        let x = await res.json()
        console.log(x)
        if (x.success === true) {
            alert('Applied')
        }
        if (x.success === false) {
            if (x.status = 'Banned') {
                alert('SADLY! You are banned from this Gredit')
            }
            else {

                alert('Already Applied')
            }
        }

    }



    //CODE FOR FILTERING THE GREDITS
    const [searched, setsearched] = useState();
    // const [subgreddits, setsubgreddits] = useState([])
    const [todisplaysubgreddit, settodisplaysubgreddit] = useState([]);

    const options = {
        includeScore: true,
        keys: [
            {
                name: 'Name',
                weight: 0.7
            },
            {
                name: 'Tags',
                weight: 0.3
            }
        ]
    }


    const fuse = new Fuse(AllGredits, options);
    const searchchange = (e) => {
        setsearched(e.target.value);
        console.log("searched", searched, e.target.value);
        const result = fuse.search(searched);

        settodisplaysubgreddit(result);
        console.log(todisplaysubgreddit);
    }
    return (
        <div>


            <div className="input-group">
                <input placeholder="gredit search..." value={searched} onChange={searchchange} type="search" className="form-control rounded" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" className="btn btn-outline-primary">search</button>
            </div>
            {AllGredits.map(({ GreditName, GreditDescription, GreditTags, GreditCreatorUserName, GreditBannedwords }) => (
                <div key={GreditName} className=" my-3 card w-75 ">
                    <div className="card-body my-3">
                        <h5 className="card-title">{GreditName}</h5>
                        <p className="card-text">{GreditDescription}</p>
                        <h5 className="card-title">Tags</h5>
                        <p className="card-text">{GreditTags}</p>
                        <h5 className="card-title">Created By</h5>
                        <p className="card-text">{GreditCreatorUserName}</p>
                        <h5 className="card-title">GreditBannedwords</h5>
                        <p className="card-text">{GreditBannedwords}</p>
                        <button className="btn btn-info " id={GreditName} onClick={lejao}>Know More</button>
                        <button onClick={() => { ApplytoJoin(GreditName, GreditCreatorUserName) }} className="btn btn-info mx-2">ApplytoJoin</button>


                    </div>
                </div>
            ))
            }</div>
    )
}

export default AllGredits