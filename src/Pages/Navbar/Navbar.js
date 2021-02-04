import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Jumbotron } from 'react-bootstrap';
import "./Navbar.css";
import resume from "../../Assets/docs/resume.pdf";
import { Link, Scroll } from 'react-scroll';
import Modal from 'react-modal';
import LinkedIn from "../../Assets/logos/LinkedIn White.svg";
import GitHub from "../../Assets/logos/GitHub White.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class PersonalNavbar extends React.Component {
    state = {

    }

    constructor(props) {
        super(props)
    }

    onResumeClick = () => {
        window.open(resume);
    }

    showModal = () => {
        this.setState({
            show_modal: true
        });
    }

    hideModal = () => {
        this.setState({
            show_modal: false
        });
    }

    render () {
        return (
            <Navbar class="nav">
                <div class="brand-container">
                    <a class="menu" onClick={() => {this.showModal()}} type="nav" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faBars} size="lg" style={{ color: "white", marginLeft: "20px", marginTop: "15px", float: "left", cursor: "pointer" }}></FontAwesomeIcon>
                    </a>
                    <Modal
                        className="modal-backdrop"
                        isOpen={this.state.show_modal}
                        onClose={() => {this.hideModal()}}
                        transparent={true}
                        animationType={"slide"}
                    >
                        <div class="modal-main">
                            <i class="fa fa-times fa-lg" style={{ float: "right", marginRight: "-5vw", marginTop: "20px", color: "#232323", cursor: "pointer" }} onClick={() => {this.hideModal()}}></i>
                            <ul class="modal-list">
                                <li class="modal-item">
                                    <Link activeClass="active" to="about" spy={true} smooth={true} offset={-70} duration={1000} onClick={() => this.hideModal()}>
                                        ABOUT ME
                                    </Link>
                                </li>
                                <li class="modal-item">
                                    <Link activeClass="active" to="experience" spy={true} smooth={true} offset={-70} duration={1000} onClick={() => this.hideModal()}>
                                        EXPERIENCE
                                    </Link>
                                </li>
                                <li class="modal-item">
                                    <Link activeClass="active" to="portfolio" spy={true} smooth={true} offset={-70} duration={1000} onClick={() => this.hideModal()}>
                                        PORTFOLIO
                                    </Link>
                                </li>
                                <li class="modal-item">
                                    <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-70} duration={1000} onClick={() => this.hideModal()}>
                                        PROJECTS
                                    </Link>
                                </li>
                                <li class="modal-item">
                                    <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={1000} onClick={() => this.hideModal()}>
                                        CONTACT
                                    </Link>
                                </li>
                                <li class="modal-item">
                                    <a onClick={this.onResumeClick}>
                                        RESUME
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Modal>
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