
function PacketHandler() {

}

PacketHandler.prototype.handlers = {

};

PacketHandler.prototype.PACKET_IDS = {
    SESSION_ID_REQUEST : 32,
    LOGIN : 0,
    LOGOUT : 29,
    PING : 67
}

PacketHandler.prototype.addPacketHandler = function (packetId, handler)  {
    this.handlers[packetId] = handler;
}

PacketHandler.prototype.handle = function (packet, connection) {
    var handler = this.handlers[packet.id];
    if (!handler) {
        throw new Error('No handler found for packet id ' + packet.id);
    }
    handler.handle(packet, connection);
}


module.exports = PacketHandler;