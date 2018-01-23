var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
  
  var userName = socket.handshake.query.name;

  console.log(userName+' has connected.');

  socket.on('disconnect', function(){
     console.log( userName+' has left the chat.');
  });
  
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });


});
    
// io.emit('some event', { for: 'everyone' });    

http.listen(3000, function(){
  console.log('listening on *:3000');
});