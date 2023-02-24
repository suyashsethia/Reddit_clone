import React, { useState } from 'react'
import withAuth from './withAuth';


const SubgreditForm = () => {

    const [GreditName, setGreditName] = useState('')
    const [GreditDescription, setGreditDescription] = useState('')
    // const [GreditTags, setGreditTags] = useState('')
    // const [GreditBannedWords, setGreditBannedWords] = useState('')

    const change = (e) => {
        if (e.target.id === 'PostName') {
            setGreditName(e.target.value)
            console.log(GreditName)
        }
        else if (e.target.id === 'PostDescription') {
            setGreditDescription(e.target.value)
        }

    }

    const makePost = async (e) => {
        e.preventDefault();
        const User_local = JSON.parse(localStorage.getItem('UserData'))
        // console.log(User_local)
        let res = await fetch('http://localhost:100/api/CreatePost', {
            method: 'POST',
            body: JSON.stringify({
                "PostName": PostName,
                "PostDescription": PostDescription,
                "PostCreatorUserName": User_local.UserName,
                "PostCreatorEmail": User_local.Email,
                "PostSubGreditName": "test",
                "PostUpvotes": 0,
                "PostDownvotes": 0,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    return (
        <div><form>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Name</label>
                <input type="email" className="form-control" id="PostName" value={PostName} onChange={change} placeholder="" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Description</label>
                <textarea className="form-control" id="PostDescription" value={PostDescription} rows={3} onChange={change} />
            </div>
            <div className="mt-4 pt-2">
                <input onClick={makePost} className="btn btn-info btn-lg" type="submit" defaultValue="Submit" />
            </div>
        </form></div>

    )
}

export default withAuth(SubgreditForm)