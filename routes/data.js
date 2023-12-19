const express = require("express");
const router = express.Router();

const dataController = require("../controllers/dataController");

router.get("/dict", dataController.getDict);

router.get("/quiz", dataController.getQuiz);

router.get("/quiz/:level", dataController.quizLevel);

module.exports = router;
