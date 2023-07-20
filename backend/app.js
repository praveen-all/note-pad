const express = require("express");
const app = express();
const cookeParser=require('cookie-parser');
const globalErrorHandling = require("./controllers/errorController");
const userRouter = require("./routes/userRouter");
const notesRouter = require("./routes/notesRouter");
const cors = require("cors");
// app.use(cors());
app.use(express.json());
app.use(cookeParser());
app.use(
  cors({
    credentials: true,
  })
);
// available routes
// middleware to parse the incoming json body\
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);

app.use(globalErrorHandling);

module.exports = app;
