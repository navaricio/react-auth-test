const config = require("./config");
const startServer = require("./src/initializers/api");
const log = require("./src/initializers/log");

const ERROR_EXIT_CODE = 1;
const childLog = log.child({ module: "API Main Module" });

const initialize = async () => {
    childLog.info("Starting Server");
    try {
        /**
         * Start API
         */
        await startServer(config, log);

        /**
         * These errors should never be trigger
         * in case they do they will crash the application
         * we should be able to check WTF is going on, why
         * is there an unhandled rejection and where.
         */
        process.on("uncaughtException", err => {
            childLog.error("Process Uncaught Exception");
            throw err;
        });

        process.on("unhandledRejection", (reason, p) => {
            childLog.info({ reason, p }, "Process Unhandled Rejection");
            throw new Error("Unhandled Rejection");
        });
        // End
    } catch (err) {
        childLog.error(
            { err, method: "initialize" },
            "Error initializing server"
        );
        process.exit(ERROR_EXIT_CODE);
    }
};

initialize();
