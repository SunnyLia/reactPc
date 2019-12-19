import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
class Intercept extends Component {
    render() {
        let { path, component } = this.props;
        let auth = sessionStorage.getItem('user');
        if (auth) { //登陆了
            if (path === "/login") {
                return <Redirect to="/" />
            } else {
                return <Route path={path} component={component} />;
            }
        } else { //没登陆
            if (path === "/login") {
                return <Route path={path} component={component} />;
            } else {
                return <Redirect to={{ pathname: '/login', state: { from: path } }} />
            }
        }
    }
}
export default Intercept