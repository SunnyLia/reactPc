import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';

import Home from './pages';
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                {/* <Route path="/login" component={Login} /> */}
                <Route component={Home} />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
// serviceWorker.unregister();
