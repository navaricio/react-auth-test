import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import sessionReducer from "./session";

export default history => {
    return combineReducers({
        router: connectRouter(history),
        session: sessionReducer
    });
};
