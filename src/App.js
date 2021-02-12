import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar, Nav, Jumbotron } from 'react-bootstrap';
import Scroll from 'react-scroll';
import HomePage from './Pages/HomePage/Home.js';
import PersonalNavbar from './Pages/Navbar/Navbar.js';
import Dashboard from './Pages/MyAccount/Dashboard.js';
import Status from './Pages/MyAccount/Status.js';
import Feedback from './Pages/MyAccount/Feedback.js';
import Notifications from './Pages/MyAccount/Notifications.js';
import MyProfile from './Pages/MyAccount/MyProfile.js';

function App() {
    return (
        <Router>
            <React.Fragment>
                <header className="App-header">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/dashboard/status" exact component={Status} />
                        <Route path="/dashboard/feedback" exact component={Feedback} />
                        <Route path="/dashboard/notifications" exact component={Notifications} />
                        <Route path="/dashboard/myprofile" exact component={MyProfile} />
                    </Switch>
                </header>
            </React.Fragment>
        </Router>
    );
}

export default App;
