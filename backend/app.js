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
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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
    },
    GreditPageFollowed: {
        type: [{
            GreditName: String,
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

    // encrypt password
    var password = req.body.Password;
    var salt = await bcrypt.genSaltSync(10);
    var encryptedpassword = await bcrypt.hashSync(password, salt);
    console.log(encryptedpassword)
    var data = {
        "FirstName": req.body.FirstName,
        "LastName": req.body.LastName,
        "UserName": req.body.UserName,
        "Email": req.body.Email,
        "PhoneNumber": req.body.PhoneNumber,
        "Age": req.body.Age,
        "Password": encryptedpassword,
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


app.post('/api/EditDetails', async (req, res) => {
    console.log(req.body.Age)

    let UserEmail = req.body.Email
    let k = await User.findOne({ Email: UserEmail })


    k.FirstName = req.body.FirstName
    k.LastName = req.body.LastName
    k.UserName = req.body.UserName
    k.Email = req.body.Email
    k.PhoneNumber = req.body.PhoneNumber
    k.Age = req.body.Age

    console.log(k);

    await k.save();

    res.status(200).json({ success: true })
    // print error message
    // console.log(error_message_to_React)

})



let error_message_to_React = ""



app.post('/AllUsers', async function (req, res) {
    const datas = await User.find({ field: "UserName" })
    res.json({
        AllUsers: datas
    })
    console.log(datas)
})

//getting followers data from react
app.post('/api/Follow', async (req, res) => {
    console.log(req.body)
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
    console.log(req.body)
    const data = await User.findOne({ Email: req.body.Email })

    console.log(data)
    var truth = bcrypt.compareSync(req.body.Password, data.Password); // To Check Password 

    if (data != null) {
        console.log(truth)
        if (truth) {

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

app.post('/api/GetFollowersandFollowing', async (req, res) => {
    console.log("req.body", req.body)
    const UserName = req.body.UserName
    // console.log("UserName", UserName)
    const person = await User.find({ UserName: UserName })
    console.log("person", person)
    if (person && person.length > 0) {
        res.json({
            Followers_length: person[0].Followers.length,
            Following_length: person[0].Following.length,
            status: "success"
        })
    }
})


app.post('/api/GetLocal_Following', async (req, res) => {
    // console.log(req.body)
    const UserName = req.body.UserNameOfLogin

    const Following = await User.findOne({ UserName: UserName })
    // console.log(Following.Following)
    res.json({
        Following: Following.Following
    })
})


app.post('/api/GetLocal_GreditFollowing', async (req, res) => {
    console.log(req.body)
    const UserName = await req.body.UserNameOfLogin
    const a = await User.findOne({ UserName: UserName })
    if (a) {
        res.json({
            GreditPageFollowed: a.GreditPageFollowed
        })
    }
})

app.post('/api/RemoveSavedPost', async (req, res) => {
    console.log(req.body)
    const UserName = req.body.local_user.UserName
    const SavedPostName = req.body.SavedPostName

    const use = await User.find({ UserName: UserName })
    // console.log(use[0].savedPosts)

    ///find SavedPostName in SavedPosts
    // const Savedpost = await savedposts.find({ SavedPostName: SavedPostName })
    // console.log(Savedpost)
    //remove savedpost from SavedPosts

    await savedposts.deleteOne({ SavedPostName: SavedPostName })

    //remove savedpost from user
    res.json({
        success: true
    })
})

app.post('/api/FollowUser', async (req, res) => {
    console.log(req.body)
    const UserToFollow = await User.find({ UserName: req.body.UserNameToFollow })
    const UserofLogin = await User.find({ UserName: req.body.UserNameOfLogin })

    if (UserToFollow[0].UserName === UserofLogin[0].UserName) {
        res.json({
            success: false
        })
    }
    //check if already following
    for (let i = 0; i < UserofLogin[0].Following.length; i++) {
        if (UserofLogin[0].Following[i].FollowingUserName === UserToFollow[0].UserName) {
            res.json({
                success: false
            })
            return
        }
    }


    UserofLogin[0].Following.push({
        FollowingUserName: UserToFollow[0].UserName,
        FollowingEmail: UserToFollow[0].Email,
        FollowingFirstName: UserToFollow[0].FirstName,
        FollowingLastName: UserToFollow[0].LastName,
    })
    UserToFollow[0].Followers.push({
        FollowersUserName: UserofLogin[0].UserName,
        FollowersEmail: UserofLogin[0].Email,
        FollowersFirstName: UserofLogin[0].FirstName,
        FollowersLastName: UserofLogin[0].LastName,
    })
    await UserToFollow[0].save();
    await UserofLogin[0].save();
    res.status(200).json({ success: true })


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
    GreditVisitors: Number,
    GreditCreatedAt: { type: Date, default: Date.now },

})


const SubGredit = mongoose.model("SubGredit", greditnameschema)


app.post('/api/CreateSubGredit', async (req, res) => {
    console.log(req.body)
    Tags_different = req.body.GreditTags.split(" ")
    Banned_different = req.body.GreditBannedWords.split(" ")
    var newSubGredit = {
        "GreditName": req.body.GreditName,
        "GreditDescription": req.body.GreditDescription,
        "GreditCreatorEmail": req.body.GreditCreatorEmail,
        "GreditCreatorUserName": req.body.GreditCreatorUserName,
        "GreditTags": Tags_different,
        "GreditPosts": [],
        "GreditFollowers": [{ "GreditFollowerUserName": req.body.GreditCreatorUserName, "GreditFollowerEmail": req.body.GreditCreatorEmail, "GreditFollowerJoiningDate": Date.now }],
        "GreditBannedwords": Banned_different,
        "GreditVisitors": 0,

    }
    var mygredit = new SubGredit(newSubGredit)
    mygredit.save();
    res.status(200).json({ success: true })
})

app.post('/api/DeleteSubgredit', async (req, res) => {
    console.log(req.body)
    Gredit = await SubGredit.findOne({ GreditName: req.body.GreditName })
    console.log("Gredit", Gredit)
    posts_to_delete = Gredit.GreditPosts
    console.log("posts_to_delete", posts_to_delete)
    for (var i = 0; i < posts_to_delete.length; i++) {
        let x = await Post.findOne({ PostName: posts_to_delete[i].PostName })
        x.remove()
    }
    Gredit.remove();
    res.status(200).json({ success: true })
})
//get sub gredit of login user
app.post('/api/MySubgredit', async (req, res) => {
    console.log(req.body)
    // const UserOfLogin = await User.find({ UserName: req.body.UserNameOfLogin })
    const SubGreditOfLogin = await SubGredit.find({ GreditCreatorUserName: req.body.UserNameOfLogin })
    console.log(SubGreditOfLogin)
    res.json({
        SubGredit_Of_Login: SubGreditOfLogin
    })

})

app.post('/api/AllGredits', async (req, res) => {
    // console.log(req.body)
    const AllGredits = await SubGredit.find({})
    console.log(AllGredits)
    res.status(200).json({
        All_Gredits: AllGredits
    })
})

app.post('/api/GetGreditFollowers', async (req, res) => {
    console.log(req.body)
    const GreditName = req.body.GreditName
    const GreditPage = await SubGredit.find({ GreditName: GreditName })



    // get banned users from gredit
    const BlockedUsers = await BlockedUser.find({ BlockedFromGreditName: GreditName })
    const Followers = GreditPage[0].GreditFollowers

    //remove banned users from followers
    for (var i = 0; i < BlockedUsers.length; i++) {
        for (var j = 0; j < Followers.length; j++) {
            if (BlockedUsers[i].BlockedUserEmail == Followers[j].GreditFollowerEmail) {
                Followers.splice(j, 1)
            }
        }
    }


    console.log(GreditPage[0].GreditFollowers)
    if (GreditPage == null) {
        res.json({
            GreditFollowers: []
        })
    }
    else {
        res.json({
            GreditFollowers: Followers,
            BlockedUsers: BlockedUsers
        })
    }
})

app.post('/api/GreditPage', async (req, res) => {
    // console.log(req.body)
    const GreditPage = await SubGredit.find({ GreditName: req.body.GreditName })
    // console.log(GreditPage)
    res.json({
        Gredit_Page: GreditPage
    })
})

app.post('/api/FollowGreditPAge', async (req, res) => {
    console.log(req.body)

    // const GreditToFollow = await SubGredit.find({ GreditName: req.body.GreditNameTofollow })
    // const UserOfLogin = await User.find({ UserName: req.body.UserNameOfLogin })
    // // console.log(GreditToFollow[0])
    // GreditToFollow[0].GreditFollowers.push({
    //     GreditFollowerUserName: UserOfLogin[0].UserName,
    //     GreditFollowerEmail: UserOfLogin[0].Email,
    // })
    // UserOfLogin[0].GreditPageFollowed.push({
    //     GreditName: GreditToFollow[0].GreditName,
    // })
    // await GreditToFollow[0].save();
    // await UserOfLogin[0].save();
    res.json({
        success: true
    })
})


//schema for posts in sub gredit
const postSchema = new mongoose.Schema({
    PostName: String,
    PostDescription: String,
    PostCreatorEmail: String,
    PostCreatorUserName: String,
    PostGreditName: String,
    PostUpvotes: [],
    PostDownvotes: [],
    PostComments: [],
    PostCreatedAt: { type: Date, default: Date.now },
})

const Post = mongoose.model("Post", postSchema)

app.post('/api/CreatePost', async (req, res) => {
    console.log(req.body)


    var newPost = {
        "PostName": req.body.PostName,
        "PostDescription": req.body.PostDescription,
        "PostCreatorEmail": req.body.PostCreatorEmail,
        "PostCreatorUserName": req.body.PostCreatorUserName,
        "PostGreditName": req.body.PostGreditName,
        "PostUpvotes": [],
        "PostDownvotes": [],
        "PostComments": [],
    }
    var mypost = new Post(newPost)
    mypost.save();
    // add post to gredit 
    const gredit = await SubGredit.findOne({ GreditName: req.body.PostGreditName })
    gredit.GreditPosts.push({
        PostName: req.body.PostName,
        PostDescription: req.body.PostDescription,
    })
    await gredit.save();
    res.status(200).json({ success: true })
})

app.post('/api/Get_Gredit_Posts', async (req, res) => {
    console.log("sfsafsa", req.body)
    const Gredit = await SubGredit.findOne({ GreditName: req.body.GreditName })

    Gredit.GreditVisitors = Gredit.GreditVisitors + 1
    await Gredit.save()
    const Gredit_Posts = await Post.find({ "PostGreditName": req.body.GreditName })
    const blockedusers = await BlockedUser.find({ BlockedFromGreditName: req.body.GreditName })
    console.log("blockedusers", blockedusers)
    if (Gredit.GreditCreatorUserName != req.body.UserNameOfLogin) {
        for (var i = 0; i < Gredit_Posts.length; i++) {
            for (var j = 0; j < blockedusers.length; j++) {
                if (Gredit_Posts[i].PostCreatorUserName == blockedusers[j].BlockedUserName) {
                    Gredit_Posts[i].PostCreatorUserName = "Blocked User"
                }
            }
        }
    }


    console.log("POSTS", Gredit_Posts)
    console.log(Gredit.GreditCreatorUserName, req.body.UserNameOfLogin)
    res.json({
        Gredit_Posts: Gredit_Posts
    })
    const currentDate = new Date();
    let visitor = await Visitor.find({ GreditName: req.body.GreditName })
    console.log(visitor)
    if (visitor.length === 0) {
        let newVisitor = new Visitor({
            GreditName: req.body.GreditName,
            Count: 1,
            Date: currentDate.toDateString(),
        })
        await newVisitor.save()
    }
    else {
        visitor[0].Count = visitor[0].Count + 1
        await visitor[0].save()
    }
})



app.post('/api/downvotePost', async (req, res) => {
    console.log(req.body)

    const post = await Post.findOne({ _id: req.body.PostId })

    if (post.PostDownvotes.length > 0) {
        {
            for (var i = 0; i < post.PostDownvotes.length; i++) {
                if (post.PostDownvotes[i].DownvotedByUserName == req.body.local_user.Username) {
                    // post.PostUpvotes.splice(i, 1)
                    // await post.save();
                    res.json({
                        Downvotes: post.PostDownvotes.length,
                        success: false
                    })
                    return
                }
            }
        }
    }
    post.PostDownvotes.push({
        DownvotedByUserName: req.body.local_user.Username,
    })
    await post.save();
    res.json({
        Downvotes: post.PostDownvotes.length,
        success: true
    })
})



app.post('/api/upvotePost', async (req, res) => {
    console.log(req.body)

    const post = await Post.findOne({ _id: req.body.PostId })
    if (post.PostUpvotes.length > 0) {
        {
            for (var i = 0; i < post.PostUpvotes.length; i++) {
                if (post.PostUpvotes[i].UpvotedByUserName == req.body.local_user.Username) {
                    // post.PostUpvotes.splice(i, 1)
                    // await post.save();
                    res.json({
                        Upvotes: post.PostUpvotes.length,
                        success: false
                    })
                    return
                }
            }
        }
    }
    post.PostUpvotes.push({
        UpvotedByUserName: req.body.local_user.Username,
    })
    await post.save();
    res.json({
        Upvotes: post.PostUpvotes.length,
        success: true
    })
})

app.post('/api/CommentOnPost', async (req, res) => {
    console.log(req.body)

    const post = await Post.findOne({ _id: req.body.PostId })
    post.PostComments.push({
        CommentedByUserName: req.body.local_user.UserName,
        Comment: req.body.Comment,
        // CommentCreatedAt: { type: Date, default: Date.now },
    })
    await post.save();
    res.json({
        success: true
    })

})





app.listen(port, () => {
    console.log(`this app started succesfully on ${port}`)
})


//blocked user schema 
const blockeduserschema = new mongoose.Schema({
    BlockedUserName: String,
    BlockedUserEmail: String,
    BlockedUserCreatedAt: { type: Date, default: Date.now },
    BlockedFromGreditName: String,
    BlockedFromGreditCreatorUserName: String,
})

const BlockedUser = mongoose.model("BlockedUser", blockeduserschema)


//Report Work Starts here 

const reportschema = new mongoose.Schema({

    ReportedByUserName: String,
    ReportedByUserEmail: String,
    ReportedPostName: String,
    ReportedUserName: String,
    ReportConcern: String,
    ReportCreatedAt: { type: Date, default: Date.now },
    ReportStatus: String,  // ignored / blocked / reported / notselected
    ReportedGreditName: String,
    ReportedGreditCreatorUserName: String,
})

reportschema.index({ createdAt: 1 }, { expireAfterSeconds: 864000 }) // 10 day
const Report = mongoose.model("Report", reportschema)


app.post('/api/Report', async (req, res) => {
    console.log(req.body)

    //find a report which is already there 
    const ReportToCheck = await Report.find({ ReportedPostName: req.body.ReportedPostName, ReportedByUserName: req.body.ReportedByUserName, ReportedUserName: req.body.ReportedUserName, ReportedGreditName: req.body.ReportGreditName })
    // const ReportToCheck = await Report.find({ ReportedByUserName: req.body.ReportedByUserName })

    if (ReportToCheck.length === 0) {

        var newReport = {
            "ReportedByUserName": req.body.ReportedByUserName,
            "ReportedByUserEmail": req.body.ReportedByUserEmail,
            "ReportedUserName": req.body.ReportedUserName,
            "ReportConcern": req.body.ReportConcern,
            "ReportedGreditName": req.body.ReportedGreditName,
            "ReportedPostName": req.body.ReportedPostName,
            "ReportStatus": "notselected",
            "ReportedGreditCreatorUserName": req.body.ReportedGreditCreatorUserName,
        }
        var myreport = new Report(newReport)
        myreport.save();
        res.status(200).json({ success: true })
    }
    else {
        res.status(200).json({ success: false })

    }

})


app.post('/api/GetReports', async (req, res) => {
    console.log(req.body)
    const Reports = await Report.find({ ReportedGreditName: req.body.GreditName })
    // console.log("Reports", Reports[0]._id)
    res.json({
        Reports: Reports
    })
})

app.post('/api/ReportStatus', async (req, res) => {

    console.log(req.body)

    const ReportToChange = await Report.find({ _id: req.body.ReportId })
    console.log(ReportToChange[0])
    ReportToChange[0].ReportStatus = req.body.ReportStatus
    ReportToChange[0].createdAt = Date.now() + 8640000000000 //so that it never gets expired 
    await ReportToChange[0].save();

    if (req.body.ReportStatus === "Delete Post") {
        const PostToDelete = await Post.find({ PostName: ReportToChange[0].ReportedPostName })
        const reportstodelete = await Report.find({ ReportedPostName: ReportToChange[0].ReportedPostName })
        for (var i = 0; i < reportstodelete.length; i++) {
            await reportstodelete[i].remove()
        }
        await PostToDelete[0].remove();

    }
    else if (req.body.ReportStatus === "Block") {
        const UserToBlock = await User.find({ UserName: ReportToChange[0].ReportedUserName })
        console.log(UserToBlock[0])
        var newBlockedUser = {
            "BlockedUserName": UserToBlock[0].UserName,
            "BlockedUserEmail": UserToBlock[0].UserEmail,
            "BlockedFromGreditName": ReportToChange[0].ReportedGreditName,
            "BlockedFromGreditCreatorUserName": ReportToChange[0].ReportedGreditCreatorUserName,
        }
        var myBlockedUser = new BlockedUser(newBlockedUser)
        myBlockedUser.save();
    }
    res.json({
        success: true
    })
})

//BANNED USERS OF GREDIT 
const banneduserschema = new mongoose.Schema({
    BannedUserName: String,
    BannedFromGreditName: String,

})

const BannedUser = mongoose.model("BannedUser", banneduserschema)

app.post('/api/LeaveGredit', async (req, res) => {
    console.log(req.body)
    const Gredit = await SubGredit.find({ GreditName: req.body.GreditName })
    // const Use = await User.find({ UserName: req.body.GreditFollowerUserName })

    if (Gredit[0].GreditCreatorUserName == req.body.UserNameOfLogin) {
        res.json({
            success: false,
            status: "creator"
        })
        return
    }
    console.log(Gredit[0].GreditFollowers[0].GreditFollowerUserName, req.body.GreditFollowerUserName)
    // Gredit[0].GreditFollowers.pull({
    //     GreditFollowerUserName: req.body.GreditFollowerUserName,
    // })

    for (var i = 0; i < Gredit[0].GreditFollowers.length; i++) {
        console.log(Gredit[0].GreditFollowers[i].GreditFollowerUserName)
        if (Gredit[0].GreditFollowers[i].GreditFollowerUserName === req.body.GreditFollowerUserName) {
            Gredit[0].GreditFollowers.splice(i, 1)
            console.log("mila")
        }
    }
    await Gredit[0].save();

    //add user to banned user list
    var newBannedUser = {
        "BannedUserName": req.body.GreditFollowerUserName,
        "BannedFromGreditName": req.body.GreditName,
    }
    var myBannedUser = new BannedUser(newBannedUser)
    myBannedUser.save();

    res.json({
        success: true

    })
})

//request to join subgredit page 
const joiningSubGreditSchema = new mongoose.Schema({

    JoiningSubGreditName: String,
    JoiningSubGreditCreatorUserName: String,
    JoiningUserName: String,

})
const joiningSubGredit = mongoose.model("joiningSubGredit", joiningSubGreditSchema)

app.post('/api/ApplytoJoin', async (req, res) => {
    console.log(req.body)
    alreadyrequested = await joiningSubGredit.find({ JoiningSubGreditName: req.body.JoiningSubGreditName, JoiningUserName: req.body.JoiningUserName })

    //check if user is banned 
    const Banned = await BannedUser.find({ BannedUserName: req.body.JoiningUserName, BannedFromGreditName: req.body.JoiningSubGreditName })
    if (Banned.length > 0) {
        res.status(200).json({ success: false, status: "Banned" })
        return
    }

    if (alreadyrequested.length === 0) {
        var newjoiningSubGredit = {
            "JoiningSubGreditName": req.body.JoiningSubGreditName,
            "JoiningSubGreditCreatorUserName": req.body.JoiningSubGreditCreatorUserName,
            "JoiningUserName": req.body.JoiningUserName,
        }
        var myjoiningSubGredit = new joiningSubGredit(newjoiningSubGredit)
        myjoiningSubGredit.save();
        res.status(200).json({ success: true })
    }
    else {
        res.status(200).json({ success: false })
    }
})

app.post('/api/GetGreditJoining', async (req, res) => {
    console.log(req.body)
    const JoiningSubGredits = await joiningSubGredit.find({ JoiningSubGreditName: req.body.JoiningSubGreditName })
    console.log("JoiningSubGredits", JoiningSubGredits)
    res.json({
        "JoiningList": JoiningSubGredits
    })
})

app.post('/api/JoiningtoFollower', async (req, res) => {

    console.log(req.body)
    const JoiningList = await joiningSubGredit.find({ _id: req.body.JoiningId })

    if (JoiningList.length === 0) {
        res.json({
            success: false
        })
    }
    if (req.body.value === 'accept') {

        console.log(JoiningList[0])
        const GreditToChange = await SubGredit.find({ GreditName: JoiningList[0].JoiningSubGreditName })
        console.log(GreditToChange[0])
        const Use = await User.find({ UserName: JoiningList[0].JoiningUserName })
        console.log(Use[0])
        console.log(Date.now())
        GreditToChange[0].GreditFollowers.push(
            {
                "GreditFollowerUserName": Use[0].UserName,
                "GreditFollowerJoiningDate": Date.now,
                "GreditFollowerEmail": Use[0].Email,
            })

        Use[0].GreditPageFollowed.push(
            {
                "GreditName": GreditToChange[0].GreditName,

            })
        //delete joininglist from database

        await Use[0].save();
        await GreditToChange[0].save();
    }

    await joiningSubGredit.deleteOne({ _id: req.body.JoiningId })
    // await joiningSubGredit.save();
    res.json({
        success: true
    })
})

app.post('/api/GetStats', async (req, res) => {
    // console.log("sex")
    console.log(req.body)

    const subgredit = await SubGredit.find({ GreditName: req.body.GreditName })
    const Followers = subgredit[0].GreditFollowers
    console.log(Followers)

    let countByJoiningDate = {};
    Followers.map((follower) => {
        // console.log(follower.GreditFollowerJoiningDate.toDateString());
        if (follower.GreditFollowerJoiningDate === undefined) return;
        let joiningDate = follower.GreditFollowerJoiningDate.toDateString();
        console.log("joiningDate", joiningDate)
        if (!countByJoiningDate[joiningDate]) {
            countByJoiningDate[joiningDate] = 0;
        }
        countByJoiningDate[joiningDate]++;
    })
    console.log("countByJoiningDate", countByJoiningDate)

    //posts ke liye stats 
    const posts = await Post.find({ PostGreditName: req.body.GreditName })
    let postsbycreationdate = {};
    posts.map((post) => {
        // console.log(post.createdAt.toDateString());
        let creationdate = post.PostCreatedAt.toDateString();
        if (!postsbycreationdate[creationdate]) {
            postsbycreationdate[creationdate] = 0;
        }
        postsbycreationdate[creationdate]++;
    })
    console.log("postsbycreationdate", postsbycreationdate)

    //visitors ke liye stats
    const visitors = await Visitor.find({ GreditName: req.body.GreditName });
    let visitorsbydate = {};
    visitors.map((visitor) => {
        let date = visitor.Date;
        if (!visitorsbydate[date]) {
            visitorsbydate[date] = visitor.Count;
        }
    })



    res.status(200).json({
        countByJoiningDate: countByJoiningDate,
        postsbycreationdate: postsbycreationdate,
        visitorsbydate: visitorsbydate

    });


})

const visitorschema = new mongoose.Schema({
    GreditName: String,
    Count: Number,
    Date: String,
}, { unique: true })

const Visitor = mongoose.model("Visitor", visitorschema)

const savedpostsSchema = new mongoose.Schema({

    SavedPostName: String,
    SavedPostGreditName: String,
    SavedPostCreatorUserName: String,
    SavedPostCreatorEmail: String,
    SavedPostDescription: String,
    SavedForUserName: String,
    SavedForUserEmail: String,

})
const savedposts = mongoose.model("savedposts", savedpostsSchema)

app.post('/api/SavePost', async (req, res) => {
    console.log(req.body)
    const post = await Post.findOne({ _id: req.body.PostId })

    // find already saved post
    const alreadySaved = await savedposts.find({ SavedPostName: post.PostName, SavedForUserName: req.body.local_user.UserName })
    if (alreadySaved.length === 0) {
        var newSavedPost = {
            "SavedPostName": post.PostName,
            "SavedPostGreditName": post.PostGreditName,
            "SavedPostCreatorUserName": post.PostCreatorUserName,
            "SavedPostCreatorEmail": post.PostCreatorEmail,
            "SavedPostDescription": post.PostDescription,
            "SavedForUserName": req.body.local_user.UserName,
            "SavedForUserEmail": req.body.local_user.Email,
        }
        var mySavedPost = new savedposts(newSavedPost)
        mySavedPost.save();
        res.status(200).json({ success: true })
    }
    else {
        res.status(200).json({ success: false })
    }

})

app.post('/api/GetSavedPosts', async (req, res) => {
    console.log(req.body)
    const SavedPosts = await savedposts.find({ SavedForUserName: req.body.local_user.UserName })
    console.log("SavedPosts", SavedPosts)
    res.json({
        "SavedPosts": SavedPosts,
        "success": true
    })
})
