import React from 'react'

const SubgreditForm = () => {

    const [GreditName, setGreditName] = useState('')
    const [GreditDescription, setGreditDescription] = useState('')
    const [GreditTags, setGreditTags] = useState('')
    const [GreditBannedWords, setGreditBannedWords] = useState('')

    const change = (e) => {
        if (e.target.id === 'GreditName') {
            setGreditName(e.target.value)
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

    const makegredit = (e) => {
        e.preventDefault();
        const User_local = JSON.parse(localStorage.getItem('User'))
        fetch('http://localhost:100/api/CreateSubGredit', {
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
            .then((res) => res.json())
            .then((post) => {
                setGreditName('');
                setGreditDescription('');
                setGreditTags('');
                setGreditBannedWords('');
            })
    }

    return (
        <div><form>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Name</label>
                <input type="email" className="form-control" id="GreditName" value={GreditName} onChange={change} placeholder="" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Description</label>
                <textarea className="form-control" id="GreditDescription" value={GreditDescription} rows={3} onChange={change} defaultValue={""} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Tags</label>
                <input type="email" className="form-control" id="GreditTags" value={GreditTags} onChange={change} placeholder="" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">BannedWords</label>
                <input type="email" className="form-control" id="GreditBannedWords" value={GreditBannedWords} onChange={change} placeholder="" />
            </div>
            <div className="mt-4 pt-2">
                <input onClick={makegredit} className="btn btn-info btn-lg" type="submit" defaultValue="Submit" />
            </div>
        </form></div>

    )
}

export default SubgreditForm