const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Because of DNS, we can simply re write the IP to "mongo"
mongoose.connect(
    'mongodb://deepanshu:mypassword@mongo:27017/?authSource=admin') // we have specified "mongo", because even if the IP address changes is it linked with the service "mongo"
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => console.log(e)
);

app.get("/", (req, res) => {
    res.send("<h2>Hello there, I'm Deepanshu, trying to build this node-docker-express app, using docker-compose and distributing the workflow into dev and prod env</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port ${port}'));