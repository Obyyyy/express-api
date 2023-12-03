const fs = require("fs");
const path = require("path");

exports.getDict = function (req, res) {
    const filePath = path.join(__dirname, "../data/", "materials.json");
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
};

exports.getQuiz = function (req, res) {
    const filePath = path.join(__dirname, "../data/", "quizess.json");
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
};
