const dotenv = require("dotenv");
const DEFAULT_SERVICE_PORT = 4000;

dotenv.config();

const port = parseInt(process.env.SERVICE_PORT, 10) || DEFAULT_SERVICE_PORT;

const config = {
    api: {
        port,
        log: {
            level: process.env.LOG_LEVEL || "debug"
        }
    },
    client: {
        auth: {
            clientID: process.env.AUTH_CLIENT_ID,
            domain: process.env.AUTH_DOMAIN,
            callbackURL: process.env.AUTH_CALLBACK_URL
        }
    }
};

/**
 * This exists in order to upload the config file
 * to react as part as the window.config property
 * and so that we can use this configuration inside
 * the React application.
 */
if (require.main === module) {
    /**
     * Because Windows is awesome!
     * if it was any unix|linux shell none of this crazyness would be needed!
     */
    // eslint-disable-next-line no-console
    console.log(`REACT_APP_CONFIG=${JSON.stringify(config.client)}`);
}

module.exports = config;
