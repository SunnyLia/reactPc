import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/home';
import Editor from '../pages/editor';
import User from '../pages/user';
import Intercept from './redirect';

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Intercept exact path="/" component={Home} />
                <Intercept path="/home" component={Home} />
                <Intercept path="/editor" component={Editor} />
                <Intercept path="/user" component={User} />
                <Redirect to="/" />
            </Switch>
        );
    }
}
export default Main;