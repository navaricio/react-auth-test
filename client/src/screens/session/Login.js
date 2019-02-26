import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import AuthButton from "../../common/elements/AuthButton";
import Auth, { GOOGLE, NAVARIK_WAAD, LINKEDIN } from "../../lib/Auth";
import { sessionOperations } from "../../modules/session";
import uuid from "uuid/v4";

const AVAILABLE_PROVIDERS = [
    { provider: GOOGLE, text: "Login with Google" },
    { provider: NAVARIK_WAAD, text: "Login with Microsoft " },
    { provider: LINKEDIN, text: "Login with Linkedin" }
];
class Login extends Component {
    authUser = (provider, link, nonce) => {
        this.props.onClickAuthWithProvider(provider, link, nonce);
    };

    render() {
        const authButtons = AVAILABLE_PROVIDERS.map((pr, i) => {
            const nonce = uuid();
            const link = new Auth().getAuthUrl({
                provider: pr.provider,
                nonce
            });

            return (
                <Row className="mt-2" key={i}>
                    {AuthButton({
                        onClick: () => this.authUser(pr.provider, link, nonce),
                        provider: pr.provider,
                        buttonText: pr.text,
                        link
                    })}
                </Row>
            );
        });
        return <React.Fragment>{authButtons}</React.Fragment>;
    }
}

const mapDispatchToProps = {
    onClickAuthWithProvider: sessionOperations.onClickAuthWithProvider
};

export default connect(
    null,
    mapDispatchToProps
)(Login);

Login.propTypes = {
    onClickAuthWithProvider: PropTypes.func.isRequired
};
