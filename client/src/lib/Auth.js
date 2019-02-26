import auth0 from "auth0-js";
import assert from "assert";
import querystring from "querystring";
const config = window.config;

export const LINKEDIN = "linkedin";
export const GOOGLE = "google-oauth2";
export const NAVARIK_WAAD = "NAVARIK-waad";

export default class Auth {
    constructor(options = { scope: "", responseType: "" }) {
        const { domain, clientID, callbackURL } = config.auth;
        const scope = options.scope ? options.scope.split(" ") : "";
        const responseType = options.responseType ? options.responseType.split(" ") : "";
        this.scope = [
            ...new Set([ "openid", "offline_access", "profile", "email", "roles", "permissions", "groups", ...scope ])
        ].join(" ");
        this.responseType = [ ...new Set([ "id_token", "token", ...responseType ]) ].join(" ");
        this.domain = domain;
        this.callbackURL = callbackURL;
        this.clientID = clientID;
    }

    getWebClient() {
        return new auth0.WebAuth({
            domain: this.domain,
            clientID: this.clientID,
            responseType: this.responseType
        });
    }

    getAuthUrl({ provider, showPrompt = true, nonce }) {
        assert.ok(nonce, "Nonce is required");
        return `https://${this.domain}/authorize?${querystring.stringify({
            connection: provider,
            client_id: this.clientID,
            redirect_uri: this.callbackURL,
            response_type: this.responseType,
            scope: this.scope,
            audience: "https://dev-ticithub.auth0.com/api/v2/",
            prompt: showPrompt ? "consent" : "none",
            nonce
        })}`;
    }
}
