var BufferReader = require('./utils/BufferReader');
var Packet = require('./Packet');

function calculatePacketLength(bufferReader) {
    var length = bufferReader.readByte();
    if (length < 160)  {
        return length;
    }
    return (length - 160) * 256 + bufferReader.readByte();
}

var EMPTY_BUFFER = new Buffer(0);

module.exports.decode = function (buffer) {

    var bufferReader = new BufferReader(buffer);

    var length = calculatePacketLength(bufferReader);
    var id;
    var payload;

    if (length > 160) {
        id = bufferReader.readByte();
        payload = bufferReader.readSlice(length - 1);
    }
    else if (length >= 2) { // some magic
        throw new Error("implement");
    }
    else {
        id = bufferReader.readByte();
        payload = EMPTY_BUFFER;
    }

    return new Packet(id, payload);
}