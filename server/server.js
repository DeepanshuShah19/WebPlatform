const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// import { MongoClient } from "mongodb";
const MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");


// const mongoUrl =
//     "mongodb+srv://deepanshu:university@webportal.iumygie.mongodb.net/?retryWrites=true&w=majority";
// mongoose
//     .connect(mongoUrl, {
//         useNewUrlParser: true,
//     })
//     .then(() => {
//         console.log("Connected to database");
//     })
//     .catch((e) => console.log(e));

// require("./WebPortal");

app.listen(12230, () => {
    console.log("Server Started");
});

// const User = mongoose.model("UserDetails");
app.post("/login", async (req, res) => {
    console.log("request body: ",req.body)
    const { email, password } = req.body;
    console.log("inside server login function")
    const mongoClient = new MongoClient('mongodb+srv://deepanshu:university@webportal.iumygie.mongodb.net/WebPortal?retryWrites=true&w=majority');
    const user = await mongoClient.db().collection('UserDetails').findOne({ email });
    console.log("User: ",user)
    // const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
});

app.post("/google-login", async (req, res) => {

    const email = req.body.userDetails.email;

    const mongoClient = new MongoClient('mongodb+srv://deepanshu:university@webportal.iumygie.mongodb.net/WebPortal?retryWrites=true&w=majority');
    const user = await mongoClient.db().collection('UserDetails').findOne({ email }).toArray();
    // const user = await User.findOne({ email });
    if (!user) {
        const name = req.body.userDetails.given_name + " " + req.body.userDetails.family_name;
        const password = req.body.userDetails.given_name + ":" + req.body.userDetails.family_name;
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: encryptedPassword,
            taskCount: 0
        });
    }

    const token = jwt.sign({ email: email }, JWT_SECRET);

    if (res.status(201)) {
        return res.json({ status: "ok", data: token });
    } else {
        return res.json({ error: "error" });
    }
});

// app.post("/register", async (req, res) => {
//     console.log(req.body);
//     const { name, email, password } = req.body;

//     const encryptedPassword = await bcrypt.hash(password, 10);
//     try {
//         const oldUser = await User.findOne({ email });

//         if (oldUser) {
//             return res.json({ error: "User Exists" });
//         }
//         await User.create({
//             name,
//             email,
//             password: encryptedPassword,
//             taskCount: 0,
//             imageCount: 0
//         });
//         const token = jwt.sign({ email: email }, JWT_SECRET)
//         res.send({ status: "ok", data: token });
//     } catch (error) {
//         res.send({ status: "error" });
//     }
// });