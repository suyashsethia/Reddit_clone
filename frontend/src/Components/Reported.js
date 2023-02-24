import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import withAuth from './withAuth';


const Reported = () => {


  const params = useParams()
  const Gredit_Name = params.Name
  const [Reports, setReports] = useState([])
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [show, setShow] = useState(false);

  const handleClose_yes = async (e) => {
    setShow(false);
    console.log("radioValue", radioValue)
    console.log("e.target.id", e.target.id)


    let res = await fetch('http://localhost:100/api/ReportStatus', {
      method: "POST",
      body: JSON.stringify({
        "ReportId": e.target.id,
        "ReportStatus": radioValue,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })

    let data = await res.json()
    console.log("responsedata", data)
    if (data.status === "success") {
      alert("Report Status Updated")
    }

  }
  const handleClose = () => {
    setShow(false);
    console.log("handleclose")
  }
  const handleShow = () => setShow(true);

  // console.log("sfsf",Gredit_Name)
  const radios = [
    { name: 'Block', value: '1' },
    { name: 'Ignore', value: '2' },
    { name: 'Delete Post', value: '3' },
  ];
  useEffect(() => {

    const Get_Reports = async () => {
      let res = await fetch('http://localhost:100/api/GetReports', {
        method: "POST",
        body: JSON.stringify({
          "GreditName": Gredit_Name
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
      let data = await res.json()
      console.log("responsedata", data)
      setReports(data.Reports)
    }

    Get_Reports()
  }, [])

  return (

    <div>
      <h3>
        Reports agains {params.Name}
      </h3>
      {Reports.map(({ _id, ReportConcern, ReportedByUserName, ReportedByUserEmail, ReportedPostName, ReportedGreditName, ReportedUserName, ReportStatus, ReportedGreditCreatorUserName }) => (
        <div key={_id} className=" my-3 card w-75">
          {console.log("_id", _id)}
          <div className="card-body my-3">
            <h6 className="card-title">Report Concern</h6>
            <p className="card-text">{ReportConcern}</p>
            <h6 className="card-title">Reported By UserName</h6>
            <p className="card-text">{ReportedByUserName}</p>
            <h6 className="card-title">Reported By User Email</h6>
            <p className="card-text">{ReportedByUserEmail}</p>
            <h6 className="card-title">Reported Post Name</h6>
            <p className="card-text">{ReportedPostName}</p>
            <h6 className="card-title">Reported Gredit Name</h6>
            <p className="card-text">{ReportedGreditName}</p>
            <h6 className="card-title">Reported User Name</h6>
            <p className="card-text">{ReportedUserName}</p>
            <h6 className="card-title">Report Status</h6>
            <p className="card-text">{ReportStatus}</p>
            {/* {console.log("ReportedGreditCreatorUserName", ReportedGreditCreatorUserName) , console.log("localStorage.getItem('UserData').UserName", JSON.parse(localStorage.getItem('UserData')).UserName)} */}

          </div>
          <ButtonGroup style={{ display: (((ReportedGreditCreatorUserName) === (JSON.parse(localStorage.getItem('UserData')).UserName))) ? "block" : "none" }}>
            {radios.map((radio, idx) => (
              <ToggleButton
                disabled={ReportStatus === "Ignore"||ReportStatus === "Block"}
                onClick={handleShow}
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={radio.name}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >

                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>

          <Modal style={{ display: show ? "block" : "none" }} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you Sure </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" id={_id} onClick={handleClose_yes}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>


        </div>
      )
      )}
    </div>
  )
}

export default withAuth(Reported)