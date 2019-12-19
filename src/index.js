import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';
import Intercept from './router/redirect';
import Index from './pages';
import Login from './pages/login';
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Intercept path="/login" component={Login} />
                <Route component={Index} />
            </Switch>
        </HashRouter>
    </Provider >,
    document.getElementById('root')
);
// serviceWorker.unregister();
