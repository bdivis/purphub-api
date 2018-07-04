const fs = require("fs");
const mongoose = require("mongoose");
const Tweet = require("../models/Tweet");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/purphub"
);

async function load(data) {
  const rows = data.split("\r\n");
  const tweets = rows.map(row => {
    const parts = row.split(",");
    return {
      date: parts[1],
      tweet: parts.slice(2, parts.length).join(",")
    };
  });

  for (let i = 0; i < tweets.length; i++) {
    const obj = new Tweet(tweets[i]);
    await obj.save(tweets[i], err => {
      if (err) console.log(err);
    });
  }
}

const data = fs.readFileSync(process.argv[2], "utf8");
load(data).then(() => console.log("done"));
