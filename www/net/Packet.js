var BufferReader = require('./utils/BufferReader');

function Packet(id, payload) {
    this.id = id;
    this.payload = payload;
    this.reader = new BufferReader(this.payload);
}
/**
 * @type BufferReader
 */
Packet.prototype.reader;

module.exports = Packet;