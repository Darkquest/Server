var PacketDecoder = require('./net/PacketDecoder');
var PacketHandlerFactory = require('./net/PacketHandlerFactory');
var packetHandler = PacketHandlerFactory.defaultHandler();

var bytebuffer = require('bytebuffer');
function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
    console.log('server connected');
    c.on('end', function() {
        console.log('client disconnected');
    });
    c.on('data', function (buffer) {
        if (buffer.length < 2) {
            console.log("Received a short package");
            return;
        }
        var binary = require('binary');

        var ws = binary.parse(buffer)
                .skip(1)
                .word8bu('length')
                .word8bu('id')
                .tap(function (vars) {
                    this
                        .buffer('payload', vars.length - 1)
                        .tap(function (packet) {
                            console.log(packet);
                            packetHandler.handle(packet, c);
                        });
                });
    });
});
server.listen(80, function(connection) { //'listening' listener
    console.log('server bound',connection );
});
