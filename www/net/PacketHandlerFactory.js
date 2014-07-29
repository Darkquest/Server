var PacketHandler = require('./PacketHandler');

module.exports = {
    defaultHandler : function () {

        var packetHandler = new PacketHandler();
        packetHandler.addPacketHandler(packetHandler.PACKET_IDS.LOGIN, new (require('./handlers/LoginHandler')));
        packetHandler.addPacketHandler(packetHandler.PACKET_IDS.SESSION_ID_REQUEST, new (require('./handlers/SessionHandler')));

        return packetHandler;
    }
}