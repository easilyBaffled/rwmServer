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
    //$('#pos').append($('<li>').text(pos));
  })
  socket.on('loaded', function (message) {
    console.log(message);
  })
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:'+process.env.PORT || 3000);
});
