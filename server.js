const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
    res.send("Hello from App Engine!");
});

// Endpoint to get a list of users
app.get("/getUsers", function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
        // console.log(data);
        // res.end(data); // you can also use res.send()
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error(parseError);
            res.status(500).json({ error: "Error parsing JSON" });
            return;
        }
        res.json(jsonData);
    });
});

// const server = app.listen(8080, function () {
//     const host = server.address().address;
//     const port = server.address().port;
//     console.log("REST API demo app listening at http://%s:%s", host, port);
// });

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
