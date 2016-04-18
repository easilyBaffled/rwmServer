var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var phantomjs = require('phantomjs');
var Horseman = require('node-horseman');
// var horseman = new Horseman();


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('scrape', function(selectionData){
    console.log('scraping');
    var horseman = new Horseman({phantomPath: phantomjs.path});
    horseman.open(selectionData.url)
            .text(selectionData.selector)
            .then(function (text) {
              io.emit('selection', { path: selectionData.selector, text: text, url: selectionData.url});
            })
            .close();
  });
  socket.on('selection', function (selectionData) {
    console.log('received data', selectionData);
    io.emit('selection', selectionData);
  });

});


http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:'+process.env.PORT || 3000);
});
