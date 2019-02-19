import auth0 from "auth0-js";
const config = window.config;

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: config.auth0.domain,
        clientID: config.auth0.clientID,
        redirectUri: config.auth0.callbackURL,
        responseType: "token id_token",
        scope: "openid profile"
    });
}
