const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todoRoute");

// Creating App
const app = express();

// Allowing Cors
app.use(cors());

// Pasring Json
app.use(express.json());

// Adding important security headers
app.use(helmet());

// Importing Dot Env
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
const DB = process.env.DB;

// Connecting to DB
mongoose.connect(DB).then(() => {
    console.log(`DB connection successful`);
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.all("*", function (req, res) {
    res.status(404).json({
        status: "failed",
        msg: "Route not defined yet!",
    });
});

// Listening to the Port
app.listen(PORT, () => {
    console.log(`Server is successfully running on Port ${PORT}`);
});
