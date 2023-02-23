import React, { useEffect } from 'react'


const SavedPosts = () => {

    local_user = JSON.parse(localStorage.getItem('UserData'))
    const [Saved_Posts, setSaved_Posts] = useState([])
    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('http://localhost:5000/api/savedposts',
                {
                    method: "POST",
                    body: JSON.stringify({
                        local_user: local_user
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
            let x = await res.json()


            if (x.success === true) {
                toast.success('Downvoted')
                setSaved_Posts(x.data)
            }
            else {
                toast.error('Already Downvoted')
            }
        }
        getPosts()
    }, [])




    return (
        <div>
            {Saved_Posts.map(({ SavedPostName,
                SavedPostGreditName,
                SavedPostCreatorUserName,
                SavedPostCreatorEmail,
                SavedPostDescription,
                SavedForUserName,
                SavedForUserEmail, }) => (
                <div key={PostName} className=" my-3 card w-75 ">
                    <div className="card-body my-3">
                        <h5 className="card-title">SavedPostName: {SavedPostName}</h5>
                        <p className="card-text">SavedPostGreditName: {SavedPostGreditName}</p>
                                          </div>
                </div>
            ))}


        </div>
    )
}

export default SavedPosts