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
BufferReader.prototype.currentIndex = 0;

/**
 * Updates the current index (used internally only)
 * @param count
 */
BufferReader.prototype.updateCurrentIndex = function (count) {
    this.currentIndex += count;
}
/**
 * Reads a byte from the buffer and updates the current index by 1
 * @returns {*}
 */
BufferReader.prototype.readByte = function () {
    var byte = this.buffer[this.currentIndex];
    this.updateCurrentIndex(1);
    return byte;
};

/**
 * Reads a slice of data from the buffer
 * @param count
 * @returns {Array|string|Blob}
 */
BufferReader.prototype.readSlice = function (count) {
    var subbuffer = this.buffer.slice(this.currentIndex, count);
    this.updateCurrentIndex(count);
    return subbuffer;
};

/**
 *
 * @returns Number
 */
BufferReader.prototype.readInt = function () {
    var int = this.buffer.readInt32LE(this.currentIndex);
    this.updateCurrentIndex(32);
    return int;
}

module.exports = BufferReader;