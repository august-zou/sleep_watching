var context = require('rabbit.js').createContext('amqp://localhost');
var sub = context.socket('SUBSCRIBE');

sub.connect('alerts');
sub.setEncoding('utf8');
sub.on('data', function(note) { console.log("Alarum! %s", note); });
