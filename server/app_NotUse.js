var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require ("./config/database.js");
var tb_disaster = require ('./models/tb_disaster');


var indexRouter = require('./routes/indexRoute');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

try {
    await db.authenticate();
    console.log ("Database Connected");
    await tb_disaster.sync();
} catch (error) {
    console.log (error);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

module.exports = app;
