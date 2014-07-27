var BufferReader = require('./utils/BufferReader');
var Packet = require('./Packet');

function calculatePacketLength(bufferReader) {
    var length = bufferReader.readUnsignedByte();
    if (length < 160)  {
        return length;
    }
    return (length - 160) * 256 + bufferReader.readUnsignedByte();
}

var EMPTY_BUFFER = new Buffer(0);

module.exports.decode = function (buffer) {

    console.log(buffer);

    var bufferReader = new BufferReader(buffer);

    var length = calculatePacketLength(bufferReader);
    var id;
    var payload;

    if (length > 160) {
        id = bufferReader.readUnsignedByte();
        payload = bufferReader.readSlice(length - 1);
    }
    else if (length >= 2) { // some magic
        throw new Error("implement");
    }
    else {
        id = bufferReader.readUnsignedByte();
        payload = EMPTY_BUFFER;
    }

    console.log(length, id, payload.toString());
    return new Packet(id, payload);
}