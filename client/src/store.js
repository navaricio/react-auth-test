import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./modules";

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [ thunk, routerMiddleware(history) ];

const initialState = { session: {}, router: {} };
const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);

/**
 * Persistance configuration with redux-persist
 */
const persistConfig = {
    key: "root",
    version: 0,
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

/**
 * create store with persistor
 */
const store = createStore(persistedReducer, initialState, composedEnhancers);

if (module.hot) {
    module.hot.accept("./modules", () => {
        store.replaceReducer(rootReducer(history));
    });
}
export const persistor = persistStore(store);
export default store;
