const express = require("express");
const app = express();

// Routes to handle requests
const dataRouter = require("./routes/data");
const userRouter = require("./routes/user");

app.use(express.json());
app.use("/get", dataRouter);
app.use("/", userRouter);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
