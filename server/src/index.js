require("./models/User");
require("./models/Task");
require("./models/Donation");
require("./models/Product");
require("./models/Order");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Stripe = require("stripe");
// const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const donationRoutes = require("./routes/donationRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const requireAuth = require("./middlewares/requireAuth");

const PUBLISHABLE_KEY =
  "pk_test_51Jyy7lEK24e61J3099ffTNmyOFfmxyk2WKyeZI8jrza4U1lcrw3nC1JjxElNjzULcYeWpFuY2wanM1J5sDVtJAUb00S3hlV0yZ";
const SECRET_KEY =
  "sk_test_51Jyy7lEK24e61J30sloEpYwan8yfibtKJsqluMVoQ5lWpAQjQUvXX2PZsgttQp1fRdDdS9xg1yB8OZOvokL1YhEl00RXvpsFhk";
const PORT = process.env.PORT || 3003;
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(authRoutes);
app.use(taskRoutes);
app.use(donationRoutes);
app.use(orderRoutes);
app.use(productRoutes);
app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
