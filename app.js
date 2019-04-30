var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var session = require("express-session");
var flash = require("connect-flash");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var MongoStore = require("connect-mongo")(session);
var User = require("./models/user.js");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//Mongoose Connect
mongoose.connect(process.env.DATAURL, {useNewUrlParser: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "This is where u store the orders foo!",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Passing middleware to all templates
app.use(function(req, res, next){
    req.app.locals.currentUser = req.user;
    req.app.locals.error = req.flash("error");
    req.app.locals.success = req.flash("success");
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/user', usersRouter);
app.use('/', indexRouter);


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Your Restaurant app is online");
});
