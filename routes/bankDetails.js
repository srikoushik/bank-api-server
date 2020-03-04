var express = require('express');
const { check, query, param, validationResult, validationErrors } = require('express-validator');
var router = express.Router();
var bankDetailsModel = require('../models/bankDetails');

router.get('/', [param('ifsc', 'Enter a valid IFSC').matches("/[A-Z]{4}[0][\d]{6}$/")], function (req, res) {
    // TODO: Validate IFSC
    
    bankDetailsModel
    .getDetailsWithIfsc({ifsc: req.param('ifsc')})
    .then(function(data){
        res.status(200).send(data);
    }, function(error){
        // TODO: Format the error properly
        res.send(error);        
    });
});

module.exports = router;