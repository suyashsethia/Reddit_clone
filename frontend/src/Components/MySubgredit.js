import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

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

    return (
        <div>
<div className='my-3'>

            <button type="button" onClick={func} className="btn btn-info p-4 mx-5"> Create New Gredit</button>
</div>
            <div>

                {Subgredit.map(({ GreditName, GreditDescription }) => (
                    <div key={GreditName} className=" my-3 card w-75 ">
                        <div className="card-body my-3">
                            <h5 className="card-title">{GreditName}</h5>
                            <p className="card-text">{GreditDescription}</p>
                            <button className="btn btn-info">Know More</button>
                        </div>
                    </div>
                ))
                }
            </div>



        </div>
    )
}

export default MySubgredit