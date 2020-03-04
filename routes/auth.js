var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');

router.get('/generate', function (req, res) {
    const token = jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: '5d'
    });

    res.status(200).send(token);    
});

module.exports = router;