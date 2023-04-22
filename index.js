const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("<h2>Hello there, I'm Deepanshu, trying to build this node-docker-express app, using docker-compose and distributing the workflow into dev and prod env</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port ${port}'))