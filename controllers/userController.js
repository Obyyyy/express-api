require("dotenv").config();

const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const connection = require("../config/database");

exports.registerUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = { name: req.body.name, email: req.body.email, password: hashedPassword };
        const id = nanoid(16);

        connection.query("SELECT * FROM users WHERE email = ?", [user.email], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: true, message: "Internal Server Error" });
                return;
            }
            if (results.length > 0) {
                res.status(400).json({ error: true, message: "Email already Exist" });
                return;
            } else {
                const query = "INSERT INTO users (id_user, name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";
                connection.query(query, [id, user.name, user.email, user.password], (err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: true, message: "Internal Server Error" });
                        return;
                    }

                    res.status(201).json({ error: false, message: "User Created" });
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

exports.loginUser = async (req, res) => {
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
                // Buat token JWT
                const token = jwt.sign({ userId: user.id_user, name: user.name }, process.env.JWT_SECRET);
                // res.json({ token: token });
                return res.status(200).json({
                    error: false,
                    message: "Login successful",
                    loginResult: {
                        userId: user.id_user,
                        name: user.name,
                        token: token,
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
};

exports.postCompletedLevel = (req, res) => {
    const { userId, level } = req.body;

    if (!userId || !level) {
        return res.status(400).json({ error: true, message: "User ID and level are required" });
    }
    connection.query("SELECT * FROM completed_level WHERE id_user = ? AND level_id = ?", [userId, level], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ error: true, message: "User already completed the Level" });
            return;
        } else {
            const query = "INSERT INTO completed_level (id_user, level_id, completed_at) VALUES (?, ?, NOW())";
            connection.query(query, [userId, level], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: true, message: "Internal Server Error" });
                }

                return res.status(201).json({ error: false, message: "Level Completed" });
            });
        }
    });
};

exports.getHighestLevel = (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: true, message: "User ID is required" });
    }

    const query = "SELECT MAX(level_id) FROM completed_level WHERE id_user = ?";
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
        const level = results[0]["MAX(level_id)"];
        return res.status(200).json({
            userId: userId,
            level: level,
        });
    });
};

exports.postProfile = (req, res) => {
    const { userId, gender, bday, phone } = req.body;
    if (!userId) {
        return res.status(400).json({ error: true, message: "User ID is required" });
    }
    const query = "UPDATE users SET gender=?, bday=?, phone=?,  updated_at=NOW()  where id_user = ?";
    connection.query(query, [gender, bday, phone, userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
        return res.status(201).json({ error: false, message: "Profile Updated" });
    });
};

exports.getProfile = (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: true, message: "User ID is required" });
    }

    const query = "SELECT *  FROM users WHERE id_user = ?";
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
        const profile = results[0];
        return res.status(200).json({
            userId: userId,
            gender: profile.gender,
            bday: profile.bday,
            phone: profile.phone,
        });
    });
};

exports.getAllUers = (req, res) => {
    const query = "SELECT *  FROM users";
    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
        return res.status(200).json(results);
    });
};

exports.getDataLevel = (req, res) => {
    const query = "SELECT *  FROM completed_level";
    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
        return res.status(200).json(results);
    });
};
