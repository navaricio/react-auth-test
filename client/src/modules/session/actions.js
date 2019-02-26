import { default as types } from "./types";

const onClickAuthWithProvider = (provider, url, nonce) => {
    return { type: types.CLICK_AUTHENTICATE_WITH_PROVIDER, payload: { provider, url, nonce } };
};

const authenticateUser = session => {
    return { type: types.AUTHENTICATE_USER, payload: session };
};

const authenticateUserError = err => {
    return { type: types.AUTHENTICATE_ERROR, payload: err };
};

const unauthenticateUser = () => {
    return { type: types.UNAUTHENTICATE_USER, payload: {} };
};

export default { onClickAuthWithProvider, authenticateUserError, authenticateUser, unauthenticateUser };
