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
mongoose.set('strictQuery', true);
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
    // Followers: [Object],

    // Following: [Object],
    Followers: {
        type: [{
            FollowersUserName: String,
            FollowersFirstName: String,
            FollowersLastName: String,
            FollowersEmail: String,
        }],
        // unique: false,
        sparse: true
    },


    Following: {
        type: [{
            FollowingUserName: String,
            FollowingFirstName: String,
            FollowingLastName: String,
            FollowingEmail: String,
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
    // console.log(req.body)
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
        console.log("hogya save Database me")
        // res.send("item saved to database");
    })
        .catch(err => {
            console.log(err)
            // res.status(400).send("unable to save to database");
        });
})
let error_message_to_React = ""

app.post('/AllUsers', async function (req, res) {
    const datas = await User.find({ field: "UserName" })
    res.json({
        AllUsers: datas
    })
    // console.log(datas)
})

//getting followers data from react
app.post('/api/Follow', async (req, res) => {
    // console.log(req.body)
    const UserToFollow = await User.find({ UserName: req.body.UserNameTofollow })
    const UserOfLogin = await User.find({ UserName: req.body.UserNameOfLogin })
    // console.log(UserToFollow[0], UserOfLogin[0])

    UserOfLogin[0].Following.push({
        FollowingUserName: UserToFollow[0].UserName,
        FollowingFirstName: UserToFollow[0].FirstName,
        FollowingLastName: UserToFollow[0].LastName,
        FollowingEmail: UserToFollow[0].Email,
    })

    UserToFollow[0].Followers.push({
        FollowersUserName: UserOfLogin[0].UserName,
        FollowersFirstName: UserOfLogin[0].FirstName,
        FollowersLastName: UserOfLogin[0].LastName,
        FollowersEmail: UserOfLogin[0].Email,
    })
    // console.log(UserToFollow[0], UserOfLogin[0])
    await UserToFollow[0].save();
    await UserOfLogin[0].save();
    // console.log(UserToFollow[0], UserOfLogin[0])

    res.status(200).json({ success: true })
    // console.log(response1, response2)
    // console.log(UserOfLogin[0].Following[0].FollowingUserName, UserToFollow[0].Followers[0].FollowerUserName)
});

//get followers of login user
app.post('/api/FollowersOfLogin', async (req, res) => {
    // console.log(req.body)
    const UserOfLogin = await User.find({ UserName: req.body.UserNameOfLogin })
    res.json({
        Follower_Of_Login: UserOfLogin[0].Followers
    })
})
//get following  of login user
app.post('/api/FollowingOfLogin', async (req, res) => {
    // console.log(req.body)
    const UserOfLogin = await User.find({ UserName: req.body.UserNameOfLogin })
    res.json({
        Following_Of_Login: UserOfLogin[0].Following
    })
})

// unfollow user
app.post('/api/UnFollow', async (req, res) => {
    // console.log(req.body)
    const UserToUnFollow = await User.find({ UserName: req.body.UserNameToUnFollow })
    const UserOfLogin = await User.find({ UserName: req.body.UserNameOfLogin })
    // console.log(UserToUnFollow[0], UserOfLogin[0])

    UserOfLogin[0].Following.pull({
        FollowingUserName: UserToUnFollow[0].UserName,
    })
    UserToUnFollow[0].Followers.pull({
        FollowersUserName: UserOfLogin[0].UserName,

    })
    await UserToUnFollow[0].save();
    await UserOfLogin[0].save();
    res.status(200).json({ success: true })
})
app.post('/api/RemoveFollower', async (req, res) => {
    // console.log(req.body)
    const UserToRemoveFollower = await User.find({ UserName: req.body.UserNameToRemovefollower })
    const UserOfLogin = await User.find({ UserName: req.body.UserNameOfLogin })
    console.log(UserToRemoveFollower[0].UserName, UserOfLogin[0].UserName)
    // console.log(UserOfLogin[0].Followers)
    UserOfLogin[0].Followers.pull({
        FollowersUserName: UserToRemoveFollower[0].UserName,
    })
    UserToRemoveFollower[0].Following.pull({
        FollowingUserName: UserOfLogin[0].UserName,

    })
    await UserToRemoveFollower[0].save();
    await UserOfLogin[0].save();
    res.status(200).json({ success: true })
})
app.post('/SignIn', async function (req, res) {
    // console.log(req.body)
    const data = await User.findOne({ Email: req.body.Email })

    // console.log(data)
    if (data) {
        if (data.Password === req.body.Password) {
            error_message_to_React = "Correct Login id"
        }
        else {
            error_message_to_React = "Incorrect Password"
        }
    }
    else {
        // console.log("nahi hai email")
        error_message_to_React = "Mail id Not Found Sign Up First"
    }
    // console.log(error_message_to_React);
    res.json({
        error: error_message_to_React,
        User_data: data
    })
})


//SUB GREDDIT WORK BEGINS HERE



const greditnameschema = new mongoose.Schema({
    GreditName: String,
    GreditDescription: String,
    GreditCreatorEmail: String,
    GreditCreatorUserName: String,
    GreditTags: [],
    GreditPosts: [],
    GreditFollowers: [],
    GreditBannedwords: [],
})


const SubGredit = mongoose.model("SubGredit", greditnameschema)


app.post('/api/CreateSubGredit', async (req, res) => {
    // console.log(req.body)

    var newSubGredit = new SubGredit({
        GreditName: req.body.GreditName,
        GreditDescription: req.body.GreditDescription,
        GreditCreatorEmail: req.body.GreditCreatorEmail,
        GreditCreatorUserName: req.body.GreditCreatorUserName,
        GreditTags: req.body.GreditTags,
        GreditPosts: [],
        GreditFollowers: [],
        GreditBannedwords: [],
    })
    newSubGredit.save();
    res.status(200).json({ success: true })
})

app.listen(port, () => {
    console.log(`this app started succesfully on ${port}`)
})
