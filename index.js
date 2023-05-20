const express = require("express");
const mongoose = require("mongoose");

// Experimental
const RedisStore = require("connect-redis").default;

// For using to comminicate frontend and backend on different domains
const cors = require("cors");

const session = require("express-session");

const redis = require("redis");
// let RedisStore = require('connect-redis')(session);


const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    SESSION_SECRET,
    REDIS_PORT,
} = require("./config/config");

// let redisClient = redis.createClient({
//     host: REDIS_URL,
//     port: REDIS_PORT,
// });

// Experimental
const redisClient = redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT
    },
});

redisClient.connect().catch(console.error);

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

app.enable("trust proxy");
app.use(cors({

}))


// Middleware for redis 
// app.use(session({
//     store: new RedisStore({
//         client: redisClient
//     }),
//     secret: SESSION_SECRET,
//     cookie: {
//         secure: false,
//         resave: false,
//         saveUninitialized: false,
//         httpOnly: true,
//         maxAge: 30000
//     }
// }));


// Experimental
let redisStore = new RedisStore({
    client: redisClient,
  })

// Middleware for redis 
app.use(session({
    store: redisStore,
    // new RedisStore({
    //     client: redisClient
    // }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000,
    }
}))

// Middle ware to attach the body to the request object
app.use(express.json());

app.get("/api/v1", (req, res) => {
    res.send("<h2>Hello there, I'm Deepanshu, trying to build this node-docker-express app, using docker-compose and distributing the workflow into dev and prod env. This is for testing out the production server</h2>");
    
    // For checking out whether the application can scale to two node instaces or not
    console.log("Yeah, Its working");
});

// localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port ${port}'));