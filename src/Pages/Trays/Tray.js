import React, { useState } from 'react';
import Modal from 'react-modal';
import './Tray.css';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Tray extends React.Component {
    state = {
        crop_list: [],
        _id: "",
        climate_id: "",
        nutrient_id: "",
        tray_number: null,
        serial_list: [],
        plant_id_list: [],
        par_multiplier_list: [],
        plant_timestamp_list: [],
        exp_harvest_timestamp_list: [],
        slots_list: [],
        color_code_list: [],
        shadow_color_list: [],
        current_slot: null,
        current_plant: "",
        action: "",
        show_plant_modal: false,
        show_harvest_modal: false,
        show_crop_details: "hidden",
        crop_description: "",
        cutting: false,
        feedback: false,
        redirect: false
    }

    constructor(props) {
        super(props);
        this.weightElement = React.createRef();
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps !== this.props || !previousProps) {
            if (this.props.tray_data) {
                this.setTray(this.props.tray_data);
                this.state._id = this.props._id;
                this.state.climate_id = this.props.climate_id;
                this.state.nutrient_id = this.props.nutrient_id;
                this.state.tray_number = this.props.tray_number;
            }
        }
    }

    componentDidMount() {
        this.loadCrops();
    }

    changeCutting = () => {
        const previous = this.state.cutting;
        this.state.cutting = !previous;
        this.setState({
            cutting: !previous
        });
    }

    changeFeedback = () => {
        const previous = this.state.feedback;
        this.state.feedback = !previous;
        this.setState({
            feedback: !previous
        });
    }

    setTray = (tray) => {
        this.state.serial_list = tray.serial_list;
        this.state.plant_id_list = tray.plant_id_list;
        this.state.par_multiplier_list = tray.par_multiplier_list;
        this.state.plant_timestamp_list = tray.plant_timestamp_list;
        this.state.exp_harvest_timestamp_list = tray.exp_harvest_timestamp_list;
        this.loadSlots();
    }

    loadSlots = () => {
        const slots_list = [];
        const color_code_list = [];
        const shadow_color_list = [];
        var i;
        for (i = 0; i < this.state.serial_list.length; i++) {
            if (this.state.exp_harvest_timestamp_list[i] / 1 === 0) {
                slots_list[i] = "green";
                color_code_list[i] = "#48AC6D";
                shadow_color_list[i] = "#3D915C";
            }
            else if ((new Date(this.state.exp_harvest_timestamp_list[i] / 1) - new Date()) / 86400000 < 2) {
                slots_list[i] = "red";
                color_code_list[i] = "#DE5E3B";
                shadow_color_list[i] = "#FF6D45";
            }
            else {
                slots_list[i] = "yellow";
                color_code_list[i] = "#E6CB22";
                shadow_color_list[i] = "#DEC521";
            }
        }
        this.setState({
            slots_list: slots_list,
            color_code_list: color_code_list,
            shadow_color_list: shadow_color_list
        });
    }

    loadSlotInfo = (id) => {
        var current_timestamp;
        var action;
        if (this.state.exp_harvest_timestamp_list[id] / 1 === 0) {
            current_timestamp = "";
            action = "plant";
        }
        else if (this.state.exp_harvest_timestamp_list[id]) {
            current_timestamp = new Date(this.state.exp_harvest_timestamp_list[id] / 1).toDateString();
            action = "harvest";
        }

        var plant;
        if (this.state.plant_id_list[id] === "") {
            plant = "EMPTY";
        }
        else {
            plant = this.state.plant_id_list[id];
        }

        this.setState({
            current_slot: id,
            current_plant: plant.toUpperCase(),
            current_timestamp: current_timestamp,
            action: action
        });
    }

    renderSlots = () => {
        var slots_list = []
        var i;
        for (i = 0; i < this.state.serial_list.length; i++) {
            const id = i;
            slots_list[i] = <div class="slots-card" id={id.toString()} type={this.state.slots_list[id]} onClick={() => this.loadSlotInfo(id)}></div>;
        }
        return slots_list;
    }

    submitHandler = () => {
        this.createTrayNotification();

        if (this.state.action === "plant") {

        }

        else if (this.state.action === "harvest") {
            if (this.state.cutting === false) {
                this.state.plant_id_list[this.state.current_slot] = "";
                this.state.plant_timestamp_list[this.state.current_slot] = "";
                this.state.exp_harvest_timestamp_list[this.state.current_slot] = "";
            }
        }

        this.hideModal();
        if (this.state.feedback === true) {
            this.setState({
                redirect: true
            });
        }
        this.loadSlots();
    }

    loadCrops() {
        const plants = ([{
            'cuttings_io': true,
            'cuttings_period': "3-5",
            'description': "Genovese basil, our most popular variety of basil, is sweet, aromatic, and grows quickly and full. It is widely used to make pesto sauce and is frequently used in Italian and Mediterranean cuisine. If you are looking for a flavorful, large basil leaf this is the variety for you.",
            'germination_period': "5-10",
            'growth_period': "14-21",
            'organic_io': true,
            'plant_id': "XWArs",
            'plant_name': "Genovese Basil",
            'plant_species': "Basil",
            'plant_type': "Herb",
            'spacing_configuration': "VOkvP"
        }]);

        this.state.crop_list = plants;
        this.setState({
            crop_list: plants
        });
    }

    createTrayNotification = () => {
        const token = this.context.token;
        const customer_id = this.context.customer_id;
        const notification_message = `You successfully ${this.state.action}ed a ${this.state.current_plant} crop!`;


        const requestBody = {
            query: `
                mutation {
                  createNotification(notificationInput: {notification_type: "info", customer_id: "${customer_id}", notification_message: "${notification_message}"}) {
                    notification_type
                    notification_message
                    timestamp
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
                console.log(resData.data)
            })
            .catch(err => {
                console.log(err);
            });
    }

    setCrop = (index) => {
        this.state.crop_description = this.state.crop_list[index].description;
        this.state.current_plant = this.state.crop_list[index].plant_name
        this.state.plant_id_list[this.state.current_slot] = this.state.crop_list[index].plant_name;
        this.state.plant_timestamp_list[this.state.current_slot] = new Date();

        var germ_range = this.state.crop_list[index].germination_period.split('-');
        var avg_germ_time = (Number(germ_range[1]) + Number(germ_range[0])) / 2;

        var grow_range = this.state.crop_list[index].growth_period.split('-');
        var avg_grow_time = (Number(grow_range[1]) + Number(grow_range[0])) / 2;

        var time_to_harvest = (avg_germ_time + avg_grow_time) * 86400000;

        var exp_harvest_timestamp = new Date(this.state.plant_timestamp_list[this.state.current_slot] / 1 + time_to_harvest);

        this.state.exp_harvest_timestamp_list[this.state.current_slot] = exp_harvest_timestamp;
        this.state.current_timestamp = exp_harvest_timestamp.toDateString();

        this.setState({
            show_crop_details: "visible"
        });
    }

    loadCropList = () => {
        var crops = [];
        var i;
        for (i = 0; i < this.state.crop_list.length; i++) {
            const index = i;
            crops[i] = <li class="dropdown-item" type="tray" style={{ background: "transparent" }}><a onClick={() => { this.setCrop(index) }} href="javascript:;">{this.state.crop_list[i].plant_name}</a></li>;
        }
        return crops;
    }

    hideModal = () => {
        this.setState({
            current_plant: "",
            current_timestamp: "",
            show_crop_details: "hidden",
            show_plant_modal: false,
            show_harvest_modal: false
        });
    }

    showModal = () => {
        if (this.state.action === "plant") {
            this.setState({
                show_plant_modal: true
            });
        }
        else if(this.state.action === "harvest") {
            this.setState({
                show_harvest_modal: true
            });
        }
    }

    loadPlantModal = () => {
        return (
            <Modal
                className="modal-backdrop1"
                isOpen={this.state.show_plant_modal}
                onClose={() => {this.hideModal()}}
                transparent={true}
            >
                <div class="modal-main1">
                    <i class="fa fa-times fa-1x" style={{ float: "right", marginRight: "30px", marginTop: "25px", color: "gray", cursor: "pointer" }} onClick={() => {this.hideModal()}}></i>
                    <h1 style={{ color: this.state.color_code_list[this.state.current_slot] }}>POD {this.state.current_slot}: {this.state.current_plant}</h1>
                    <h2 style={{ marginTop: "50px" }}>
                        Please select the crop you would like to plant.
                        <a class="drop-button" type="tray" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{marginTop: "10px"}}>
                            Select Crop
                        <i class="fa fa-caret-down fa-1x" style={{ color: "#ECECED", marginLeft: "20px" }}>
                            </i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" type="tray" aria-labelledby="dropdownMenuLink">
                            {this.loadCropList()}
                        </div>
                    </h2>
                    <h2 style={{ marginTop: "50px", visibility: this.state.show_crop_details }}>
                        {this.state.crop_description}
                    </h2>
                    <h2 style={{ marginTop: "50px", visibility: this.state.show_crop_details }}>
                        Expected harvest: {this.state.current_timestamp}
                    </h2>
                    <button class="button" type="submit-plant" id="submit" onClick={ () => {this.submitHandler()} }>SUBMIT</button>
                </div>
            </Modal>
        );
    }

    loadHarvestModal = () => {
        return (
            <Modal
                className="modal-backdrop1"
                isOpen={this.state.show_harvest_modal}
                onClose={() => {this.hideModal()}}
                transparent={true}
            >
                <div class="modal-main1">
                    <i class="fa fa-times fa-1x" style={{ float: "right", marginRight: "30px", marginTop: "25px", color: "gray", cursor: "pointer" }} onClick={() => {this.hideModal()}}></i>
                    <h1 style={{ color: "#DE5E3B" }}>POD {this.state.current_slot}: {this.state.current_plant}</h1>
                    <h2>Expected {this.state.action}: {this.state.current_timestamp}</h2>
                    <h2 id="first-line" style={{ marginTop: "50px" }}>
                        Click the button if you are only taking a cutting from the plant. <br id="new-line"/> Leave it unchecked if you are harvesting the full plant.
                        <div style={{ position: "absolute", marginLeft: "300px", marginTop: "-85px" }}><input class="toggle-button-modal" type="checkbox" id="toggle-button1" onChange={() => {this.changeCutting()}} checked={this.state.cutting}/><label class="modal-label" for="toggle-button1" type="cutting"></label></div>
                    </h2>
                    <h2 style={{ marginTop: "50px" }}>
                        Enter the weight of your harvest in kilograms:
                        <input class="harvest-input" type="weight" placeholder="Weight (kg)" ref={this.weightElement}></input>
                    </h2>
                    <h2 style={{ marginTop: "50px" }}>
                        Click the button if you would like to provide additional feedback.
                        <div style={{ position: "absolute", marginLeft: "300px", marginTop: "-75px" }}><input class="toggle-button-modal" type="checkbox" id="toggle-button2" onChange={() => {this.changeFeedback()}} checked={this.state.feedback}/><label class="modal-label" for="toggle-button2" type="feedback"></label></div>
                    </h2>
                    <button class="button" type="submit-harvest" id="submit" onClick={ () => {this.submitHandler()} }>SUBMIT</button>
                </div>
            </Modal>
        );
    }

    renderRedirect = () => {
        if (this.state.redirect === true) {
          return <Redirect to='/dashboard/feedback' />
        }
    }

    render() {
        var color = this.state.color_code_list[this.state.current_slot];
        $(document).ready(function () {
            $("#action").css("background-color", color);
            $("#action").on("mouseenter", function () {
                $("#action").css("color", color);
            });
            $("#action").on("mouseleave", function () {
                $("#action").css("color", "#F2F2F2");
            });
        });
        return (
            <React.Fragment>
                {this.renderRedirect()}
                {this.loadPlantModal()}
                {this.loadHarvestModal()}
                <div class="slots-container">
                    <div class="slots-cards">
                        {this.renderSlots()}
                    </div>
                </div>
                <div class="slot-info">
                    {this.state.current_plant && (
                        <React.Fragment>
                            <h1 style={{ color: this.state.color_code_list[this.state.current_slot] }}>POD {this.state.current_slot}: {this.state.current_plant}</h1>
                            <button class="button" id="action" type="plant-harvest" onClick={() => {this.showModal()} } style={{ boxShadow: `0 0 5px ${this.state.shadow_color_list[this.state.current_slot]}` }}>{this.state.action.toUpperCase()}</button>
                        </React.Fragment>
                    )}
                    {(this.state.current_plant && this.state.plant_id_list[this.state.current_slot]) && (
                        <React.Fragment>
                            <h2>Expected {this.state.action}: {this.state.current_timestamp}</h2>
                            <button class="button" type="small-white"></button>
                            <h3 id="slotinfo-text1">More information about harvesting this crop</h3>
                            <h3 id="slotinfo-text2">More info</h3>
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    }

}

export default Tray