const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.post("/post/level", userController.postCompletedLevel);

router.post("/get/level", userController.getHighestLevel);

router.post("/post/profile", userController.postProfile);

router.post("/get/profile", userController.getProfile);

router.get("/get/users", userController.getAllUers);

router.get("/get/completed-level", userController.getDataLevel);

module.exports = router;
