import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js';
import Dropdown from 'react-bootstrap/Dropdown';
import withAuth from './withAuth';

const AllGredits = () => {
    const [type, settype] = useState('alphabetical')
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
                name: 'GreditName',
                weight: 0.7
            },
            {
                name: 'GrediTags',
                weight: 0.1
            },
            {
                name: 'GrediDescription',
                weight: 0.2
            }
        ]
    }


    const fuse = new Fuse(AllGredits, options);
    const searchchange = (e) => {
        setsearched(e.target.value);
        console.log("searched", searched, e.target.value);

        let result = fuse.search(e.target.value);

        // let y = result.filter((res) => res.item);

        settodisplaysubgreddit(result);
    }
    console.log("todisplaysubgreddit", todisplaysubgreddit)
    const handlesortinterval = async (e) => {
        settype(e.target.value)

        // handlesort()
    }
    console.log("type", type)
    const handlesort = (k) => {

        console.log("type", type)
        // console.log("e.target.innerText", e.target.value)
        if (type === "alphabetical") {
            return k.sort((a, b) => {
                if (a.GreditName < b.GreditName) { return -1; }
                if (a.GreditName > b.GreditName) { return 1; }
                return 0;
            })
        }
        if (type === "followers") {
            return k.sort((a, b) => {
                if (a.GreditFollowers.length < b.GreditFollowers.length) { return -1; }
                if (a.GreditFollowers.length > b.GreditFollowers.length) { return 1; }
                return 0;
            })
        }
        if (type === "date") {
            return k.sort((a, b) => {
                if (a.GreditCreatedAt < b.GreditCreatedAt) { return -1; }
                if (a.GreditCreatedAt > b.GreditCreatedAt) { return 1; }
                return 0;
            })
        }
        console.log("AllGredits", AllGredits)
        return k
        // window.location.reload()
    }


    return (
        <div>

            <div class="input-group my-3">
                <input type="search" onChange={searchchange} value={searched} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" className="btn btn-outline-primary">search</button>
            </div>

            <select id="countries" onChange={handlesortinterval} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10 w-4/12">
                <option value="alphabetical">Alphabetically </option>
                <option value="date">Creation Date</option>
                <option value="followers">Number Followers </option>
            </select>


            {searched && todisplaysubgreddit.map(({ item }) => (
                <div key={item.GreditName} className=" my-3 card w-75 ">
                    <div className="card-body my-3">
                        <h5 className="card-title">{item.GreditName}</h5>
                        <p className="card-text">{item.GreditDescription}</p>
                        <h5 className="card-title">Tags</h5>
                        <p className="card-text">{item.GreditTags}</p>
                        <h5 className="card-title">Created By</h5>
                        <p className="card-text">{item.GreditCreatorUserName}</p>
                        <h5 className="card-title">GreditBannedwords</h5>
                        <p className="card-text">{item.GreditBannedwords}</p>
                        <h5 className="card-title">GreditFollowers</h5>
                        <p className="card-text">{item.GreditFollowers.length}</p>
                        <h5 className="card-title">GreditCreatedAt</h5>
                        <p className="card-text">{item.GreditCreatedAt}</p>
                        <button className="btn btn-info " id={item.GreditName} onClick={lejao}>Know More</button>
                        <button onClick={() => { ApplytoJoin(item.GreditName, item.GreditCreatorUserName) }} className="btn btn-info mx-2">ApplytoJoin</button>


                    </div>
                </div>
            ))
            }
            {!searched && handlesort(AllGredits).map(({ GreditName, GreditDescription, GreditTags, GreditCreatorUserName, GreditBannedwords, GreditFollowers, GreditCreatedAt }) => (
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
                        <h5 className="card-title">GreditFollowers</h5>
                        <p className="card-text">{GreditFollowers.length}</p>
                        <h5 className="card-title">GreditCreatedAt</h5>
                        <p className="card-text">{GreditCreatedAt}</p>
                        <button className="btn btn-info " id={GreditName} onClick={lejao}>Know More</button>
                        <button onClick={() => { ApplytoJoin(GreditName, GreditCreatorUserName) }} className="btn btn-info mx-2">ApplytoJoin</button>


                    </div>
                </div>
            ))
            }</div>
    )
}

export default withAuth(AllGredits)