import express from 'express'
import HTTP from 'http'
import Socket from 'socket.io'

const app = express();
const http = HTTP.Server(app);
const io = Socket(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
