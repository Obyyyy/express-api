const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

// Routes //
const dataRouter = require("./routes/data");
const userRouter = require("./routes/user");

app.use(express.json());

app.use("/", dataRouter);
app.use("/", userRouter);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
