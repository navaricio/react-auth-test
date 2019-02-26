import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types/";

import { sessionSelectors } from "../../modules/session";

/**
 * in order to use this:
 * import Authentication -> my HOC
 * import Resources -> component I want to wrap
 * const ComposedCompoent = Authentication(Resources)
 * in seom render method -> <ComposedComponent something={something}/>
 *
 */

export default ComposedComponent => {
    class Authentication extends Component {
        componentDidMount() {
            if (!this.props.authenticated) {
                this.props.history.push("/login");
            }
        }

        componentDidUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push("/login");
            }
        }

        render() {
            return <div>{this.props.authenticated === true ? <Component {...this.props} /> : null}</div>;
        }
    }

    Authentication.propTypes = {
        authenticated: PropTypes.bool.isRequired,
        history: ReactRouterPropTypes.history.isRequired
    };

    const mapStateToProps = state => {
        const authenticated = sessionSelectors.isUserAuthenticated(state.session.auth);
        return { authenticated };
    };

    return connect(mapStateToProps)(Authentication);
};
