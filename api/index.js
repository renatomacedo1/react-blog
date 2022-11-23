const express = require("express");
const app = express();

const port = 4000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  })
  .then(console.log("Connected to mongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
