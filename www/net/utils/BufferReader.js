var bytearray = require('bytearray');

/**
 *
 * @param buffer Buffer
 * @constructor
 */
function BufferReader(buffer) {
    this.buffer = buffer;
}

/**
 *
 * @type Buffer
 */
BufferReader.prototype.buffer;

/**
 * Keeps track on how much we've read from the buffer (used internally only)
 * @type {number}
 */
BufferReader.prototype.currentIndex = 1;

/**
 * Reads a byte from the buffer and updates the current index by 1
 * @returns {*}
 */
BufferReader.prototype.readNext = function () {
    return this.buffer[this.currentIndex++];
};

/**
 * Reads a slice of data from the buffer
 * @param count
 * @returns {Array|string|Blob}
 */
BufferReader.prototype.readSlice = function (count) {
    var subbuffer = this.buffer.slice(this.currentIndex, count);
    this.currentIndex += count;
    return subbuffer;
};

module.exports = BufferReader;