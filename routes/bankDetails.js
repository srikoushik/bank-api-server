var express = require('express');
const { query, validationResult } = require('express-validator');
var router = express.Router();
var bankDetailsModel = require('../models/bankDetails');

router.get('/ifsc', [query('ifsc', 'Enter a valid IFSC').matches(/[A-Z]{4}[0][\d]{6}$/, "g")], function (req, res) {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).send(error);
    }

    bankDetailsModel
    .getDetailsWithIfsc({ifsc: req.query.ifsc})
    .then(function(data){
        res.status(200).send(data);
    }, function(error){
        res.send(error);        
    });
});

router.get('/nameAndCity', [
    query('bankName', 'Value is empty').exists(),
    query('city', 'Value is empty').exists()
  ], function (req, res) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send(errors);
    }

    let params = {
        bankName : req.query.bankName.trim().toUpperCase(),
        city : req.query.city.trim().toUpperCase()
    }
    
    if(req.query.limit){
        params.limit = req.query.limit;
    }

    if(req.query.offset){
        params.offset = req.query.offset;
    }

    bankDetailsModel
    .getDetailsWithNameAndCity(params)
    .then(function(data){
        res.status(200).send(data);
    }, function(error){
        res.send(error);        
    });
});

module.exports = router;