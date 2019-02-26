import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import querystring from "querystring";
import ReactJson from "react-json-view";
import ReactRouterPropTypes from "react-router-prop-types/";
import PropTypes from "prop-types";
import { sessionOperations } from "../../modules/session";

const FIRST_INDEX = 1;

class Callback extends Component {
    state = { data: {} };

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
                <Row>
                    <ReactJson src={this.props.data} />
                </Row>
                {this.renderError()}
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
    return { error, data };
};

const mapDispatchToProps = {
    onAuthError: sessionOperations.authenticateUserError,
    onAuthSuccess: sessionOperations.authenticateUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Callback);
