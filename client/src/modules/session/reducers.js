import { combineReducers } from "redux";
import types from "./types";

const INITIAL_STATE = { error: null, data: null };

const auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return { ...state, data: action.payload, error: null };
        case types.AUTHENTICATE_ERROR:
            return { ...state, error: action.payload };
        case types.UNAUTHENTICATE_USER:
            return {};
        default:
            return state;
    }
};
const reducer = combineReducers({
    auth
});

export default reducer;
