require("./models/User");
require("./models/Task");
const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(authRoutes);
app.use(taskRoutes);

const mongoUri =
  "mongodb+srv://admin:admin123@cluster0.mm7v5.mongodb.net/test?retryWrites=true&w=majority";
if (!mongoUri) {
  throw new Error(`MongoURI was not supplied.`);
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3003, () => {
  console.log("Listening on port 3003");
});
