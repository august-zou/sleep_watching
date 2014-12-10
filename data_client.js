var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var INTERVAL_TIME = 5000;
var client = new net.Socket();

client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // 建立连接后立即向服务器发送数据，服务器将收到这些数据 
    client.write('I am Chuck Norris!');

});

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var fs = require('fs');
var bufferStr = fs.readFileSync('data.dat');
var data_index = 0;


function sendData(){
  if (data_index < bufferStr.length){
    for(var i=0;i<60;++i){
      console.log(bufferStr.readUInt8(data_index+i));
    }
    client.write(sendStr);
  } else {
   client.write(0)
  }
}
//send data per second
//setInterval(sendData,INTERVAL_TIME);

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // 完全关闭连接
    if (data == "0")client.destroy();

});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
});
