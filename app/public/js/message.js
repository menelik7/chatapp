$(document).ready(function() {
  // Declare global variables
  var userName = "";
  var email = "";
  var password = "";
  var newMessage = {};
  var scale = 0;
  const chatroom = document.getElementById('chatroom');
  const login = document.getElementById('login');
  const emailReset = document.getElementById('reset-email');
  // chatroom.classList.add('hide')

  // Add login event
  $("#login-submit").on('click', e => {
    e.preventDefault();
    //Get email & password
    userName = $('#userName').val().trim();
    const email = $('#email').val().trim();
    const pass = $('#password').val().trim();
    const auth = firebase.auth();
    // $('#email').val("");
    // $('#password').val("");
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => alert(e.message));
  });

  // Signup user
  $("#signup").on('click', e => {
    e.preventDefault();
    // Get email and password
    userName = $('#userName').val().trim();
    const email = $('#email').val().trim();
    const pass = $('#password').val().trim();
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => alert(e.message));
  });

  // Logout user
  $("#logout").on('click', e => {
    firebase.auth().signOut();
    login.classList.remove('hide');
    chatroom.classList.add('hide');
  });

  // Add a real time auth listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
      $("#currentUser").html(userName);
      $('#userName').val('');
      $('#email').val('');
      $('#password').val('');
      console.log(firebaseUser);
      login.classList.add('hide');
      chatroom.classList.remove('hide');
    } 
    else{
      console.log("Not logged in!");
    }
  });

  // Reset password
  $("#reset-password").on('click', e => {
    emailReset.classList.remove('hide');
    $('#login').hide();
  });

  // Set the date for the new messages
  var d = new Date();
  $("#date").html(d.toDateString());

  // Using socket.io to append new messages in real time across all current users
  $(function () {
    var socket = io();
    $('#message-submit').on('click', function(){
      newMessage = {
        author: userName,
        password: password,
        body: $("#message-box").val().trim(),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      };
      console.log(newMessage);
      $.post("/api/new", newMessage);
      socket.emit('chat message', $('#message-box').val());
      $('#message-box').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      console.log(msg);
      var row = $("<div>");
      row.addClass("message");
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
        $("#message-area").prepend(row);
      });
    });
  });

  // When the page loads, grab all of our messages
  $.get("/api/all", function(data) {

    if (data.length !== 0) {

      for (var i = 0; i < data.length; i++) {

        var row = $("<div>");
        row.addClass("message");
        row.append("<p><strong>" + data[i].author + "</span></strong>  " + moment(data[i].created_at).format("h:mma") +"</p>");
        row.append("<p>" + data[i].body + "</p>");
        $("#message-area").prepend(row);

      }

    }

  });
});

