// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// Require the Burger model
var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

  // Get all messages
  app.get("/api/all", function(req, res) {

    // Finding all messages, and then returning them to the user as JSON.
    // Sequelize queries are aynchronous, which helps with percieved speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    db.Message.findAll({}).then(function(dbMessage) {
      // results are available to us inside the .thenzz
      res.json(dbMessage);
    });

  });

  // Add a message
  app.post("/api/new", function(req, res) {

    console.log("Message Data:");
    console.log(req.body);

    db.Message.create({
      author: req.body.author,
      body: req.body.body
    }).then(function(results) {
      // `results` here would be the newly created message
      res.end();
    });

  });

};