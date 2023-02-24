import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from './withAuth';



const MySubgredit = () => {
    let navigate = useNavigate();
    const [Subgredit, setSubgredit] = useState([])
    useEffect(() => {
        GetMySubGredit();
    }, [])

    const GetMySubGredit = async () => {
        let res = await fetch('http://localhost:100/api/MySubgredit', {
            method: "POST",
            body: JSON.stringify({
                UserNameOfLogin: JSON.parse(localStorage.getItem('UserData')).UserName
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        let x = await res.json()
        console.log(x)
        setSubgredit(x.SubGredit_Of_Login)
        console.log(Subgredit)
    }
    const func = () => {
        navigate("/ProfilePage/MySubGredit/form")
    }
    const lejao = (e) => {
        console.log("lejao")
        navigate(`/GreditPage/${e.target.id}`)
    }

    const Delete = async (e) => {
        console.log("delete")
        let res = await fetch('http://localhost:100/api/DeleteSubgredit', {
            method: "POST",
            body: JSON.stringify({
                GreditName: e.target.id
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        let x = await res.json()
        console.log(x)
        if (x.success)
            toast.success(x.success)
        else
            toast.error(x.error)

        GetMySubGredit();
    }
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='my-3'>

                <button type="button" onClick={func} className="btn btn-info p-4 mx-5"> Create New Gredit</button>
            </div>
            <div>

                {Subgredit.map(({ GreditName, GreditDescription, GreditTags, GreditBannedwords, GreditPosts,GreditFollowers }) => (
                    <div key={GreditName} className=" my-3 card w-75 ">
                        <div className="card-body my-3">
                            {/* #delete button to delete whole gredit */}

                            <h5 className="card-title">{GreditName}</h5>
                            <p className="card-text">Description {GreditDescription}</p>
                            <p className="card-text">Tags :{GreditTags + ' ,'}</p>
                            <p className="card-text">Banned_Words: {GreditBannedwords + ' ,'}</p>
                            <p className="card-text">Posts: {GreditPosts.length}</p>
                            <p className="card-text">Followers {GreditFollowers.length}</p>

                            <button id={GreditName} onClick={lejao} className="btn btn-info">Know More</button>
                            <button className="mx-5 btn btn-danger" id={GreditName} onClick={Delete}>Delete</button>
                        </div>
                    </div>
                ))
                }
            </div>



        </div>
    )
}

export default withAuth(MySubgredit)