const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = { name: req.body.name, email: req.body.email, password: hashedPassword };

        const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        connection.query(query, [user.name, user.email, user.password], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: true, message: "Internal Server Error" });
                return;
            }

            res.status(201).json({ error: false, message: "User Created" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "Email and password are required" });
    }

    // Cari pengguna berdasarkan email di database
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }

        // Periksa apakah pengguna ditemukan
        const user = results[0];
        if (!user) {
            return res.status(400).json({ error: true, message: "User not found" });
        }

        try {
            // Periksa kecocokan password
            if (await bcrypt.compare(password, user.password)) {
                return res.status(200).json({
                    error: false,
                    message: "Login successful",
                    loginResult: {
                        userId: user.id_user,
                        name: user.name,
                    },
                });
            } else {
                return res.status(401).json({ error: true, message: "Invalid password" });
            }
        } catch (bcryptError) {
            console.error(bcryptError);
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    });
});

module.exports = router;
