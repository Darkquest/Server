function SessionHandler() {

}

SessionHandler.prototype.handle = function (packet, connection) {
    connection.write(new Buffer('00000000000000000000000000000001'.split("")));
};

module.exports = SessionHandler;