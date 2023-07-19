const express = require("express");
const app = express();
const globalErrorHandling = require("./controllers/errorController");
const userRouter = require("./routes/userRouter");
const notesRouter = require("./routes/notesRouter");
const cors = require("cors");
// app.use(cors());
app.use(
  cors()
);
// available routes
// middleware to parse the incoming json body\
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/").get((req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      info: "you created successfully",
    },
  });
  next();
});
app.use(globalErrorHandling);

module.exports = app;
