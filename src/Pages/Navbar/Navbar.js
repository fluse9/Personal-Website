import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Jumbotron } from 'react-bootstrap';
import "./Navbar.css";
import resume from "../../Assets/docs/resume.pdf";
import { Link, Scroll } from 'react-scroll';
import LinkedIn from "../../Assets/logos/LinkedIn White.svg";
import GitHub from "../../Assets/logos/GitHub White.svg";

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
                            <Link activeClass="active" to="about" spy={true} smooth={true} offset={-70} duration={1000}>
                                ABOUT ME
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link activeClass="active" to="experience" spy={true} smooth={true} offset={-70} duration={1000}>
                                EXPERIENCE
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link activeClass="active" to="portfolio" spy={true} smooth={true} offset={-70} duration={1000}>
                                PORTFOLIO
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-70} duration={1000}>
                                PROJECTS
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={1000}>
                                CONTACT
                            </Link>
                        </li>
                        <li class="nav-item">
                            <a onClick={this.onResumeClick}>
                                RESUME
                            </a>
                        </li>
                    </ul>
                    <div class="social-container">
                        <li class="social-item">
                            <a href="https://www.linkedin.com/in/frank-luse-a05998151/" style={{ textDecoration: "none" }}>
                                <img src={LinkedIn} style={{ width: "20px", marginRight: "20px", float: "left", cursor: "pointer" }}></img>
                            </a>
                        </li>
                        <li class="social-item">
                            <a href="https://github.com/fluse9" style={{ textDecoration: "none" }}>
                                <img src={GitHub} style={{ width: "20px", marginRight: "20px", float: "left", cursor: "pointer" }}></img>
                            </a>
                        </li>
                    </div>
                </div>
            </Navbar>
        );
    }
}

export default PersonalNavbar;