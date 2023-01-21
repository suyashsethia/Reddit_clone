const express = require("express");
const path = require("path");
// const { title } = require("process");
const mongoose = require("mongoose");
const app = express();
const port = 100;
const cors = require("cors");
const con = mongoose.connection
const url = "mongodb+srv://suyash:suyash2303@cluster0.rhhwane.mongodb.net/test"

mongoose.connect(url, { useNewUrlParser: true });
con.on('open', function () {
    console.log("connected...")
})

//mongo continue , making a schema for mongo 
const nameSchema = new mongoose.Schema({
    Fname: String,
    Lname: String,
    Age: Number,
    PhoneNumber: Number,
    Email: String,
    Password: String,
    UserName: String
});

const User = mongoose.model('SignUpForm', nameSchema)

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
            console.log("error aaya re baba")
            // res.status(400).send("unable to save to database");
        });
})
app.post('/SignIn', function (req, res) {
    console.log(req.body)
    // var myData = new User(req.body);
    // myData.save().then(() => {
    //     console.log("hogya save Database me")
    //     // res.send("item saved to database");
    // })
    //     .catch(err => {
    //         console.log("error aaya re baba")
    //         // res.status(400).send("unable to save to database");
    //     });
})
app.listen(port, () => {
    console.log(`this app started succesfully on ${port}`)
});