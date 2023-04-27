const express = require("express");
const mongoose = require("mongoose");
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT
} = require("./config/config");

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    // Because of DNS, we can simply re write the IP to "mongo"
    mongoose.connect(
        mongoURL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false
    }) // we have specified "mongo", because even if the IP address changes is it linked with the service "mongo"
        .then(() => console.log("Successfully connected to DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
        });
}

connectWithRetry();

// Middle ware to attach the body to the request object
app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("<h2>Hello there, I'm Deepanshu, trying to build this node-docker-express app, using docker-compose and distributing the workflow into dev and prod env</h2>");
});

// localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port ${port}'));