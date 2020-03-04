var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send("Node application is running.");    
});

module.exports = router;