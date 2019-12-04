var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');



mongoose.connect('mongodb://localhost:27017/cms');




prompt.set('port');

const server = http.createServer(app);
server.listen(port, function() { console.log("API running on localost: " + port) });