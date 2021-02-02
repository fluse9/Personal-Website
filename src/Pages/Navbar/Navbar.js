import React from 'react';
import {Link, NavLink} from "react-router-dom";
import { Navbar, Nav, Jumbotron } from 'react-bootstrap';
import "./Navbar.css";
import resume from "../../Assets/docs/resume.pdf";

class PersonalNavbar extends React.Component {
    state = {

    }

    constructor(props) {
        super(props)
    }

    onResumeClick = () => {
        window.open(resume);
    }

    render () {
        return (
            <Navbar class="nav">
                <div class="brand-container">
                    <ul class="brand">
                        <Link style={{ textDecoration: "none" }}to="/">
                            <h1 class="header1">FRANK LUSE</h1>
                        </Link>
                    </ul>
                </div>
                <div class="nav-item-container">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <NavLink exact to="/">
                                ABOUT ME
                            </NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink exact to="/">
                                EXPERIENCE
                            </NavLink>
                        </li>
                        <li class="nav-item">
                            <a onClick={this.onResumeClick}>
                                RESUME
                            </a>
                        </li>
                        <li class="nav-item">
                            <NavLink exact to="/">
                                CONTACT
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div class="nav-menu-container">
                    <ul class="nav-menu">
                        <li class="nav-item">

                        </li>
                    </ul>
                </div>
            </Navbar>
        );
    }
}

export default PersonalNavbar;