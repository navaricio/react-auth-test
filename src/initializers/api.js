const fastify = require("fastify");
const staticFiles = require("fastify-static");
const pointOfView = require("point-of-view");
const handlebars = require("handlebars");
const path = require("path");
const _ = require("lodash");
const uuid = require("uuid");
const assert = require("assert");
const { isValidLogger } = require("../utils/isValidLogger");

const startServer = async (config, log) => {
    assert(isValidLogger(log), "startServer method requires a valid log instance");
    assert(!_.isEmpty(config), "startServer method requires a valid config object");
    const childLog = log.child({ module: "api Initializer" });

    log.genReqId = () => uuid.v4();
    const API = fastify({
        logger: log
    });

    API.register(staticFiles, {
        root: path.join(__dirname, "../../client/build/"),
        prefix: "/" // optional: default '/'
    });

    API.register(pointOfView, {
        engine: {
            handlebars
        },
        options: {
            filename: path.resolve(path.join(__dirname, "../../client/build/"))
        }
    });

    /**
     * Heartbeat route, internal only
     * for monitoring purposes, however
     * because it's serving react,
     * in the case that a call was made to
     * any other path, then REACT will catch it.
     */

    API.get("/:path", (request, reply) => {
        if (request.params.path === "health") {
            reply.send({ status: "ok" });
        }
        reply.view("/client/build/index.html", { config: JSON.stringify(config.client) });
    });

    childLog.info({ config }, `Http server initialized ${config.api.port}`);
    return await API.listen(config.api.port, "0.0.0.0");
};

module.exports = startServer;
