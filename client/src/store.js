import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./modules";

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [ thunk, routerMiddleware(history) ];

const initialState = {};
const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer(history), initialState, composedEnhancers);

if (module.hot) {
    module.hot.accept("./modules", () => {
        store.replaceReducer(rootReducer(history));
    });
}

export default store;
