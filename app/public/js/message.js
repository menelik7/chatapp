$(document).ready(function() {
  // Declare global variables
  var userName = "";
  var password = "";
  var newMessage = {};
  var scale = 0;
  const chatroom = document.getElementById('chatroom');
  const login = document.getElementById('login');
  chatroom.classList.add('hide')

  // Set the date for the new messages
  var d = new Date();
  $("#date").html(d.toDateString());

  // Event listenener for login
  $("#login-submit").on("click", function(event) {
    chatroom.classList.remove('hide');
    login.classList.add('hide')
    event.preventDefault();
    userName = $('#userName').val().trim();
    password = $('#password').val().trim();
    var user = {
      userName: userName, 
      password: password
    }

    console.log(user);
    $("#currentUser").html(userName);
    chatroom.classList.remove('hide');
    login.classList.add('hide')

  });

  // Using socket.io to append new messages in real time across all current users
  $(function () {
    var socket = io();
    $('#chirp-submit').on('click', function(){
      newMessage = {
        author: userName,
        password: password,
        body: $("#chirp-box").val().trim(),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      };
      console.log(newMessage);
      $.post("/api/new", newMessage);
      socket.emit('chat message', $('#chirp-box').val());
      $('#chirp-box').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      console.log(msg);
      var row = $("<div>");
      row.addClass("chirp");
      $.get("/api/all", function(data) {
        if (data.length !== 0) {

          for (var i = 0; i < data.length; i++) {
            var currentIndex = i;
          }
          if(currentIndex > scale){
            scale = currentIndex;
            row.append("<p><strong><span style='color:#ff0000'>" + data[currentIndex].author + "</span></strong>  " + moment(data[currentIndex].created_at).format("h:mma") +"</p>");
            row.append("<p>" + msg + "</p>");
          }
        }
        $("#chirp-area").prepend(row);
      });
    });
  });

  // When the page loads, grab all of our chirps
  $.get("/api/all", function(data) {

    if (data.length !== 0) {

      for (var i = 0; i < data.length; i++) {

        var row = $("<div>");
        row.addClass("chirp");
        row.append("<p><strong>" + data[i].author + "</span></strong>  " + moment(data[i].created_at).format("h:mma") +"</p>");
        row.append("<p>" + data[i].body + "</p>");
        $("#chirp-area").prepend(row);

      }

    }

  });
});

