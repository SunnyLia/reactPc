import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Home from '../pages/home/index';
import Editors from '../pages/operate/editor';
import User from '../pages/list/user';
import Uploader from '../pages/operate/uploader';
import Intercept from './redirect';
import Gantt from '../pages/gantt';
import Interview from '../pages/interview/index';
import Front from '../pages/interview/front';
import End from '../pages/interview/end';
import DragTable from '../pages/list/dragTable';

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Intercept exact path="/" component={Home} />
                <Intercept path="/home" component={Home} />
                <Intercept path="/deal/editor" component={Editors} />
                <Intercept path="/cont/user" component={User} />
                <Intercept path="/deal/uploader" component={Uploader} />
                <Intercept path="/gannt" component={Gantt} />
                <Intercept path="/interview" component={Interview} />
                <Intercept path="/cont/dragTable" component={DragTable} />
                {/* <Intercept path="/interview/front" component={Front} /> */}
                {/* <Intercept path="/interview/end" component={End} /> */}
                <Redirect to="/" />
            </Switch>
        );
    }
}
export default Main;