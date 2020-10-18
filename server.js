// Based on nodejs-express framework
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// online people counter
var onlineCount = 0;
// Set default home page
app.use(express.static(__dirname,{index:"login.html"}));
app.get('/login.html', function (request, response) {
    response.sendFile('login.html');
});

// io is triggered when a user login
io.on('connection', function (socket) {
    console.log('a user connected');

    // update online people counter
    io.emit('connected', ++onlineCount);

    // handle counter when user disconnected
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('disconnected', --onlineCount);
        console.log(onlineCount);
    });

    // use socket to handle message
    socket.on('message', function (message) {
        io.emit('message', message);
    });

});

// listen to port 4000
var server = http.listen(4000, function () {
    console.log('Sever is running');
});
