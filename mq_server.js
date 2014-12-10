var context = require('rabbit.js').createContext('amqp://localhost');
var sub = context.socket('SUBSCRIBE');

sub.connect('alerts');
sub.on('data', function(note) { 
  console.log("sub get: "); 
  console.log(note);
});
