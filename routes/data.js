const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");

router.get("/dict", function (req, res) {
    const filePath = path.join(__dirname, "..", "materials.json");
    fs.readFile(filePath, "utf8", function (err, data) {
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

router.get("/quiz", function (req, res) {
    const filePath = path.join(__dirname, "..", "quizess.json");
    fs.readFile(filePath, "utf8", function (err, data) {
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

module.exports = router;
