const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const mongoDbURL =
  "mongodb+srv://deepanshu:university@webportal.iumygie.mongodb.net/WebPortal?retryWrites=true&w=majority";

//MongoDb Connection
mongoose
  .connect(mongoDbURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

//Defining API Port 12230
app.listen(12230, () => {
  console.log("Server started on port 12230");
});

//test API
app.post("/post", async (req, res) => {
  console.log(req.body);
  const { data } = req.body;

  try {
    if (data === "deepanshu") {
      res.send({
        status: "ok",
        details: "saved",
      });
    } else {
      res.send({
        status: "failed",
        details: "user not found.",
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      details: "something is wrong please check the payload.",
    });
  }
});

require("./UserDetails");

const User = mongoose.model("UserDetails");

//register API
app.post("/register", async (req, res) => {
  console.log("Received Register request with body: ", req.body);
  const { name, emailid, password, phoneNumber } = req.body;

  try {
    const oldUser = await User.findOne({ EmailId: emailid });

    if (oldUser) {
      return res.send({ status: "error" });
    }
    await User.create({
      Name: name,
      EmailId: emailid,
      Password: password,
      PhoneNumber: phoneNumber,
    });
    console.log("User Created with email id: ", emailid);
    res.send({
      status: "ok",
      details: "New User Created.",
    });
  } catch (error) {
    res.send({
      status: "error",
      details: "Something went wrong.",
    });
  }
});

//login API
app.post("/login", async (req, res) => {
  console.log("Received login request with body: ", req.body);
  const { emailid, password } = req.body;

  try {
    const user = await User.findOne({ EmailId: emailid });

    if (!user) {
      return res.send({
        status: "error",
        details: "User not found",
      });
    }
    if (password === user.Password) {
      return res.send({
        status: "ok",
        details: "User details matched",
      });
    }
    res.send({
      status: "error",
      details: "invalid emailId password",
    });
  } catch (error) {
    res.send({
      status: "error",
      details: "Something went wrong.",
    });
  }
});

//google Login
app.post("/googleLogin", async (req, res) => {
  console.log("Received Google login request with body: ", req.body);

  try {
    const user = await User.findOne({ EmailId: req.body.userDetails.email });
    if (!user) {
      console.log("inside !user");
      await User.create({
        Name: req.body.userDetails.given_name,
        EmailId: req.body.userDetails.email,
        Password: req.body.userDetails.given_name,
        PhoneNumber: "phoneNumber",
      });
      // console.log("User Created with email id: ", emailid);
      res.send({
        status: "ok",
        details: "New User Created.",
      });
    } else {
      return res.send({
        status: "ok",
        details: "User details matched",
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({
      status: "error",
      details: "Something went wrong.",
    });
  }
});
