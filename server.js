// load the env consts
require('dotenv').config();

// ------ IMPORT MODULES ------ //
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');


// ------ SESSION MIDDLEWARE------ //
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

const indexRoutes = require('./routes/index');
const habitsRouter = require('./routes/habits');
const logsRouter = require('./routes/logs');


// create the Express app
const app = express();

// ------ Connect to MongoDB w/ Mongoose ------ //
require('./config/database');
// configure Passport
require('./config/passport');


// ------ EJS ------ //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ------ MIDDLEWARE ------ //
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ------ MOUNT SESSION MIDDLEWARE ------ //
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

// ------ PASSPPORT MIDDLEWARE ------ //
app.use(passport.initialize());
app.use(passport.session());


// ------ GLOBAL VARIABLES ------ //  <- add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});

// ------ MOUNT ROUTES ------ //
app.use('/', indexRoutes);
app.use('/habits', habitsRouter);
app.use('/', logsRouter);


// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
