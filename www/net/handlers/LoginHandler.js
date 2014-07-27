function LoginHandler() {

}

LoginHandler.prototype.handle = function (packet) {
    var reconnecting = packet.reader.readByte();
    var clientVersion = packet.reader.readInt();

    console.log(reconnecting, clientVersion);

    for(var i = 0; i < 4; i++) {
        console.log("Session key", packet.reader.readInt());
    }
};

module.exports = LoginHandler;