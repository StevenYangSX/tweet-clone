const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routers/index');
//import mongoose
const mongoose = require("mongoose");
//DB connection 
const connectDB = require("./config/db");
//Datbase Connection
connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));


// catch 404 error and forward to error handler
// app.use((req, res, next) => {
//     const err = new Error('Page Not Found');
//     err.status = 404;
//     next(err);
// });

app.use((err, req, res, next) => {
    res.send(err.message);
});




app.get('/', index);

app.listen(3000, () => console.log('Example app listening on port 3000!'));