const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path=require('path');
const app = require("./app");
dotenv.config();
const db =  process.env.MONGO_URL;

mongoose
  .connect(db, {})
  .then(() => {
    console.log("mongo db connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });


const port = process.env.PORT||5000;

app.listen(port, "127.0.0.1", () => {
  console.log(`server started listening on port ${port}`);
});
