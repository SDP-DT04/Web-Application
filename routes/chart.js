var express = require('express');
var router = express.Router();
var path = require("path");
var http = require('http').Server(express)
var io = require('socket.io')(http);

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'analytics.html'))
});

module.exports = router;
