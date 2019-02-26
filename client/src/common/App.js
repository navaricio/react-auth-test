import React from "react";
import store, { history, persistor } from "../store";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import Container from "react-bootstrap/Container";
import Login from "../screens/session/Login";
import AuthHOC from "./session/AuthHOC";
import Dashboard from "../screens/dashboard/Dashboard";
import Callback from "./session/Callback";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={AuthHOC(Dashboard)} />
                            <Route path="/login" component={Login} />
                            <Route path="/auth/callback" component={Callback} />
                        </Switch>
                    </Container>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
