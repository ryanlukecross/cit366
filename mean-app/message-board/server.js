const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log("App running on port", port));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'messageBoard';
let db;

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) return console.log("mongodb error", err);
    console.log("Connected successfully to server");
    db = client.db(dbName);
});

app.post("/send", (req, res) => {
    const nameMessage = req.body;
    db.collection("messages").insertOne(nameMessage);
})