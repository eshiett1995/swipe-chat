require('dotenv').config();

const { initializeApp } = require('firebase-admin/app');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var favicon = require('serve-favicon');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected');
});

var router = express.Router();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(favicon(__dirname + '/public/dist/img/favicon.png'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sign-in.html', indexRouter);
app.use('/sign-up.html', usersRouter);
// app.use('/index-2.html', router.get('/', function(req, res, next) {
//       res.render('index-2', { title: 'Swipe' });
//     }));

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

module.exports = app;
