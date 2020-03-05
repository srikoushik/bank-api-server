var express = require('express');
const { param, query, validationResult } = require('express-validator');
var router = express.Router();
let bankDetailsModel = require('../models/bankDetails');

const ifscValdation = param('ifsc', 'Enter a valid IFSC').matches(/[A-Z]{4}[0][\d]{6}$/, "g");
const nameAndCityValidation = [
    query('bankName', 'Value is empty').exists(),
    query('city', 'Value is empty').exists()
];

router.get('/:ifsc', [ifscValdation], async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).send(error);
    }

    const params = {
        ifsc: req.params.ifsc
    };

    try {
        const data = await bankDetailsModel.getDetailsWithIfsc(params);
        res.status(200).send(data);
    } catch (error) {
        res.send(error);
    }
});

router.get('/', nameAndCityValidation, async (req, res) => {

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

    try {
        const data = await bankDetailsModel.getDetailsWithNameAndCity(params);
        res.status(200).send(data);
    } catch(error) {
        res.send(error);
    }
});

module.exports = router;