// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Message = require("../models/message.js");


// Routes
// =============================================================
module.exports = function(app, io) {

  // Get all messages
  app.get("/api/all", function(req, res) {

    // Finding all messages, and then returning them to the user as JSON.
    // Sequelize queries are aynchronous, which helps with percieved speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    Message.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });

  });

  // Add a message
  app.post("/api/new", function(req, res) {

    console.log("Message Data:");
    console.log(req.body);

    Message.create({
      author: req.body.author,
      password: req.body.password,
      body: req.body.body,
      created_at: req.body.created_at
    }).then(function(results) {
      // `results` here would be the newly created message
      res.end();
    });

  });

};