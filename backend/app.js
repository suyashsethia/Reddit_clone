const express = require("express");
const path = require("path");
// const { title } = require("process");
const mongoose = require("mongoose");
const app = express();
const port = 100;
const cors = require("cors");
const { chownSync } = require("fs");
const { userInfo } = require("os");
const con = mongoose.connection
const url = "mongodb+srv://suyash:suyash2303@cluster0.rhhwane.mongodb.net/test"

mongoose.connect(url, { useNewUrlParser: true });
con.on('open', function () {
    console.log("connected...")
})

//mongo continue , making a schema for mongo 
const nameSchema = new mongoose.Schema({
    LastName: {
        type: String,
        required: true

    },
    Age: {
        type: Number,
        required: true

    },
    Password: {
        type: String,
        required: true

    },
    FirstName: {
        type: String,
        required: true

    },
    UserName: {
        type: String,
        required: true,
        unique: true

    },
    Email: {
        type: String,
        required: true,
        unique: true,

    },
    PhoneNumber: {
        type: Number,
        required: true,

    },
    Followers: {
        type: [{
            FollowerUserName: { type: String },
        }],
        // unique: false,
        sparse: true
    },
    Following: {
        type: [{
            FollowingUserName: { type: String },
        }],
        // unique: false,
        sparse: true
    }

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


app.post('/SignUp', async function (req, res) {
    console.log(req.body)
    var password = req.body.Password;

    // encrypt password
    // var salt = await bcrypt.genSaltSync(10);
    // var encryptedpassword = await bcrypt.hashSync(password, salt);

    var data = {
        "FirstName": req.body.FirstName,
        "LastName": req.body.LastName,
        "UserName": req.body.UserName,
        "Email": req.body.Email,
        "PhoneNumber": req.body.PhoneNumber,
        "Age": req.body.Age,
        "Password": req.body.Password,
        "Followers": [],
        "Following": [],
    }
    var myData = new User(data);
    myData.save().then(() => {
        console.log("hogya sparse: true save Database me")
        // res.send("item saved to database");
    })
        .catch(err => {
            console.log(err)
            // res.status(400).send("unable to save to database");
        });
})
let error_message_to_React = ""

// const AllUsers = async () => {
//     const data = await User.collection.distint('UserName').toArray()
//     return data
// }

app.post('/AllUsers', async function (req, res) {
    const datas = await User.find({ field: "UserName" })
    res.json({
        AllUsers: datas
    })
    // console.log(datas)
})

//getting followers data from react 
app.post('/Follow', async function (req, res) {
    console.log(req.body)
    const User1 = await User.find({ UserName: req.body.UserNameTofollow })

    // const current_followers = User1.FollowersNumber
    const User2 = await User.find({ UserName: req.body.UserNameOfLogin })
    // const current_following = User2.FollowingNumber
    // console.log(current_followers, current_following)
    // const response1 = await User.updateOne({ UserName: req.body.UserNameTofollow }, { $push: { Followers: req.body.UserNameOfLogin } })
    // const response2 = await User.updateOne({ UserName: req.body.UserNameOfLogin }, { $push: { Following: req.body.UserNameTofollow } })

    let response1 = User1[0].Followers.push({ FollowingUserName: req.body.UserNameOfLogin })
    let response2 = User2[0].Following.push({ FollowerUserName: req.body.UserNameTofollow })
    console.log(response1, response2)
    console.log(User1[0].Followers[0].FollowerUserName, User2[0].Following)
});

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
        User_data: data
    })
    // console.log(data)
    // console.log("hahahaha")

})

app.listen(port, () => {
    console.log(`this app started succesfully on ${port}`)
})
