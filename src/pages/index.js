import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/home" component={Home}></Route>
                <Redirect to="/" />
            </Switch>
        );
    }
}
export default Main;