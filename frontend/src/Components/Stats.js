import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'
import withAuth from './withAuth';


const Stats = () => {

  let params = useParams()
  console.log("params", params.Name)
  const [greditstats, setgreditstats] = useState({})
  const [poststats, setpoststats] = useState({})
  const [visitstats, setvisitstats] = useState({})
  // let j = 0


  // j = 1;



  const GetStats = async () => {

    let res = await fetch('http://localhost:100/api/GetStats', {
      method: "POST",
      body: JSON.stringify({
        "GreditName": params.Name
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    let data = await res.json()

    console.log("data", data)
    setpoststats(data.postsbycreationdate);
    setgreditstats(data.countByJoiningDate);
    setvisitstats(data.visitorsbydate)

  }
  useEffect(() => {
    setpoststats("hi")
    console.log("suyash")
    GetStats();
  }, [])

  console.log("poststats", poststats)


  let postlabels = Object.keys(poststats);
  let postdata = Object.values(poststats);

  // console.log("postlabels", postlabels)
  // console.log("postdata", postdata)
  let greditlabels = Object.keys(greditstats);
  let greditdata = Object.values(greditstats);

  let visitorlabels = Object.keys(visitstats);
  let visitordata = Object.values(visitstats);


  let postchartData = {
    labels: postlabels,
    datasets: [
      {
        label: "Number of Posts Per Day",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: postdata
      }
    ]
  };


  let greditchartData = {
    labels: greditlabels,
    datasets: [
      {
        label: "Number of Members by Joining Date",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: greditdata
      }
    ]
  };

  let visitorchartData = {
    labels: visitorlabels,
    datasets: [
      {
        label: "Number of Visitors Per Day",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: visitordata
      }
    ]
  };


  let options = {
    scales: {
      xAxes: [
        {
          type: "category",
          labels: [postlabels, greditlabels, visitorlabels]
        }
      ],
      yAxes: [
        {
          type: "linear",
          position: "left",
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    barThickness: 50 // 
  };
  Chart.register(...registerables);


  return (
    <div>
      {/* <button onClick={GetStats()}>dabao</button>  */}


      <div className="flex justify-center ">
        <div className="postchart">
          <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mt-5 mb-10" >Number of Posts per Day</h2>

          <Bar className="w-2/3" data={postchartData} width={800} height={600} options={options} />
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="postchart">
          <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mt-5 mb-10" >Number of Visitors per Day</h2>

          <Bar className="w-2/3" data={visitorchartData} width={800} height={600} options={options} />
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="memberchart">
          <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mt-5 mb-10" >Bar Chart for Growth Rate of the Subgreddit in terms of Members over Time</h2>

          <Bar className="w-2/3" data={greditchartData} options={options} />
        </div>
      </div>
    </div>

  )
}

export default Stats