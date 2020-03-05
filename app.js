const express = require('express');
let app = express();
var jwt = require('jsonwebtoken');
const { Client } = require('pg');

require('dotenv').config({ path: __dirname + '/bin/local.env' });

global.dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

dbClient.connect();

let authRoute = express.Router();
let apiRoute = express.Router();

app.use('/auth', authRoute);
app.use('/api', apiRoute);

apiRoute.use(function(req, res, next){
	const token = req.headers['token'];
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
			if (err) {
				if (err.name === "TokenExpiredError") {
          return res.status(401).send("Token expired. Generate new token.");
        }
        return res.status(401).send("Not a valid token.");
      }
      next();
		});
	} else {
    return res.status(401).send("Token missing in the headers.");
	}
});

const index = require('./routes/index');
const auth = require('./routes/auth');

app.use('/', index);
authRoute.use(auth);

const bankDetails = require('./routes/bankDetails');

apiRoute.use('/bankDetails', bankDetails);

module.exports = app;