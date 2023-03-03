const express = require("express");
const app = express();
app.use(express.json())
app.listen(12230, () => {
    console.log("Server started on port 5000");
})

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