import React from 'react';
import { Navbar, Nav, Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import "./Home.css";
import $ from 'jquery';
import emailjs from 'emailjs-com';
import profile from "../../Assets/images/profile.jpg";
import website from "../../Assets/images/website.png";
import web_app from "../../Assets/images/web app.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import GitHub from "../../Assets/logos/GitHub.svg";
import LinkedIn from "../../Assets/logos/LinkedIn.svg";
import { Link, Scroll } from 'react-scroll';

class Home extends React.Component {
    state = {
        workplace: 'Terrafarm',
        value: 0,
        terrafarm: '#EFF3FE',
        terrafarm_text: "#022140",
        ku: 'white',
        ku_text: "#6B6B6B"
    }

    constructor(props) {
        super(props);
        this.nameElement = React.createRef();
        this.emailElement = React.createRef();
        this.messageElement = React.createRef();
    }

    sendEmail = (event) => {
        event.preventDefault();

        var templateParams = {
            name: this.nameElement.current.value,
            email: this.emailElement.current.value,
            message: this.messageElement.current.value
        }

        emailjs.send('service_hzh98vr', 'template_amg52h3', templateParams, 'user_Y6SaVLeH8vY7OmLbE4wf8')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    setWorkplace = (workplace) => {
        this.setState({
            workplace: workplace
        });

        if (workplace === 'Terrafarm') {
            this.setState({
               value: 0,
               terrafarm: '#EFF3FE',
               terrafarm_text: "#022140",
               ku: 'white',
               ku_text: "#6B6B6B"
            });
        }

        if (workplace === 'KU') {
            this.setState({
               value: 100,
               terrafarm: 'white',
               terrafarm_text: "#6B6B6B",
               ku: '#EFF3FE',
               ku_text: "#022140"
            });
        }
    }

    loadExperience = (workplace) => {
        if (workplace === "Terrafarm") {
            var card = (
                <div class="card" type="experience">
                    <h1 class="text5">Co-Founder & Chief Executive Officer <text style={{ color: "#188F88" }}>@ Terrafarm</text></h1>
                    <h2 class="text6">October 2019 - Present</h2>
                    <ul style={{ marginTop: "0px" }}>
                        <li class="text7">Led 4 engineering teams and 1 design team from development to launch</li>
                        <li class="text7">Developed an in-home vertical farm OS using C++ and Python that controls farm actuators and accesses database systems in real time</li>
                        <li class="text7">Created a user-web application in React.js, Node.js, and GraphQL that allows customers to record what they plant and harvest and control certain actuators</li>
                        <li class="text7">Constructed real time data pipelines to store thousands of customer and farm data points every day using AWS hosted PostgreSQL and MongoDB instances</li>
                    </ul>
               </div>
            );
        }

        if (workplace === "KU") {
            var card = (
                <div class="card" type="experience">
                    <h1 class="text5">Math Tutor - Applied Statistics <text style={{ color: "#188F88" }}>@ The University of Kansas</text></h1>
                    <h2 class="text6">January 2019 - May 2020</h2>
                    <ul style={{ marginTop: "0px" }}>
                        <li class="text7">Tutored small groups of up to 5 students in elementary and applied statistics</li>
                        <li class="text7">Guided students through course material, created practice problems, helped students improve their skills in probability, statistical analysis, and regression</li>
                    </ul>
               </div>
            );
        }

        return card;
    }

    render () {
        return (
            <React.Fragment>
                <Jumbotron className="landing">
                    <div class="container1">
                        <h1 class="text1">FRANK LUSE</h1>
                        <h2 class="text2">
                            Software and data engineer with 2 years of experience
                            <br></br>
                            as the lead developer at a fast-paced startup
                            </h2>
                    </div>
                    <Link activeClass="active" to="about" spy={true} smooth={true} offset={-70} duration={1000}>
                        <button class="clear">
                            <a class="learn-more">Learn More</a>
                        </button>
                    </Link>
                </Jumbotron>
                <Jumbotron className="about">
                    <div class="main-cards1">
                        <div class="card" type="about">
                            <h1 class="text3" id="about">
                                About
                            </h1>
                            <h2 class="text4">
                                I'm Frank, a young software engineer and entrepreneur based in Lawrence, KS. I am actively looking for software engineering and data analytics positions and am open to relocation.
                                <br></br>
                                <br></br>
                                I love creating websites, applications, and real-time embedded systems that live on the internet.
                                My mission is to design the best possible experience down to every pixel and user interaction.
                                <br></br>
                                <br></br>
                                During my time at the University of Kansas, I co-founded Terrafarm, a startup specializing in fully autonomous microfarms for homes and restaurants.
                                As Terrafarm's lead software engineer I oversaw product development resulting in getting our web application and indoor farm to market.
                                <br></br>
                                <br></br>
                                Here are some of the technologies I use:
                                <ul style={{ columnCount: "2", columnGap: "0px", height: "75px" }}>
                                    <li>JavaScript</li>
                                    <li>React</li>
                                    <li>Node.js</li>
                                    <li>HTML & CSS</li>
                                    <li>Python</li>
                                    <li>Git</li>
                                </ul>
                            </h2>
                        </div>
                        <div class="card" type="about">
                            <h1 class="text3"></h1>
                        </div>
                        <div class="card">
                            <div class="border">
                                <div class="overlay" type="profile"><img src={profile} alt="profile" class="profile"/></div>
                            </div>
                        </div>
                        <div class="card">
                            <h1 class="text3"></h1>
                        </div>
                    </div>
                    <div class="main-cards2">
                        <div class="card" type="experience">
                            <h1 class="text3" style={{ marginBottom: "30px" }} id="experience">
                                Experience
                            </h1>
                            <div class="slider-container">
                                <span class="bar"><span class="fill"></span></span>
                                <input type="range" min={0} max={100} value={this.state.value} class="slider" />
                            </div>
                            <div class="workplaces">
                                <ul style={{ marginTop: "20px" }}>
                                    <button class="workplace" id="Terrafarm" style={{ background: this.state.terrafarm, color: this.state.terrafarm_text }} onClick={() => this.setWorkplace('Terrafarm')}>Terrafarm</button>
                                    <button class="workplace" id="KU" style={{ background: this.state.ku, color: this.state.ku_text }} onClick={() => this.setWorkplace('KU')}>KU</button>
                                </ul>
                            </div>
                       </div>
                       {this.loadExperience(this.state.workplace)}
                    </div>
                    <div class="main-cards3">
                        <div class="card" type="portfolio">
                            <h1 class="text3" id="portfolio">
                                Portfolio
                            </h1>
                        </div>
                        <div class="card" type="portfolio">
                            <div class="overlay" type="left"><img src={web_app} alt="web_app" class="feature"></img></div>
                            <h1 class="text8" type="right">
                                Featured Work
                            </h1>
                            <h2 class="text9" type="right">
                                Terrafarm Web App
                            </h2>
                            <div class="textbox" type="right">
                                <h1 class="text10" type="right">
                                A web application that allows customers to monitor and manage their Terrafarm.
                                Users select crops to plant and harvest, the farm's climate and nutrient solution, control LED brightness, and leave valuable feedback on each harvest.
                                </h1>
                            </div>
                            <h2 class="text11" style={{ marginTop: "245px", textAlign: "right" }}>
                                React &emsp; Node.js &emsp; GraphQL &emsp; PostgreSQL
                            </h2>
                            <FontAwesomeIcon icon={faExternalLinkAlt} style={{ color: "#022140", marginTop: "15px", float: "right", cursor: "pointer" }}></FontAwesomeIcon>
                        </div>
                        <div class="card" type="portfolio">
                            <div class="overlay" type="right"><img src={website} alt="website" class="feature"></img></div>
                            <h1 class="text8" type="left">
                                Featured Work
                            </h1>
                            <h2 class="text9" type="left">
                                Terrafarm Website
                            </h2>
                            <div class="textbox" type="left">
                                <h1 class="text10" type="left">
                                Terrafarm's eCommerce website which contains information about the company and its products.
                                Customers can order the Terrafarm 1 and any supplies they need to grow fresh fruits and vegetables, such as nutrients and seed pods.
                                </h1>
                            </div>
                            <h3 class="text11" style={{ marginTop: "245px", textAlign: "left" }}>
                                React &emsp; JavaScript &emsp; HTML & CSS
                            </h3>
                            <a href="https://terrafarm.us" style={{ textDecoration: "none" }}>
                                <FontAwesomeIcon icon={faExternalLinkAlt} style={{ color: "#022140", marginTop: "15px", float: "left", cursor: "pointer" }}></FontAwesomeIcon>
                            </a>
                        </div>
                    </div>
                    <h1 class="text3" style={{ textAlign: "center" }} id="projects">
                        Other Projects
                    </h1>
                    <div class="main-cards4">
                        <div class="card" type="projects">
                            <div class="project-main">
                                <a href="https://github.com/fluse9/Personal-Website" style={{ textDecoration: "none" }}>
                                    <FontAwesomeIcon icon={faExternalLinkAlt} style={{ color: "#EFF3FE", marginTop: "20px", marginRight: "20px", float: "right", cursor: "pointer" }}></FontAwesomeIcon>
                                </a>
                                <h1 class="text12">
                                    Personal Website
                                </h1>
                                <h2 class="text13">
                                    First iteration of my portfolio website built with React. I learned a lot about CSS styling, animations, and dynamic layouts.
                                </h2>
                            </div>
                            <h3 class="text14">
                                React &emsp; JS &emsp; HTML &emsp; CSS
                            </h3>
                        </div>
                        <div class="card" type="projects">
                            <div class="project-main">
                                <a href="https://github.com/fluse9/Investment-Bot" style={{ textDecoration: "none" }}>
                                    <FontAwesomeIcon icon={faExternalLinkAlt} style={{ color: "#EFF3FE", marginTop: "20px", marginRight: "20px", float: "right", cursor: "pointer" }}></FontAwesomeIcon>
                                </a>
                                <h1 class="text12">
                                    Investment Bot
                                </h1>
                                <h2 class="text13">
                                    Stock analytics tool that scrapes financial statements and analyzes signal data identify investment opportunities. Uses value, divergence, and triple momentum strategies to trade on Alpaca and Robinhood APIs.
                                </h2>
                            </div>
                            <h3 class="text14">
                                Python &emsp; Pandas &emsp; Numpy
                            </h3>
                        </div>
                        <div class="card" type="projects">
                            <div class="project-main">
                                <a href="https://github.com/fluse9/JARVIS" style={{ textDecoration: "none" }}>
                                    <FontAwesomeIcon icon={faExternalLinkAlt} style={{ color: "#EFF3FE", marginTop: "20px", marginRight: "20px", float: "right", cursor: "pointer" }}></FontAwesomeIcon>
                                </a>
                                <h1 class="text12">
                                    JARVIS
                                </h1>
                                <h2 class="text13">
                                    Personal assistant that uses Natural Language Toolkit and speech recognition to give the current time and weather, search wikipedia, etc. Messaging and calendar functionality coming soon.
                                </h2>
                            </div>
                            <h3 class="text14">
                                Python &emsp; NLTK
                            </h3>
                        </div>
                        <div class="card" type="projects">
                            <div class="project-main">
                                <a href="https://github.com/fluse9/Stimulus-Analysis-2020" style={{ textDecoration: "none" }}>
                                    <FontAwesomeIcon icon={faExternalLinkAlt} style={{ color: "#EFF3FE", marginTop: "20px", marginRight: "20px", float: "right", cursor: "pointer" }}></FontAwesomeIcon>
                                </a>
                                <h1 class="text12">
                                    OECD Stimulus Analysis
                                </h1>
                                <h2 class="text13">
                                    OLS linear regression analysis of stimulus packages across the OECD in 2020. Identified key policies responsible for varying economic performance.
                                </h2>
                            </div>
                            <h3 class="text14">
                                Stata &emsp; Excel
                            </h3>
                        </div>
                        <div class="card" type="projects">
                            <div class="project-main">
                                <a href="https://github.com/fluse9/Autofarm-OS" style={{ textDecoration: "none" }}>
                                    <FontAwesomeIcon icon={faExternalLinkAlt} style={{ color: "#EFF3FE", marginTop: "20px", marginRight: "20px", float: "right", cursor: "pointer" }}></FontAwesomeIcon>
                                </a>
                                <h1 class="text12">
                                    Hydroponics Controller
                                </h1>
                                <h2 class="text13">
                                    Real-time embedded system running on an Arduino Uno that controls pumps, LEDs, and sensors in a DIY hydroponics system.
                                </h2>
                            </div>
                            <h3 class="text14">
                                C++ &emsp; Python &emsp; PostgreSQL
                            </h3>
                        </div>
                    </div>
                    <div class="main-cards5">
                        <div class="card">
                            <h1 class="text3"  style={{ textAlign: "center" }} id="contact">
                                Get In Touch
                            </h1>
                            <div class="contact-info">
                                <h1 class="text12">
                                    Contact Information
                                </h1>
                                <h2 class="text13">
                                    <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ color: "#EFF3FE", marginRight: "20px", paddingTop: "2px", float: "left", cursor: "pointer" }}></FontAwesomeIcon>
                                    fluse9@gmail.com
                                </h2>
                                <a href="https://github.com/fluse9" style={{ textDecoration: "none" }}>
                                    <h2 class="text13">
                                        <img src={GitHub} style={{ width: "20px", marginRight: "20px", float: "left", cursor: "pointer" }}></img>
                                        GitHub
                                    </h2>
                                </a>
                                <a href="https://www.linkedin.com/in/frank-luse-a05998151/" style={{ textDecoration: "none" }}>
                                    <h2 class="text13">
                                        <img src={LinkedIn} style={{ width: "20px", marginRight: "20px", float: "left", cursor: "pointer" }}></img>
                                        LinkedIn
                                    </h2>
                                </a>
                            </div>
                            <form class="contact-form" id="contact-form" onSubmit={this.sendEmail}>
                                <input type="hidden" name="contact_number"/>
                                <input class="contact" type="text" name="name" ref={this.nameElement} placeholder="Your name"/>
                                <input class="contact" type="email" name="email" ref={this.emailElement} placeholder="Your email"/>
                                <textarea class="message" name="message" ref={this.messageElement} placeholder="Please type your message here..."></textarea>
                                <input class="send" type="submit" value="Send"/>
                            </form>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Home;