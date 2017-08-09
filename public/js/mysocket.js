const socket = io();

$('#newuser').submit(function(e){
  e.preventDefault();
  socket.emit('submituser', $('#username').val());
})

socket.on('userexists', function(data) {
  alert('User ' + data + ' tried to join the chat but already participates!');
})

socket.on('newuser', function() {
  $('.login').hide();
  $('.chat').fadeIn(1500);
})

socket.on('invalidusername', function(){
  alert('Username not valid. Please try again.');
})

socket.on('invalidmessage', function(){
  alert('Message cannot be empty!');
})

socket.on('insertmsg', function(msg, username){
  $('#chatbody').append('<div class="card"><div class="card-block">'+ username + ': ' + msg +'</div></div><br>');
})

$('#sendmsg').submit(function(e){
  var msg = $('#msgbox').val();
  e.preventDefault();
  socket.emit('newmsg', msg);
  $('#msgbox').val('');
});
