var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('scrape', function(selectionData){
    console.log('scraping');
    horseman.open(selectionData.url).text(selectionData.selector)
            .then(function (text) {
              io.emit('selection', { path: selectionData.selector, text: text, url: selectionData.url});
            })
            .close();
  });
  socket.on('selection', function (selectionData) {
    console.log('recived data');
    io.emit('selection', selectionData);
  });

});


http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:'+process.env.PORT || 3000);
});
