const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
    {
        Name: String,
        EmailId: { type: String, unique: true },
        Password: String,
        PhoneNumber: String
    },
    {
        collection: "UserDetails",
    }
);

mongoose.model("UserDetails", userDetailsSchema);