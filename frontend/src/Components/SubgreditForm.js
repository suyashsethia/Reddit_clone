import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import withAuth from './withAuth';


const SubgreditForm = () => {

    const navigate = useNavigate()
    const [GreditName, setGreditName] = useState('')
    const [GreditDescription, setGreditDescription] = useState('')
    const [GreditTags, setGreditTags] = useState('')
    const [GreditBannedWords, setGreditBannedWords] = useState('')

    const change = (e) => {
        if (e.target.id === 'GreditName') {
            setGreditName(e.target.value)
            console.log(GreditName)
        }
        else if (e.target.id === 'GreditDescription') {
            setGreditDescription(e.target.value)
        }
        else if (e.target.id === 'GreditTags') {
            setGreditTags(e.target.value)
        }
        else if (e.target.id === 'GreditBannedWords') {
            setGreditBannedWords(e.target.value)
        }
    }

    const makegredit = async (e) => {
        e.preventDefault();
        const User_local = JSON.parse(localStorage.getItem('UserData'))
        // console.log(User_local)
        let res = await fetch('http://localhost:100/api/CreateSubGredit', {
            method: 'POST',
            body: JSON.stringify({
                "GreditName": GreditName,
                "GreditDescription": GreditDescription,
                "GreditTags": GreditTags,
                "GreditBannedWords": GreditBannedWords,
                "GreditCreatorUserName": User_local.UserName,
                "GreditCreatorEmail": User_local.Email,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        let x = await res.json()
        console.log(x)

        if (x.success) {

            setGreditName('');
            setGreditDescription('');
            setGreditTags('');
            setGreditBannedWords('');
            navigate("/ProfilePage/MySubGredit")
        }
    }

    return (
        <div>
            
            <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Name</label>
                <input type="email" className="form-control" id="GreditName" value={GreditName} onChange={change} placeholder="" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Description</label>
                <textarea className="form-control" id="GreditDescription" value={GreditDescription} rows={3} onChange={change} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Tags (enter space separated words)</label>
                <input type="email" className="form-control" id="GreditTags" value={GreditTags} onChange={change} placeholder="" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">BannedWords (enter space separated words)</label>
                <input type="email" className="form-control" id="GreditBannedWords" value={GreditBannedWords} onChange={change} placeholder="" />
            </div>
            <div className="mt-4 pt-2">
                <input onClick={makegredit} className="btn btn-info btn-lg" type="submit" defaultValue="Submit" />
            </div>
        </form></div>

    )
}

export default SubgreditForm