var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var context = require('rabbit.js').createContext('amqp://localhost');

var app = express();
var port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"sleep_watching",
  cookie:{maxAge: 60*1000}
}));

app.use(express.static(path.join(__dirname,'static')));

app.use(function(req,res) {
  res.sendFile(__dirname +'/static/index.html');
})

var server = app.listen(port);
console.log("sleep wathing is on port " + port +"...");

var io = require('socket.io').listen(server)
//io.sockets.on('connection', function (socket) {
//  socket.emit('pressure.read',"hello");
//});

//rabbitmq sub
var sub = context.socket('SUBSCRIBE');

sub.connect('alerts');
sub.on('data', function(note) { 
  var data = new Array(note.length);
  for(var i=0;i<note.length;++i){
    data[i]=note.readUInt8(i);
  }
  io.emit("pressure.read",data);
  console.log("sub get: "); 
  console.log(data);
});
