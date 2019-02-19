/**
 * isValidLogger
 * This method accepts a logger as a param
 * and checks if the logger has info, error,
 * debug, fatal, warn, trace, and child methods
 * and if those methods are each a valid function
 * then it is considered a valid logger
 *
 * @param {Object} logger
 */
const isValidLogger = logger => {
    if (!logger) {
        return false;
    }

    let result = true;
    const methods = [ "info", "error", "debug", "fatal", "warn", "trace", "child" ];

    for (let i = 0; i < methods.length; i += 1) {
        if (!logger[methods[i]] || typeof logger[methods[i]] !== "function") {
            result = false;
            break;
        }
    }

    return result;
};

module.exports = { isValidLogger };
