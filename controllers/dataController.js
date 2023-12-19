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

exports.quizLevel = function (req, res) {
    const level = req.params.level; // Ambil nilai parameter level dari URL

    // Selanjutnya, lakukan pembacaan data dari file quizess.json sesuai dengan level yang diminta
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

            // Temukan level yang sesuai di dalam data
            const selectedLevel = jsonData.quizess.find((q) => q.level == level);

            if (!selectedLevel) {
                res.status(404).json({ error: "Level not found" });
                return;
            }

            res.json(selectedLevel);
        } catch (parseError) {
            console.error(parseError);
            res.status(500).json({ error: "Error parsing JSON" });
            return;
        }
    });
};
