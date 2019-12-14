var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('dotenv').config();

// const productRoutes = require("./routes/");
const orderRoutes = require("./routes/order");
var restaurant = require('./routes/restaurant/index');

var app = express();

// ============================== mongo connection
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = 'mongodb://localhost:27017/node'

const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db)=>{
  console.log('Successfully connected to db');
},(error)=>{
  console.log(error);
});
// ======================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers:
app.use('/restaurant', restaurant);
// app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use('/get', (res, req, next)=>{
  throw new Error('this is error')
})

function middlewareError(err, re, res, next){
  console.oog("Error", err);
  next(err)
}

// app.use('/custom-error', (res, req, next)=>{

// }, middlewareError)
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   res.json({error: true})
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
