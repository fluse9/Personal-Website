import React from 'react';
import "./Dashboard.css"
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle';
import DashboardNavbars from "../../Pages/MyAccount/DashboardNavbars.js";
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends React.Component {
    state = {
        next_harvest: null,
        next_harvest_indicator: null,
        water_low: null,
        water_low_indicator: null,
        led_level: null,
        led_level_indicator: null,
        nutrient_low: null,
        ph_low: null,
        harvest_list: [],
        crop_list: [],
        terrafarm_cost: 0,
        conventional_cost: 0,
        terrafarm_water: 0,
        conventional_water: 0,
        terrafarm_nutrient: 0,
        conventional_nutrient: 0,
        redirect: false,
        loading: true
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchTerrafarms();
        this.fetchHarvests();
        this.fetchCrops();
        this.fetchCustomer();
    }

    setNextHarvest = (terrafarm_list) => {
        var next_harvest = terrafarm_list[0].trays_list[0].exp_harvest_timestamp_list[0];
        var i;
        for (i = 0; i < terrafarm_list.length; i++) {
            var j;
            for (j = 0; j < terrafarm_list[i].trays_list.length; j++) {
                var k;
                for (k = 0; k < terrafarm_list[i].trays_list[j].exp_harvest_timestamp_list.length; k++) {
                    var this_harvest = terrafarm_list[i].trays_list[j].exp_harvest_timestamp_list[k];
                    if ((this_harvest < next_harvest && this_harvest != 0) || Number(next_harvest) === 0) {
                        next_harvest = this_harvest;
                    }
                }
            }
        }
        var next_harvest_indicator;
        if ((new Date(next_harvest / 1) - new Date()) / 86400000 < 2) {
            next_harvest_indicator = true;
        }
        else {
            next_harvest_indicator = false;
        }

        next_harvest = new Date(next_harvest / 1).toDateString().split(' ')[1] + ' ' + new Date(next_harvest / 1).toDateString().split(' ')[2]
        this.setState({
            next_harvest: next_harvest,
            next_harvest_indicator: next_harvest_indicator
        });
    }

    setWaterLevel = (terrafarm_list) => {
        var water_level;
        var water_level_indicator = false;
        var i;
        for (i = 0; i < terrafarm_list.length; i++) {
            if (terrafarm_list[i].tank0_low === 0) {
                water_level_indicator = true;
            }
        }
        if (water_level_indicator === true) {
            water_level = "Low";
        }
        else {
            water_level = "Normal";
        }
        this.setState({
            water_low: water_level,
            water_low_indicator: water_level_indicator
        });
    }

    setLedLevel = (terrafarm_list) => {
        var led_level;
        var led_level_indicator = false;
        var i;
        for (i = 0; i < terrafarm_list.length; i++) {
            if (terrafarm_list[i].led_brightness === 100) {
                led_level_indicator = true;
                led_level = 'Optimal';
            }
            else if(terrafarm_list[i].led_brightness > 0 && terrafarm_list[i].led_brightness < 100) {
                led_level_indicator = true;
                led_level = 'Low';
            }
        }
        if (led_level_indicator === false) {
            led_level = "Off";
        }
        this.setState({
           led_level: led_level,
           led_level_indicator: led_level_indicator
        });
    }

    setNutrientLevel = (terrafarm_list) => {
        var nutrient_level;
        var nutrient_level_indicator = false;
        var i;
        for (i = 0; i < terrafarm_list.length; i++) {
            if (terrafarm_list[i].tank1_low === 0) {
                nutrient_level_indicator = true;
            }
        }
        if (nutrient_level_indicator === true) {
            nutrient_level = true;
        }
        else {
            nutrient_level = false;
        }
        this.setState({
           nutrient_low: nutrient_level
        });
    }

    setPhLevel = (terrafarm_list) => {
        var ph_level;
        var ph_level_indicator = false;
        var i;
        for (i = 0; i < terrafarm_list.length; i++) {
            if (terrafarm_list[i].tank2_low === 0) {
                ph_level_indicator = true;
            }
        }
        if (ph_level_indicator === true) {
            ph_level = true;
        }
        else {
            ph_level = false;
        }
        this.setState({
           ph_low: ph_level
        });
    }

    loadConventionalData = () => {
        var conventional_cost = 0;
        var conventional_water = 0;
        var conventional_nutrient = 0;
        var i;
        for (i = 0; i < this.state.harvest_list.length; i++) {
            var j;
            for (j = 0; j < this.state.crop_list.length; j++) {
                if (this.state.harvest_list[i].plant_id === this.state.crop_list[j].plant_name) {
                    conventional_cost += this.state.crop_list[j].market_price * this.state.harvest_list[i].weight;
                    conventional_water += this.state.crop_list[j].water_use;
                    conventional_nutrient += this.state.crop_list[j].nutrient_use;
                }
            }
        }

        this.setState({
            conventional_cost: conventional_cost,
            conventional_water: conventional_water,
            conventional_nutrient: conventional_nutrient
        });
    }

    setStatusList = (status_list, terrafarm_list) => {
        var i;
        var water_use = 0;
        var nutrient_use = 0;
        for (i = 0; i < status_list.length; i++) {
            if (status_list[i]) {
                water_use += status_list[i].water_use;
                nutrient_use += status_list[i].nutrient_use * 0.00220462;
            }
        }
        var j;
        var slots = 0;
        for (j = 0; j < terrafarm_list.length; j++) {
            var k;
            for (k = 0; k < terrafarm_list[j].trays_list.length; k++) {
                slots += terrafarm_list[j].trays_list[k].exp_harvest_timestamp_list.length;
            }
        }
        this.setState({
            terrafarm_water: water_use,
            terrafarm_nutrient: nutrient_use / slots,
            loading: false
        });
    }

    fetchTerrafarms() {
        const customer_id = this.context.customer_id
        const requestBody = {
            query: `
                    query {
                      terrafarms(customer_id: "${customer_id}") {
                        _id
                        led_brightness
                        tank0_low
                        tank1_low
                        tank2_low
                        num_trays
                        trays_list {
                          exp_harvest_timestamp_list
                        }
                      }
                    }
                `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status != 200) {
                    throw new Error('Failed.');
                }
                return res.json();
            })
            .then(resData => {
                this.setNextHarvest(resData.data.terrafarms);
                this.setWaterLevel(resData.data.terrafarms);
                this.setLedLevel(resData.data.terrafarms);
                this.setNutrientLevel(resData.data.terrafarms);
                this.setPhLevel(resData.data.terrafarms);
                this.fetchStatus(resData.data.terrafarms);
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchHarvests() {
        const customer_id = this.context.customer_id;
        const token = this.context.token;

        const requestBody = {
            query: `
                query {
                  harvests (customer_id: "${customer_id}") {
                    _id
                    weight
                    plant_id
                    act_harvest_timestamp
                  }
                }
            `
        };

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
                this.setState({
                    harvest_list: resData.data.harvests
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchCrops() {
        const requestBody = {
            query: `
                query {
                  plants {
                    plant_id
                    plant_name
                    water_use
                    nutrient_use
                    market_price
                  }
                }
            `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status != 200) {
                    throw new Error('Failed.');
                }
                return res.json();
            })
            .then(resData => {
                this.setState({
                    crop_list: resData.data.plants
                });
                this.loadConventionalData();
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchCustomer() {
        const customer_id = this.context.customer_id;
        const token = this.context.token;

        const requestBody = {
            query: `
                query {
                  customer (customer_id: "${customer_id}") {
                    total_purchases
                  }
                }
            `
        };

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
                this.setState({
                    terrafarm_cost: resData.data.customer.total_purchases
                });
                console.log(this.state.terrafarm_water)
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchStatus = (terrafarm_list) => {
        const customer_id = this.context.customer_id;
        const token = this.context.token;
        var i;
        var status_list = [];
        for (i = 0; i < terrafarm_list.length; i++) {
            const requestBody = {
                query: `
                    query {
                      status (unit_id: "${terrafarm_list[i]._id}") {
                        status
                      }
                    }
                `
            };

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
                    if (resData) {
                        var j;
                        for (j = 0; j < resData.data.status.length; j++) {
                            if (resData.data.status[j]) {
                                status_list.push(resData.data.status[j].status);
                            }
                        }
                    }
                    if (i === terrafarm_list.length) {
                        this.setStatusList(status_list, terrafarm_list);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    renderRedirect = () => {
        if (this.state.redirect === true) {
          return <Redirect to='/dashboard/status' />
        }
    }

    renderSupplyAlert() {
        var current_date = new Date();
        var next_week = new Date(current_date.setDate(current_date.getDate() + 7))
        const nutrient_alert = (
            <div class="card" type="dashboard">
                <div class="alert">
                    <h1><i class="fa fa-exclamation-triangle icon" style={{ color: "white" }}></i> NUTRIENT SUPPLY LOW</h1>
                </div>
                <div class="line">
                    <div class="circle"></div>
                </div>
                <h2>Looks like you're running low on nutrients! Set up a new order for restock by {next_week.toDateString()}.</h2>
                <button class="button" type="purchase">PURCHASE NOW {">"}</button>
            </div>
        );

        const ph_alert = (
            <div class="card" type="dashboard">
                <div class="alert">
                    <h1><i class="fa fa-exclamation-triangle icon" style={{ color: "white" }}></i> PH DOWN SUPPLY LOW</h1>
                </div>
                <div class="line">
                    <div class="circle"></div>
                </div>
                <h2>Looks like you're running low on pH down solution! Set up a new order for restock by {next_week.toDateString()}.</h2>
                <button class="button" type="purchase">PURCHASE NOW {">"}</button>
            </div>
        );

        if (this.state.nutrient_low === true) {
            return nutrient_alert;
        }

        else if (this.state.ph_low === true) {
            return ph_alert;
        }

        else {
            return (<div class="card" type="dashboard"></div>);
        }
    }

    renderCostSavings() {
        if (this.state && this.state.terrafarm_water != 0) {
            return (
                <React.Fragment>
                    <h3>COST SAVINGS</h3>
                    <h4>You have saved ${this.state.conventional_cost - this.state.terrafarm_cost} on produce grown in your Terrafarm versus purchasing at the store.</h4>
                    <div class="wrap">
                        <div class="holder">
                            <div class="bar-axis"></div>
                            <div class="bargraph cf" data={this.state.conventional_cost} data-percent={((this.state.conventional_cost) / (this.state.terrafarm_cost + this.state.conventional_cost) * 100).toString() + "%"} onLoad={setTimeout(0)} style={{ backgroundColor: '#368051' }}>
                                <span class="label"></span>
                                <span class="count" id="cost1"></span>
                            </div>
                            <span class="label-actual">CONVENTIONAL FARMING</span>
                            <div class="bargraph cf" data={this.state.terrafarm_cost} data-percent={((this.state.terrafarm_cost) / (this.state.terrafarm_cost + this.state.conventional_cost) * 100).toString() + "%"} onLoad={setTimeout(0)} style={{ backgroundColor: '#48AC6D' }}>
                                <span class="label light"></span>
                                <span class="count" id="cost2"></span>
                            </div>
                            <span class="label-actual">TERRAFARM</span>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }

    renderWaterSavings() {
        if (this.state && this.state.terrafarm_water != 0) {
            return (
                <React.Fragment>
                    <h3>WATER SAVINGS</h3>
                    <h4>Produce grown in your Terrafarm has used {Math.round(100 * (this.state.conventional_water - this.state.terrafarm_water) / this.state.conventional_water)}% less water than conventional farms.</h4>
                    <div class="wrap">
                        <div class="holder">
                            <div class="bar-axis"></div>
                            <div class="bargraph cf" data={this.state.conventional_water} data-percent={((this.state.conventional_water) / (this.state.terrafarm_water + this.state.conventional_water) * 100).toString() + "%"} onLoad={setTimeout(0)} style={{ backgroundColor: '#0A636B' }}>
                                <span class="label"> </span>
                                <span class="count" id="water1"></span>
                            </div>
                            <span class="label-actual">CONVENTIONAL FARMING</span>
                            <div class="bargraph cf" data={this.state.terrafarm_water} data-percent={((this.state.terrafarm_water) / (this.state.terrafarm_water + this.state.conventional_water) * 100).toString() + "%"} onLoad={setTimeout(0)} style={{ backgroundColor: '#0C808B' }}>
                                <span class="label light"></span>
                                <span class="count" id="water2"></span>
                            </div>
                            <span class="label-actual">TERRAFARM</span>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }


    renderNutrientSavings() {
        if (this.state && this.state.terrafarm_water != 0) {
            return (
                <React.Fragment>
                    <h3>NUTRIENT SAVINGS</h3>
                    <h4>Produce grown in your Terrafarm has used {Math.round(100 * (this.state.conventional_nutrient - this.state.terrafarm_nutrient) / this.state.conventional_nutrient)}% less fertilizer than conventional farms.</h4>
                    <div class="wrap">
                        <div class="holder">
                            <div class="bar-axis"></div>
                            <div class="bargraph cf " data={this.state.conventional_nutrient * 453.592} data-percent={((this.state.conventional_nutrient) / (this.state.terrafarm_nutrient + this.state.conventional_nutrient) * 100).toString() + "%"} onLoad={setTimeout(0)} style={{ backgroundColor: '#368569' }}>
                                <span class="label"></span>
                                <span class="count" id="nutrient1"></span>
                            </div>
                            <span class="label-actual">CONVENTIONAL FARMING</span>
                            <div class="bargraph cf" data={this.state.terrafarm_nutrient * 453.592} data-percent={((this.state.terrafarm_nutrient) / (this.state.terrafarm_nutrient + this.state.conventional_nutrient) * 100).toString() + "%"} onLoad={setTimeout(0)} style={{ backgroundColor: '#48B08C' }}>
                                <span class="label light"></span>
                                <span class="count" id="nutrient2"></span>
                            </div>
                            <span class="label-actual">TERRAFARM</span>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            setTimeout(function start() {
                $('.bargraph').each(function (i) {
                    var $bargraph = $(this);
                    $(this).append('<span class="count"></span>')
                    setTimeout(function () {
                        $bargraph.css('width', $bargraph.attr('data-percent'));
                    }, i * 100);
                });
                $('#cost1').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).parent('.bargraph').attr('data')
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text('$' + Math.ceil(now));
                        }
                    });
                });
                $('#cost2').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).parent('.bargraph').attr('data')
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text('$' + Math.ceil(now));
                        }
                    });
                });
                $('#water1').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).parent('.bargraph').attr('data')
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now) + 'gal');
                        }
                    });
                });
                $('#water2').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).parent('.bargraph').attr('data')
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now) + 'gal');
                        }
                    });
                });
                $('#nutrient1').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).parent('.bargraph').attr('data')
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now) + 'g');
                        }
                    });
                });
                $('#nutrient2').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).parent('.bargraph').attr('data')
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now) + 'g');
                        }
                    });
                });
            }, 500),
            <React.Fragment>
                {this.renderRedirect()}
                <head>
                    <script type="text/javascript" src="//code.jquery.com/jquery-3.5.1.js"></script>
                </head>
                <body class="dash-body">
                    <div class="grid-container">
                        <DashboardNavbars />
                        <main class="main" type="dashboard">
                            <div class="main-cards" type="dashboard">
                                <div class="card" type="dashboard"></div>
                                <div class="card" type="dashboard">
                                    <h3>MY TERRAFARM</h3>
                                    <h4>A brief overview of your Terrafarm's current status.</h4>
                                    <h5>Water Level
                                        <div style={{ position: "absolute", marginLeft: "300px", marginTop: "-60px" }}><input class="toggle-button" type="checkbox" id="toggle-button1" onClick={() => {this.setState({redirect: true})}} checked={this.state.water_low_indicator}/><label class="dashboard-label" for="toggle-button1" type="water" water_low={this.state.water_low}></label></div>
                                    </h5>
                                    <h5>Next Harvest
                                        <div style={{ position: "absolute", marginLeft: "300px", marginTop: "-60px" }}><input class="toggle-button" type="checkbox" id="toggle-button2" onClick={() => {this.setState({redirect: true})}} checked={this.state.next_harvest_indicator}/><label class="dashboard-label" for="toggle-button2" type="harvest" next_harvest={this.state.next_harvest}></label></div>
                                    </h5>
                                    <h5>Lighting
                                        <div style={{ position: "absolute", marginLeft: "300px", marginTop: "-60px" }}><input class="toggle-button" type="checkbox" id="toggle-button3" onClick={() => {this.setState({redirect: true})}} checked={this.state.led_level_indicator}/><label class="dashboard-label" for="toggle-button3" type="lighting" led_level={this.state.led_level}></label></div>
                                    </h5>
                                </div>
                                {this.renderSupplyAlert()}
                                <div class="card" type="dashboard">
                                    {this.renderCostSavings()}
                                </div>
                                <div class="card" type="dashboard">
                                    {this.renderWaterSavings()}
                                </div>
                                <div class="card" type="dashboard">
                                    {this.renderNutrientSavings()}
                                </div>
                            </div>
                        </main>
                    </div>
                </body>
            </React.Fragment>
        );
    }
}

export default Dashboard;