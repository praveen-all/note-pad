const express = require("express");
const app = express();
const globalErrorHandling = require("./controllers/errorController");
const userRouter = require("./routes/userRouter");
const notesRouter = require("./routes/notesRouter");
const cors = require("cors");
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.250.171:3000"],
  })
);
// available routes
// middleware to parse the incoming json body\
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);

app.use(globalErrorHandling);

module.exports = app;
