var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nodemailer = require('nodemailer');
var locationSet = [];


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'lego90511@gmail.com',
        pass: 'ichtomhuggqahgwq'
    }
});

var mailOptions = {
    from: '<lego90511@gmail.com>', // sender address
    to: 'dmichaelis0@gmail.com', // list of receivers
    subject: 'Test', // Subject line
    text: 'TEST', // plaintext body
    html: '<b style="color: green">One Hell Of A Test ✔</b>' // html body
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('newPos', function (posData) {
    console.log(posData.longitude, posData.latitude, posData.distance, posData.time);
    locationSet.push(posData);
    io.emit('newPos', posData);
  });
  socket.on('test', function (message) {
    console.log(message);
    io.emit('test', message);
  });
  socket.on('disconnect', function() {
    mailOptions.text = JSON.stringify(locationSet);
    mailOptions.html = '<div>' + JSON.stringify(locationSet) + '</div>';
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:'+process.env.PORT || 3000);
});
