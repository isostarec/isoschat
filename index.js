const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const apport = 3000;

var users = [];

app.use(express.static('public'));
server.listen(process.env.PORT || apport);
console.log('Express listening on port ' + apport + '!');

io.on('connection', function(socket){

  socket.on('submituser', function(data){
    socket.username = data;
    if(users.indexOf(data) == -1 && data.length) {
      users.push(data);
      socket.emit('newuser');
      console.log('New user logged in with Id of ' + socket.id + ' and username of ' + socket.username + '!');
    } else if(users.indexOf(data) != -1) {
      socket.emit('userexists', socket.username);
    } else if(!data) {
      socket.emit('invalidusername');
    }

    socket.on('newmsg', function(msg){
      if(!msg){
        socket.emit('invalidmessage');
      } else {
        io.sockets.emit('insertmsg', msg, socket.username);
      }
    })

    socket.on('disconnect', function(){
      console.log('User ' + socket.username + ' with socket ' + socket.id + ' disconnected');
    })

  })

});
