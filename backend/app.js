const express = require("express");
const path = require("path");
// const { title } = require("process");
const mongoose = require("mongoose");
const app = express();
const port = 100;
const cors = require("cors");
const { chownSync } = require("fs");
const con = mongoose.connection
const url = "mongodb+srv://suyash:suyash2303@cluster0.rhhwane.mongodb.net/test"

mongoose.connect(url, { useNewUrlParser: true });
con.on('open', function () {
    console.log("connected...")
})

//mongo continue , making a schema for mongo 
// const nameSchema = new mongoose.Schema({
//     Lname: {
//         type: String,
//         required: true,

//     },
//     Age: {
//         type: Number,
//         required: true,

//     },
//     Password: {
//         type: String,
//         required: true,

//     },
//     FirstName: {
//         type: String,
//         required: true,

//     },
//     UserName: {
//         type: String,
//         required: true,

//     },
//     Email: {
//         type: String,
//         required: true,

//     },
//     PhoneNumber: {
//         type: Number,
//         required: true,

//     },
// });
const nameSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Age: Number,
    Password: String,
    UserName: String,
    Email: String,
    PhoneNumber: Number
});

const User = mongoose.model('SignUpForm', nameSchema)
// nameSchema.index({ Email: 1, PhoneNumber: 1, UserName: 1 }, { unique: true });
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
    var myData = new User(req.body);
    myData.save().then(() => {
        console.log("hogya save Database me")
        // res.send("item saved to database");
    })
        .catch(err => {
            console.log(err)
            // res.status(400).send("unable to save to database");
        });
})
let error_message_to_React = ""
app.post('/SignIn', async function (req, res) {
    console.log(req.body)
    const data = await User.findOne({ Email: req.body.Email })

    console.log(data)
    if (data) {
        if (data.Password === req.body.Password) {
            error_message_to_React = "Correct Login id"
        }
        else {
            error_message_to_React = "Incorrect Password"
        }
    }
    else {
        console.log("nahi hai email")
        error_message_to_React = "Mail id Not Found Sign Up First"
    }
    console.log(error_message_to_React);
    res.json({
        error: error_message_to_React,
        User_data:data
    })
})

app.listen(port, () => {
    console.log(`this app started succesfully on ${port}`)
});
