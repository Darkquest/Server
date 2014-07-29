var BufferReader = require('./utils/BufferReader');
var Packet = require('./Packet');

function calculatePacketLength(bufferReader) {
    var length = bufferReader.readNext();
    if (length < 160)  {
        return length;
    }
    return (length - 160) * 256 + bufferReader.readNext();
}

var EMPTY_BUFFER = new Buffer(0);


module.exports.decode = function (buffer) {




    var bufferReader = new BufferReader(buffer);

    var length = calculatePacketLength(bufferReader);
    var id;
    var payload;

    id = bufferReader.readNext();
    payload = bufferReader.readSlice(length - 1);

    console.log(id, payload, length);

    return new Packet(id, payload);
}