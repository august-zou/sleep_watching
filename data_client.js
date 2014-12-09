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

function sendData(){
 var sendStr="";
 for(var i=0;i<60;++i){
   sendStr += randomInt(0,255);
   if (i!=59) sendStr += ",";
 }
 client.write(sendStr);
}
//send data per second
setInterval(sendData,INTERVAL_TIME);

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
