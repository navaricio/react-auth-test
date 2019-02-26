import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import querystring from "querystring";
import ReactJson from "react-json-view";
import ReactRouterPropTypes from "react-router-prop-types/";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { sessionOperations } from "../../modules/session";

const FIRST_INDEX = 1;

class Callback extends Component {
    componentDidMount() {
        const { location } = this.props;
        let data = {};
        if (location && location.hash) {
            data = querystring.parse(location.hash.split("#")[FIRST_INDEX]);
        }
        if (data.error) {
            return this.props.onAuthError(data);
        }

        return this.props.onAuthSuccess(data);
    }

    renderError = () => {
        if (this.props.error) {
            return (
                <Row>
                    <Alert variant="danger">{this.props.error.error_description}</Alert>
                </Row>
            );
        }
    };

    render() {
        return (
            <Container>
                {this.renderError()}
                <Row>
                    <h1>API ID Token Response</h1>
                    <ReactJson src={this.props.data} />
                </Row>
                <Row>
                    <h1>Decoded Token</h1>
                    <ReactJson src={this.props.decoded_token} />
                </Row>
            </Container>
        );
    }
}

Callback.propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    onAuthError: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { error, data } = state.session.auth;
    const decoded_token = jwtDecode(data.id_token);
    return { error, data, decoded_token };
};

const mapDispatchToProps = {
    onAuthError: sessionOperations.authenticateUserError,
    onAuthSuccess: sessionOperations.authenticateUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Callback);
