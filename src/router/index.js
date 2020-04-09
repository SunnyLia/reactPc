import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Home from '../pages/home';
import Editors from '../pages/editor';
import User from '../pages/user';
import Uploader from '../pages/uploader';
import Intercept from './redirect';

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Intercept exact path="/" component={Home} />
                <Intercept path="/home" component={Home} />
                <Intercept path="/cont/deal/editor" component={Editors} />
                <Intercept path="/cont/user" component={User} />
                <Intercept path="/cont/deal/uploader" component={Uploader} />
                <Redirect to="/" />
            </Switch>
        );
    }
}
export default Main;