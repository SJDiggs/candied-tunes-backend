console.log("Nodemon is RUNNING")
// DEPENDENCIES

// initialize .env variables
require("dotenv").config()

// connect to database
require("./config/db.connection")

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;

// import express
const express = require("express")
const { default: mongoose } = require("mongoose")
const cors = require("cors") // Controls access to the API
const morgan = require("morgan") //

// import routers
const songsRouter = require('./routes/songs')
// const showsRouter = require('./routes/shows')

// create application object
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({extended:true})) //needed as we will have form requests
app.use(express.json()) // parses the header with the body
app.use(cors()); // to minimize cors errors, open access to all origins
app.use(morgan("dev")); // logging for development, not needed in prod
app.use('/songs', songsRouter)

// ROUTES

// create a test route
app.get("/", (req, res) => {
    res.send("ELLO GOVNAH!");
});

// LISTENER

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

