var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req,res) {
    console.log('here');
    res.sendFile(path.join(__dirname, '../public/',    'export.html'))
});

module.exports = router;
