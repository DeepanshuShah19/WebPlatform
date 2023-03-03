const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json())

const mongoDbURL = "mongodb+srv://deepanshu:university@webportal.iumygie.mongodb.net/?retryWrites=true&w=majority";

//MongoDb Connection
mongoose
    .connect(mongoDbURL, {
        useNewUrlParser: true,
    }).then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));


//Defining API Port 12230
app.listen(12230, () => {
    console.log("Server started on port 12230");
})

//test API
app.post("/post", async (req, res) => {
    console.log(req.body);
    const { data } = req.body;

    try {
        if (data === "deepanshu") {
            res.send({
                status: "ok",
                details: "saved"
            })
        } else {
            res.send({
                status: "failed",
                details: "user not found"
            })
        }
    } catch (error) {
        res.send({
            status: "error",
            details: "something is wrong please check the payload"
        })
    }
});