var PacketHandler = require('./PacketHandler');

module.exports = {
    defaultHandler : function () {

        var packetHandler = new PacketHandler();
        packetHandler.addPacketHandler(packetHandler.PACKET_IDS.LOGIN, new (require('./handlers/LoginHandler')));

        return packetHandler;
    }
}