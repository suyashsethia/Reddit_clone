const express = require("express");
const path = require("path");
// const { title } = require("process");
// const mongoose = require("mongoose");
const app = express();
const port = 100;
const cors = require("cors");
// const con = mongoose.connection

// con.on('open', function () {
//     console.log("connected...")
// })

///for react
app.use(cors());
app.use(express.json());

//set the views directory 
app.set('views', path.join(__dirname, 'views'))


//for saving website data into computer
app.use(express.urlencoded())

//set local host page
app.get("/", (req, res) => {

    res.send('aagya laude')
});

app.post('/SignUp', function (req, res) {
    console.log(req.body)
})
app.listen(port, () => {
    console.log(`this app started succesfully on ${port}`)
});