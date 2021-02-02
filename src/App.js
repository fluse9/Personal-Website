import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar, Nav, Jumbotron } from 'react-bootstrap';
import Scroll from 'react-scroll';
import HomePage from './Pages/HomePage/Home.js';
import PersonalNavbar from './Pages/Navbar/Navbar.js';


function App() {
    return (
        <Router>
            <React.Fragment>
                <PersonalNavbar />
                <header className="App-header">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                    </Switch>
                </header>
            </React.Fragment>
        </Router>
    );
}

export default App;
