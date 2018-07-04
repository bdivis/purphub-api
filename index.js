const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Tweet = require("./models/Tweet");

const app = express();
app.use(bodyParser.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
} else {
  app.use(cors({ origin: "purphub.com" }));
}

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/purphub"
);

const getRandomTweet = () =>
  Tweet.aggregate([{ $sample: { size: 1 } }]).then(tweets => tweets[0]);

app.get("/tweets/random", (req, res) => {
  getRandomTweet().then(tweet => res.status(200).send(JSON.stringify(tweet)));
});

app.listen(process.env.PORT || 3001, () => console.log("Running..."));
