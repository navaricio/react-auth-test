const bunyan = require("bunyan");
const config = require("../../config");
const { name, version } = require("../../package.json");

const log = bunyan.createLogger({
    name,
    level: config.api.log.level,
    stream: process.stdout,
    serializers: bunyan.stdSerializers,
    version
});

module.exports = log;
