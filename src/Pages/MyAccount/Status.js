import React from 'react';
import "./Status.css"
import 'bootstrap/dist/js/bootstrap.bundle';
import DashboardNavbars from "../../Pages/MyAccount/DashboardNavbars.js"
import Tray from "../../Pages/Trays/Tray.js"
import SliderAlt from "../../Pages/Slider/SliderAlt.js";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

class Status extends React.Component {
    state = {
        terrafarm_list: [],
        current_terrafarm: 0,
        tray_list: [],
        current_tray: 0,
        tray_data: {},
        climate_id: "",
        nutrient_id: "",
        climate_list: [],
        nutrient_list: [],
        low_light_mode: false,
        led_brightness: 0
    }

    constructor(props) {
        super(props);
        this.lowLightModeElement = React.createRef();
        this.ledBrightnessElement = React.createRef();
    }

    componentDidMount() {
        this.fetchTerrafarms();
        this.fetchClimates();
        this.fetchNutrients();
    }

    selectTerrafarm(terrafarm, index) {
        this.setState({
            current_terrafarm: index,
            _id: terrafarm._id,
            climate_id: terrafarm.climate_id,
            nutrient_id: terrafarm.nutrient_id,
            led_brightness: terrafarm.led_brightness,
            low_light_mode: terrafarm.low_light_mode
        });
        this.state.current_terrafarm = index;
        this.state._id = terrafarm._id;
    }

    selectTray(index) {
        this.state.current_tray = index;
        this.state.tray_data = this.state.terrafarm_list[this.state.current_terrafarm].trays_list[index];
        this.setState({
            current_tray: index,
            tray_data: this.state.terrafarm_list[this.state.current_terrafarm].trays_list[index]
        });
    }

    selectClimate(index) {
        this.setState({
            climate_id: this.state.climate_list[index].climate_id
        });
        this.setClimate();
    }

    selectNutrient(index) {
        this.setState({
            nutrient_id: this.state.nutrient_list[index].nutrient_id
        });
        this.setNutrient();
    }

    loadTerrafarmList = () => {
        const terrafarm_list = [];
        var i;
        for (i = 0; i < this.state.terrafarm_list.length; i++) {
            if (this.state.terrafarm_list[i].unit_name === this.state.terrafarm_list[this.state.current_terrafarm].unit_name) {
                terrafarm_list[i] = <li class="dropdown-item" type="status" style={{ background: "transparent" }}><a href="javascript:;" id="current_terrafarm">{this.state.terrafarm_list[this.state.current_terrafarm].unit_name} <i class="fa fa-check icon" id="terrafarm_check" style={{ float: "right", color: "white" }}></i></a></li>;
            }
            if (this.state.terrafarm_list[i].unit_name != this.state.terrafarm_list[this.state.current_terrafarm].unit_name) {
                const terrafarm = this.state.terrafarm_list[i];
                const index = i;
                terrafarm_list[i] = <li class="dropdown-item" type="status" style={{ background: "transparent" }}><a onClick={() => { this.selectTerrafarm(terrafarm, index) }} href="javascript:;">{this.state.terrafarm_list[i].unit_name}</a></li>;
            }
        }
        return terrafarm_list;
    }

    loadTrayList = () => {
        const tray_list = [];
        var i;
        for (i = 0; i < this.state.terrafarm_list.length; i++) {
            if (this.state.terrafarm_list[this.state.current_terrafarm].trays_list[i].tray_name === this.state.terrafarm_list[this.state.current_terrafarm].trays_list[this.state.current_tray].tray_name) {
                tray_list[i] = <li class="dropdown-item" type="status" style={{ background: "transparent" }}><a href="javascript:;" id="current_tray">{this.state.terrafarm_list[this.state.current_terrafarm].trays_list[this.state.current_tray].tray_name} <i class="fa fa-check icon" id="tray_check" style={{ float: "right", color: "white" }}></i></a></li>;
            }
            else if (this.state.terrafarm_list[this.state.current_terrafarm].trays_list[i].tray_name != this.state.terrafarm_list[this.state.current_terrafarm].trays_list[this.state.current_tray].tray_name) {
                const tray = this.state.terrafarm_list[this.state.current_terrafarm].trays_list[i];
                const index = i;
                tray_list[i] = <li class="dropdown-item" type="status" style={{ background: "transparent" }}><a onClick={() => { this.selectTray(tray, index) }} href="javascript:;">{this.state.terrafarm_list[this.state.current_terrafarm].trays_list[i].tray_name}</a></li>;
            }
        }
        return tray_list;
    }

