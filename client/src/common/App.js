import React from "react";
import store, { history } from "../store";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import Login from "../screens/session/Login";
import "./App.css";

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <Switch>
                        <Route exact path="/" component={Login} />
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
