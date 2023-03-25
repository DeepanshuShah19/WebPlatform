const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const jwt = require("jsonwebtoken");
const rp = require("request-promise");

//API keys generated from ZOOM Marketplace
const API_KEY = "GIR_uWycTZerS_8nt6jhQg";
const API_SECRET_KEY = "A0mK6ZehBeO6YQCtVU6qP7bvVvj91KDdH5qf";

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

//importing schema for saving user and extracting user details while registration and login
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

//create Zoom Meeting API
app.post("/createMeeting", async (req, res) => {
  const payload = {
    iss: API_KEY,
    exp: new Date().getTime() + 5000,
  }

  const token = jwt.sign(payload, API_SECRET_KEY);
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + req.body.emailid + "/meetings",
    body: {
      "topic": req.body.topic,
      "type": 2,
      "start_time": "2023-03-19T12:10:10Z",
      // "start_time": req.body.time,
      "duration": "60",
      "settings": {
        "host_video": true,
        "participant_video": true,
        "join_before_host": true,
        "mute_upon_entry": "true",
        "watermark": "true",
        "audio": "voip",
        "auto_recording": "cloud"
      }
    },
    auth: {
      bearer: token
    },
    headers: {
      "user-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.send({
        status: "ok",
        data: response
      })
    })
    .catch(function (err) {
      console.log("API call failed, reason ", err);
      res.send({
        status: "error",
        data: "Cannot create Meeting"
      })
    });
})

// importing schema for saving user meetiungs and extracting user meetings
require("./UserMeeting");
const UserMeeting = mongoose.model("UserMeeting");

//save meeting API
app.post("/saveMeeting", async (req, res) => {
  console.log("Received save meeting request with body: ", req.body);

  try {
    await UserMeeting.create({
      EmailId: req.body.emailId,
      Topic: req.body.topic,
      Join_URL: req.body.joinURL,
      Start_URL: req.body.startURL,
      MeetingId: req.body.meetingId,
      Attendee: req.body.listOfAttendee
    });
    console.log("Meeting saved in dastabase ");
    res.send({
      status: "ok",
      details: "New Meeting Saved.",
    });
  } catch (error) {
    res.send({
      status: "error",
      details: "Something went wrong.",
    });
  }
});

//extract all user meetings API
app.post("/getUserMeetings", async (req, res) => {
  console.log("Received getUserMeetings request with body: ", req.body);

  try {
    const meetings = await UserMeeting.find({ EmailId: req.body.emailId });
    console.log("meetings: ", meetings)
    if (!meetings) {
      return res.send({
        status: "error",
        details: "No meetings for user",
      });
    }
    return res.send({
      status: "ok",
      meetings: meetings,
    });
  } catch (error) {
    res.send({
      status: "error",
      details: "Something went wrong.",
    });
  }
});

//delete Zoom meeting API
app.post("/deleteMeeting", async (req, res) => {
  const payload = {
    iss: API_KEY,
    exp: new Date().getTime() + 5000,
  }

  const token = jwt.sign(payload, API_SECRET_KEY);
  var options = {
    method: "DELETE",
    uri: "https://api.zoom.us/v2/meetings/" + req.body.meetingId,
    auth: {
      bearer: token
    },
    headers: {
      "user-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true
  };

  rp(options)
    .then(function (response) {
      res.send({
        status: "ok",
      })
    })
    .catch(function (err) {
      console.log("API call failed, reason ", err);
      res.send({
        status: "error",
        data: "Cannot create Meeting"
      })
    });
})

//delete meeting from database API
app.post("/deleteMeetingFromDatabase", async (req, res) => {
  console.log("Received deleteMeetingFromDatabase request with body: ", req.body);

  try {
    const user = await UserMeeting.deleteOne({ MeetingId: req.body.meetingId });
    console.log("USER after deleting: ", user)
    if (!user) {
      return res.send({
        status: "error",
        details: "Meeting Cannot be deleted",
      });
    }
    return res.send({
      status: "ok",
      details: "Meeting Deleted",
    });
  } catch (error) {
    res.send({
      status: "error",
      details: "Something went wrong.",
    });
  }
});