    loadClimateList = () => {
        const climate_list = [];
        var i;
        for (i = 0; i < this.state.climate_list.length; i++) {
            if (this.state.climate_list[i].climate_id === this.state.climate_id) {
                climate_list[i] = <li class="dropdown-item" type="status" style={{ background: "transparent" }}><a href="javascript:;" id="current_tray">{this.state.climate_list[i].climate_name} <i class="fa fa-check icon" id="tray_check" style={{ float: "right", color: "white" }}></i></a></li>;
            }
            else if (this.state.climate_list[i].climate_id != this.state.climate_id) {
                const index = i;
                climate_list[i] = <li class="dropdown-item" type="status" style={{ background: "transparent" }}><a onClick={() => { this.selectClimate(index) }} href="javascript:;">{this.state.climate_list[i].climate_name}</a></li>;
            }
        }
        return climate_list;
    }

    loadNutrientList = () => {
        const nutrient_list = [];
        var i;
        for (i = 0; i < this.state.nutrient_list.length; i++) {
            if (this.state.nutrient_list[i].nutrient_id === this.state.nutrient_id) {
                nutrient_list[i] = <li class="dropdown-item" type="status" style={{ background: "transparent" }}><a href="javascript:;" id="current_tray">{this.state.nutrient_list[i].nutrient_name} <i class="fa fa-check icon" id="tray_check" style={{ float: "right", color: "white" }}></i></a></li>;
            }
            else if (this.state.nutrient_list[i].nutrient_id != this.state.nutrient_id) {
                const index = i;
                nutrient_list[i] = <li class="dropdown-item" type="status" style={{ background: "transparent" }}><a onClick={() => { this.selectNutrient(index) }} href="javascript:;">{this.state.nutrient_list[i].nutrient_name}</a></li>;
            }
        }
        return nutrient_list;
    }

    fetchTerrafarms() {
        const terrafarms = ([{
            'unit_name': "Terrafarm Test",
            'climate_id': "lYExg",
            'led_brightness': 100,
            'low_light_mode': false,
            'num_trays': 2,
            'nutrient_id': "HWXhc",
            'trays_list': [{
                'exp_harvest_timestamp_list': ["1610911607231", "0", "0", "1610911889487", "1610915293116", "1610915299048", "1610917327320", "0", "1614387479952", "0", "1614387449059", "0", "0", "0", "0", "0", "1614387441118", "1614727813542", "0", "1614387470894", "0", "0", "1614387456459", "0", "1614387462192"],
                'num_slots': 25,
                'par_multiplier_list': [0.4676, 0.5853, 0.6478, 0.7434, 0.9596, 0.6027, 0.6565, 0.7591, 0.9198, 0.5234, 0.6085, 0.7454, 0.8713, 0.9727, 0.601, 0.6844, 0.7876, 0.9111, 0.5231, 0.6853, 0.7748, 0.9073, 1.0096, 0.5754, 0.7033, 0.6542],
                'plant_id_list': ["Genovese Basil", "", "", "Genovese Basil", "Genovese Basil", "Genovese Basil", "Genovese Basil", "", "Genovese Basil", "", "Genovese Basil", "", "", "", "", "", "Genovese Basil", "Genovese Basil", "", "Genovese Basil", "", "", "Genovese Basil", "", "Genovese Basil"],
                'plant_timestamp_list': ["1608751607231", "0", "0", "1608751889487", "1608755293116", "1608755299048", "1608757327320", "0", "1612227479952", "0", "1612227449059", "0", "0", "0", "0", "0", "1612227441118", "1612567813542", "0", "1612227470894", "0", "0", "1612227456459", "0", "1612227462192"],
                'serial_list': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                'spacing_configuration': "sZ4WK",
                'tray_id': "R2KO0",
                'tray_name': "Grow Tray 1",
                'tray_number': 0,
                'tray_type': "Grow"
            }]
        }]);
        this.state.terrafarm_list = terrafarms;
        this.setState({
            terrafarm_list: terrafarms
        });
        this.selectTerrafarm(terrafarms[0], 0);
        this.selectTray(0);
    }

