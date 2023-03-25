const mongoose = require("mongoose");

const userMeetingSchema = new mongoose.Schema(
    {
        EmailId: String,
        Topic: String,
        Join_URL: String,
        Start_URL: String,
        MeetingId: String,
        Time: String,
        Attendee: [{
            type: String,
        }]
    },
    {
        collection: "UserMeeting",
    }
);

mongoose.model("UserMeeting", userMeetingSchema);