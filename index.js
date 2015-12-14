var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('newPos', function (pos) {
    console.log(pos);
    io.emit('newPos', pos);
  })
  socket.on('loaded', function (message) {
    console.log(message);
  })
  socket.on('test', function (message) {
    console.log(message);
    io.emit('test', message);
  })
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:'+process.env.PORT || 3000);
});
