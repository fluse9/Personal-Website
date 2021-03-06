import React from 'react';
import "./Feedback.css"
import 'bootstrap/dist/js/bootstrap.bundle';
import DashboardNavbars from "../../Pages/MyAccount/DashboardNavbars.js"
import Slider from "../../Pages/Slider/Slider.js"
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

class Feedback extends React.Component {
    state = {
        harvest_list: [],
        current_harvest: [],
        reload: false
    }

    constructor(props) {
        super(props);
        this.weightElement = React.createRef();
        this.commentsElement = React.createRef();
        this.tasteElement = React.createRef();
        this.textureElement = React.createRef();
        this.appearanceElement = React.createRef();
    }

    componentDidMount() {
        this.fetchHarvests();
    }

    fetchHarvests() {
        const harvests = ([
            {_id: "mZjMK", weight: 2, plant_id: "Genovese Basil", act_harvest_timestamp: "1608603622359"},
            {_id: "kryIZ", weight: 2, plant_id: "Cherry Tomatoes", act_harvest_timestamp: "1608678384120"},
            {_id: "7tQof", weight: 2, plant_id: "Romaine Lettuce", act_harvest_timestamp: "1608679521805"}
        ]);

        this.state.harvest_list = harvests;
        this.setState({
            harvest_list: harvests
        });
    }

    loadHarvests = () => {
        const elements = [];
        var i;
        for (i = 0; i < this.state.harvest_list.length; i++) {
            if (this.state.current_harvest) {
                const id = i;
                const date_list = (new Date(this.state.harvest_list[i].act_harvest_timestamp / 1)).toDateString().split(' ');
                const label = date_list[1] + " " + date_list[2] + ": " + this.state.harvest_list[i].plant_id;
                if (this.state.current_harvest._id === this.state.harvest_list[i]._id) {
                    elements[i] = <li class="dropdown-item" type="terrafarm" style={{ background: "transparent" }}><a id="current_harvest" onClick={() => this.setHarvest(id)} href="javascript:;">{label} <i id="check" class="fa fa-check icon" style={{ float: "right", color: "gray" }}></i></a></li>;
                }
                else {
                    elements[i] = <li class="dropdown-item" type="terrafarm" style={{ background: "transparent" }}><a onClick={() => this.setHarvest(id)} href="javascript:;">{label}</a></li>;
                }
            }
        }
        return elements;
    }

    setHarvest = (id) => {
        this.state.current_harvest = [this.state.harvest_list[id]];
        this.setState({
            current_harvest: this.state.harvest_list[id]
        })
        this.fetchHarvests();
    }

    submitHandler = () => {

    }

    render() {
        $(document).ready(function () {
            $("#current_harvest").on("mouseenter", function () {
                $("#check").css("color", "#DE5E3B");
            });
            $("#current_harvest").on("mouseleave", function () {
                $("#check").css("color", "gray");
            });
        });
        return (
            <html>
                <head>
                    <script type="text/javascript" src="//code.jquery.com/jquery-3.5.1.js"></script>
                    <script src="jquery.min.js"></script>
                    <script src="rangeslider.min.js"></script>
                </head>
                <body class="feedback-body">
                    <div class="grid-container">
                        <DashboardNavbars />
                        <main class="main" type="feedback">
                            <div class="main-cards" type="feedback">
                                <div class="card" type="feedback">
                                    <h1>LET US<br />KNOW<br />WHAT<br />YOU<br />THINK!</h1>
                                    <h2>Every bit of feedback helps our team improve the
                                        <br />products and services we provide to you. Let
                                        <br />us know how your Terrafarm experience has been
                                        <br />by submitting your feedback in the provided form.</h2>
                                </div>
                                <div class="card" type="feedback">
                                    <h6 class="feedback-header">Let us know what you think!</h6>
                                    <span>
                                        <a class="drop-button" type="terrafarm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            SELECT HARVEST
                                            <i class="fa fa-caret-down fa-1x" style={{ color: "#787878", marginLeft: "20px" }}>
                                            </i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right" type="feedback" aria-labelledby="dropdownMenuLink">
                                            {this.loadHarvests()}
                                        </div>
                                    </span>
                                    <h3 style={{ marginTop: "80px" }}>TASTE</h3>
                                    <Slider ref={this.tasteElement}/>
                                    <h3>TEXTURE</h3>
                                    <Slider ref={this.textureElement}/>
                                    <h3>APPEARANCE</h3>
                                    <Slider ref={this.appearanceElement}/>
                                    <textarea class="feedback-input" type="comments" placeholder="Provide any additional comments here..." ref={this.commentsElement}></textarea>
                                    <button class="button" type="green" onClick={ () => {this.submitHandler()} }>SUBMIT</button>
                                </div>
                            </div>
                        </main>
                    </div>
                </body>
            </html>
        );
    }
}

export default Feedback;