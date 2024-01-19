console.log("Nodemon is RUNNING")
// DEPENDENCIES

// initialize .env variables
require("dotenv").config()

// connect to database
require("./config/db.connection")

// connect to passport for google oauth
require('./config/passport')

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;

// import express
const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser');
const { default: mongoose } = require("mongoose")
const cors = require("cors") // Controls access to the API
const morgan = require("morgan") 
// const session = require('express-session')
// const passport = require('passport');
const authRouter = require('./routes/oauth')
const requestRouter = require('./routes/request')
// const htmlAuthRouter = require('./routes/htmlAuth')
// const htmlFileRouter = require('./routes/htmlResponse')

// import routers
const songsRouter = require('./routes/songs')
// const showsRouter = require('./routes/shows')

// create application object
const app = express();

app.options('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", ['X-Requested-With','content-type','credentials']);
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.status(200);
    next()
  })
// MIDDLEWARE
app.use(express.urlencoded({extended:true})) //needed as we will have form requests
app.use(express.json()) // parses the header with the body
app.use(cookieParser())
app.use(cors()); // to minimize cors errors, open access to all origins
app.use(morgan("dev")); // logging for development, not needed in prod
app.use(express.static(path.join(__dirname, 'public')))
app.use('/oauth', authRouter)
app.use('/request', requestRouter)
// app.use('/htmlAuth', htmlAuthRouter)
// app.use('/htmlResponse', htmlFileRouter)
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true
//   }))
// app.use(passport.initialize())
// app.use(passport.session())

app.use('/songs', songsRouter)



// create a test route
app.get("/", (req, res) => {
    res.send("Express Backend Running");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

// LISTENER

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

