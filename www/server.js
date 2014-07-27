var PacketDecoder = require('./net/PacketDecoder');
var PacketHandlerFactory = require('./net/PacketHandlerFactory');
var packetHandler = PacketHandlerFactory.defaultHandler();

var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
    console.log('server connected');
    c.on('end', function() {
        console.log('client disconnected');
    });
    c.on('data', function (buffer) {
        if (buffer.length < 2) {
            console.log("Recieved a short package");
            return;
        }
        var packet = PacketDecoder.decode(buffer);
        console.log("Recieved packet with id", packet.id);
        packetHandler.handle(packet);
    });
});
server.listen(80, function(connection) { //'listening' listener
    console.log('server bound',connection );
});
