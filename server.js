var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/public/index.html');
});

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("app/public"));

// Routes
// =============================================================
require("./app/routes/api-routes.js")(app);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
  

http.listen(3000, function(){
  console.log('listening on *:3000');
});
