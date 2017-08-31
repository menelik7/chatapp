
var db = require("../models");

module.exports = function(app){
app.get("/", function(req, res){
  res.sendFile(__dirname + '/public/index');
});
};
