import { default as actions } from "./actions";

const authenticateUser = session => dispatch => {
    try {
        dispatch(actions.authenticateUser(session));
    } catch (err) {
        dispatch(actions.authenticateUserError(err));
    }
};

const onClickAuthWithProvider = (provider, url, nonce) => dispatch => {
    dispatch(actions.onClickAuthWithProvider(provider, url, nonce));
};

const authenticateUserError = err => dispatch => {
    dispatch(actions.authenticateUserError(err));
};

const unauthenticateUser = () => dispatch => {
    dispatch(actions.unauthenticateUser());
};

export default { authenticateUser, onClickAuthWithProvider, authenticateUserError, unauthenticateUser };
