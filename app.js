var express = require('express');
var app = express();
var jwt    = require('jsonwebtoken');

require('dotenv').config({ path: __dirname + '/bin/local.env' })

var authRoute = express.Router();
app.use('/auth', authRoute);

var index = require('./routes/index');
var auth = require('./routes/auth');

app.use('/', index);
authRoute.use(auth);

module.exports = app;