    fetchClimates() {
        const climates = ([{
            'climate_name': "Standard",
            'climate_id': "lYExg"
        }]);

        this.state.climate_list = climates;
        this.setState({
            climate_list: climates
        });
    }

    fetchNutrients() {
        const nutrients = ([{
            'nutrient_name': "Aero Garden",
            'nutrient_id': "HWXhc"
        }]);

        this.state.nutrient_list = nutrients;
        this.setState({
            nutrient_list: nutrients
        });
    }

    updateLed = () => {
        const token = this.context.token

        var led_brightness;
        if (this.state.low_light_mode === true) {
            led_brightness = Number(this.ledBrightnessElement.current.state.value);
        }

        if (this.state.low_light_mode === false) {
            led_brightness = 100;
        }

       this.createLedNotification();
    }

    createLedNotification = () => {
        const token = this.context.token;
        const customer_id = this.context.customer_id;

        var requestBody;

        if (this.state.low_light_mode === false) {
            requestBody = {
                query: `
                    mutation {
                      createNotification(notificationInput: {notification_type: "info", customer_id: "${customer_id}", notification_message: "Your Terrafarm's lighting setting has been restored to optimal growth mode."}) {
                        notification_type
                        notification_message
                        timestamp
                      }
                    }
                `
            };
        }

        else if (this.state.low_light_mode === true) {
            requestBody = {
                query: `
                    mutation {
                      createNotification(notificationInput: {notification_type: "info", customer_id: "${customer_id}", notification_message: "Your Terrafarm's lighting setting has been changed to low light mode."}) {
                        notification_type
                        notification_message
                        timestamp
                      }
                    }
                `
            };
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + token
            }
        })
            .then(res => {
                if (res.status != 200) {
                    throw new Error('Failed.');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData.data)
            })
            .catch(err => {
                console.log(err);
            });
    }

    showSlider() {
        if (this.state.low_light_mode === true) {
            return (
                <React.Fragment>
                    <SliderAlt value={this.state.led_brightness} ref={this.ledBrightnessElement}/>
                    <button class="button" type="led-submit" onClick={() => {this.updateLed()}}>SUBMIT</button>
                </React.Fragment>
            );
        }
    }

    setLightMode = () => {
        const previous = this.state.low_light_mode;
        this.state.low_light_mode = !previous;
        this.setState({
            low_light_mode: !previous
        });
        if (this.state.low_light_mode === false) {
            this.updateLed();
        }
    }

    render() {
        return (
            <React.Fragment>
                <head>
                    <script type="text/javascript" src="//code.jquery.com/jquery-3.5.1.js"></script>
                </head>
                <body class="status-body">
                    <div class="grid-container">
                        <DashboardNavbars />
                        <main class="main" type="status">
                            <div class="main-cards" type="status">
                                <div class="card" type="status">
                                    <Tray tray_data={this.state.tray_data} _id={this.state._id} tray_number={this.state.current_tray} climate_id={this.state.climate_id} nutrient_id={this.state.nutrient_id}/>
                                </div>
                                <div class="card" type="status">
                                    <h1>MY TERRAFARM</h1>
                                    <div>
                                        <a class="drop-button" type="status" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{marginTop: "7.5px"}}>
                                            Select Terrafarm
                                        <i class="fa fa-caret-down fa-1x" style={{ color: "#ECECED", marginLeft: "20px" }}>
                                            </i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right" type="status-tf" aria-labelledby="dropdownMenuLink">
                                            {this.loadTerrafarmList()}
                                        </div>
                                        <h3 id="select-terrafarm1" style={{ marginLeft: "300px", marginTop: "-4px" }}>Select which Terrafarm you would like to manage</h3>
                                        <h3 id="select-terrafarm2" style={{ marginLeft: "300px", marginTop: "-4px" }}>Select Terrafarm to manage</h3>
                                    </div>
                                    <div>
                                        <a class="drop-button" type="status" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{marginTop: "10px"}}>
                                            Select Tray
                                        <i class="fa fa-caret-down fa-1x" style={{ color: "#ECECED", marginLeft: "20px" }}>
                                            </i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right" type="status-tf" aria-labelledby="dropdownMenuLink">
                                            {this.loadTrayList()}
                                        </div>
                                        <h3 id="select-tray1" style={{marginLeft: "300px", marginTop: "-1px"}}>Select which tray you would like to manage</h3>
                                        <h3 id="select-tray2" style={{marginLeft: "300px", marginTop: "-1px"}}>Select tray to manage</h3>
                                    </div>
                                </div>
                                <div class="card" type="status">
                                    <h1 id="led-header1">LED BRIGHTNESS</h1>
                                    <h2 id="low-light">Low Light Mode</h2>
                                    <h3 id="led-info1">More information about both brightness settings to help you pick which one to use</h3>
                                    <h3 id="led-info2">More information about brightness settings</h3>
                                    <h3 id="led-info3">More info</h3>
                                    <input type="checkbox" class="light-mode-switch" id="light-mode" ref={this.lowLightModeElement} onClick={() => {this.setLightMode()}} checked={this.state.low_light_mode}/><label class="light-mode-label" for="light-mode"></label>
                                    <button class="button" type="small-white-led"></button>
                                    {this.showSlider()}
                                </div>
                                <div class="card" type="status">
                                    <h1 id="climate-header1">CLIMATE CONTROL</h1>
                                    <h1 id="climate-header2">CLIMATE</h1>
                                    <a class="drop-button" type="status" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select Climate
                                    <i class="fa fa-caret-down fa-1x" style={{ color: "#ECECED", marginLeft: "20px" }}>
                                        </i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" type="status" aria-labelledby="dropdownMenuLink">
                                        {this.loadClimateList()}
                                    </div>
                                    <h3 id="climate-info1" style={{ marginTop: "5px", lineHeight: "24px" }}>More information on climates</h3>
                                    <h3 id="climate-info2" style={{ marginTop: "5px", lineHeight: "24px" }}>More info</h3>
                                    <button class="button" type="small-white-climate"></button>
                                </div>
                                <div class="card" type="status">
                                    <h1 id="nutrient-header1">NUTRIENT SELECTION</h1>
                                    <h1 id="nutrient-header2">NUTRIENT</h1>
                                    <a class="drop-button" type="status" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select Nutrient
                                    <i class="fa fa-caret-down fa-1x" style={{ color: "#ECECED", marginLeft: "20px" }}>
                                        </i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" type="status" aria-labelledby="dropdownMenuLink">
                                        {this.loadNutrientList()}
                                    </div>
                                    <h3 id="nutrient-info1" style={{ marginTop: "5px", lineHeight: "24px" }}>More information on nutrients</h3>
                                    <h3 id="nutrient-info2" style={{ marginTop: "5px", lineHeight: "24px" }}>More info</h3>
                                    <button class="button" type="small-white-climate"></button>
                                </div>
                            </div>
                        </main>
                    </div>
                </body>
            </React.Fragment>
        );
    }
}

export default Status;