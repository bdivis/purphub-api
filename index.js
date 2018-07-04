const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Tweet = require("./models/Tweet");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/purphub");

const Poll = mongoose.model(
  "Poll",
  mongoose.Schema({
    name: String,
    count: Number
  })
);

const getRandomTweet = () =>
  Tweet.aggregate([{ $sample: { size: 1 } }]).then(tweets => tweets[0]);

app.get("/tweets/random", (req, res) => {
  getRandomTweet().then(tweet => res.status(200).send(JSON.stringify(tweet)));
});

app.get("/poll", (req, res) => {
  Poll.find({}, (err, poll) => {
    if (err) throw err;

    res.send({
      pussy: 69,
      boobs: 420
    });
  });
});

app.post("/poll", (req, res) => {
  const { name } = req.body;

  Poll.find({ name: name }, (err, rows) => {
    if (err) throw err;
  });
});

app.listen(3001, () => console.log("Running..."));
