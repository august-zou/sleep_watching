var net = require('net');
var context = require('rabbit.js').createContext('amqp://localhost');
var pub = context.socket('PUBLISH');
pub.connect('alerts');

var HOST = '192.168.2.101';
var PORT = 6969;


var HOST_SEND_TO = '192.168.2.106';
var PORT_SEND_TO = 8989;

var client = new net.Socket();
client.connect(PORT_SEND_TO, HOST_SEND_TO, function() {

    console.log('CONNECTED TO: ' + HOST_SEND_TO + ':' + PORT_SEND_TO);
    // 建立连接后立即向服务器发送数据，服务器将收到这些数据 
    client.write('I am August!');

});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // 完全关闭连接
    client.destroy();

});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
});


// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
net.createServer(function(sock) {

    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort);

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
       console.log('DATA ' + sock.remoteAddress + ': ');
       console.log(data);

       console.log('Send To  ' + HOST_SEND_TO + '... ');
       client.write(data);

       pub.write(data);
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
