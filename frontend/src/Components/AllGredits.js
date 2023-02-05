import React, { useEffect, useState } from 'react'

const AllGredits = () => {
    const [AllGredits, setAllGredits] = useState([])

    useEffect(() => {
        GetAllGredits();
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
    return (
        <div>
            {AllGredits.map(({ GreditName, GreditDescription }) => (
            <div key={GreditName} className=" my-3 card w-75 ">
                <div className="card-body my-3">
                    <h5 className="card-title">{GreditName}</h5>
                    <p className="card-text">{GreditDescription}</p>
                    <button className="btn btn-info">Know More</button>
                </div>
            </div>
        ))
        }</div>
    )
}

export default AllGredits