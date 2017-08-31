// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");

// // Creates a "Message" model that matches up with DB
// var Message = sequelize.define("message", {
//   author: {
//     type: Sequelize.STRING
//   },
//   body: {
//     type: Sequelize.STRING
//   },
//   created_at: {
//     type: Sequelize.DATE
//   }
// }, {
//   timestamps: false
// });

// // Syncs with DB
// Message.sync();

// // Makes the Message Model available for other files (will also create a table)
// module.exports = Message;

module.exports = function(sequelize, DataTypes) {
  // Define the Message sequelize model
  var Message = sequelize.define("Message", {
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Message;
};
