var express = require('express');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var path = require("path");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var PORT = process.env.PORT || 8080;
// Requiring our models for syncing
var db = require("./models");

// Static directory
app.use(express.static("public"));

// Override with POST having ?_method=PUT
// app.use(methodOverride('_method'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
  
db.sequelize.sync().then(function() {
	http.listen(PORT, function(){
	  console.log('listening on *' + PORT);
	});
});