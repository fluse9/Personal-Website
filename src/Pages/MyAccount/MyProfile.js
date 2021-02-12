import React from 'react';
import "./MyProfile.css"
import 'bootstrap/dist/js/bootstrap.bundle';
import DashboardNavbars from "../../Pages/MyAccount/DashboardNavbars.js"
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faUser } from '@fortawesome/free-solid-svg-icons';

class MyProfile extends React.Component {
    state = {
        address_id: null,
        name: null,
        address_line1: null,
        address_line2: null,
        city: null,
        region: null,
        post_code: null,
        country: null,
        phone: null,
        email: null,
        password: null,
        language_preference: null,
        account_type: null,
        email_notifications: null,
        automatic_shipments: null,
        data_share: null,
        country_options: ['United States', 'Canada'],
        language_options: ['English', 'Spanish'],
        account_options: ['Home', 'Business'],
    };

    constructor(props) {
        super(props);
        this.nameElement = React.createRef();
        this.addressLine1Element = React.createRef();
        this.addressLine2Element = React.createRef();
        this.cityElement = React.createRef();
        this.regionElement = React.createRef();
        this.zipElement = React.createRef();
        this.phoneElement = React.createRef();
        this.emailElement = React.createRef();
        this.passwordElement = React.createRef();
    }

    setAddress = (primaryAddress) => {
        var countryUpperCase = primaryAddress['country'];
        const countryTitleCase = countryUpperCase.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');

        this.setState({
            address_id: primaryAddress['address_id'],
            address_line1: primaryAddress['address_line1'],
            address_line2: primaryAddress['address_line2'],
            city: primaryAddress['city'],
            region: primaryAddress['region'],
            post_code: primaryAddress['post_code'],
            country: countryTitleCase
        });
    };

    setCustomer = (customer) => {
        this.setState({
            name: customer['customer_name'],
            phone: customer['customer_phone'],
            email: customer['customer_email'],
            password: customer['customer_password']
        });
    };

    setAccountInfo = (accountinfo) => {
        this.setState({
            language_preference: accountinfo['language_preference'],
            account_type: accountinfo['account_type'],
            email_notifications: accountinfo['email_notifications'],
            automatic_shipments: accountinfo['automatic_shipments'],
            data_share: accountinfo['data_share']
        });
    };

    setCountry = () => {
        const country_list = [];
        var i;
        for (i = 0; i < this.state.country_options.length; i++) {
            if (this.state.country_options[i] === this.state.country) {
                country_list[i] = <li class="dropdown-item" type="myprofile" style={{ background: "transparent" }}><a href="javascript:;">{this.state.country} <i class="fa fa-check icon" style={{ float: "right", marginRight: "50px", color: "#DE5E3B" }}></i></a></li>;
            }
            if (this.state.country_options[i] != this.state.country) {
                const x = this.state.country_options[i];
                country_list[i] = <li class="dropdown-item" type="myprofile" style={{ background: "transparent" }}><a onClick={() => { this.changeCountry(x) }} href="javascript:;">{this.state.country_options[i]} </a></li>;
            }
        }
        return country_list;
    }

    setLanguage = () => {
        const language_list = [];
        var i;
        for (i = 0; i < this.state.language_options.length; i++) {
            if (this.state.language_options[i] === this.state.language_preference) {
                language_list[i] = <li class="dropdown-item" type="myprofile" style={{ background: "transparent" }}><a href="javascript:;">{this.state.language_preference}<i class="fa fa-check icon" style={{ float: "right", marginRight: "50px", color: "#DE5E3B" }}></i></a></li>;
            }
            if (this.state.language_options[i] != this.state.language_preference) {
                const x = this.state.language_options[i];
                language_list[i] = <li class="dropdown-item" type="myprofile" style={{ background: "transparent" }}><a onClick={() => { this.changeLanguage(x) }} href="javascript:;">{this.state.language_options[i]}</a></li>;
            }
        }
        return language_list;
    }

    setAccountType = () => {
        const account_list = [];
        var i;
        for (i = 0; i < this.state.account_options.length; i++) {
            if (this.state.account_options[i] === this.state.account_type) {
                account_list[i] = <li class="dropdown-item" type="myprofile" style={{ background: "transparent" }}><a href="javascript:;">{this.state.account_type} <i class="fa fa-check icon" style={{ float: "right", marginRight: "50px", color: "#DE5E3B" }}></i></a></li>;
            }
            if (this.state.account_options[i] != this.state.account_type) {
                const x = this.state.account_options[i];
                account_list[i] = <li class="dropdown-item" type="myprofile" style={{ background: "transparent" }}><a onClick={() => { this.changeAccountType(x) }} href="javascript:;">{this.state.account_options[i]} </a></li>;
            }
        }
        return account_list;
    }

    changeCountry = (country) => {
        this.state.country = country;
        this.updateAddress();
    }

    changeLanguage = (language) => {
        this.state.language_preference = language;
        this.updateAccountInfo();
    }

    changeAccountType = (accountType) => {
        this.state.account_type = accountType;
        this.updateAccountInfo();
    }

    changeEmailNotifications = () => {
        const previous = this.state.email_notifications;
        this.state.email_notifications = !previous;
        this.updateAccountInfo();
    }

    changeAutomaticShipments = () => {
        const previous = this.state.automatic_shipments;
        this.state.automatic_shipments = !previous;
        this.updateAccountInfo();
    }

    changeDataShare = () => {
        const previous = this.state.data_share;
        this.state.data_share = !previous;
        this.updateAccountInfo();
    }

    componentDidMount() {
        this.fetchAddress();
        this.fetchCustomer();
        this.fetchAccountInfo();
    }

    updateAddress() {
        const token = this.context.token;

        const requestBody = {
            query: `
                mutation {
                    updateAddress(address_id: "${this.state.address_id}", addressInput: {address_type: "Primary", address_line1: "${this.state.address_line1}", address_line2: "${this.state.address_line2}", city: "${this.state.city}", region: "${this.state.region}", post_code: "${this.state.post_code}", country: "${this.state.country}"}) {
                        address_type
                    }
                }
            `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed.');
                }
                return res.json();
            })
            .then(resData => {
                this.fetchAddress();
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateAccountInfo() {
        const customer_id = this.context.customer_id;
        const token = this.context.token; 

        const requestBody = {
            query: `
                mutation {
                    updateAccountInfo(customer_id: "${customer_id}", accountInfoInput: { language_preference: "${this.state.language_preference}", account_type: "${this.state.account_type}", email_notifications: ${this.state.email_notifications}, automatic_shipments: ${this.state.automatic_shipments}, data_share: ${this.state.data_share} }) {
                    language_preference
                    account_type
                    email_notifications
                    automatic_shipments
                    data_share
                    }
                }
                `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status != 200) {
                    throw new Error('Failed.');
                }
                return res.json();
            })
            .then(resData => {
                this.fetchAccountInfo();
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchAddress() {
        const customer_id = this.context.customer_id
        const requestBody = {
            query: `
                    query {
                      customer(customer_id: "${customer_id}") {
                        customer_name
                        customer_email
                        customer_password
                        customer_phone
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
                const customer = resData.data['customer']
                this.setCustomer(customer);
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchCustomer() {
        const customer_id = this.context.customer_id
        const requestBody = {
            query: `
                    query {
                      addresses(customer_id: "${customer_id}") {
                        address_id
                        address_type
                        address_line1
                        address_line2
                        city
                        region
                        post_code
                        country
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
                const address_list = resData.data['addresses']
                var i;
                for (i = 0; i < address_list.length; i++) {
                    if (address_list[i]['address_type'] === 'Primary') {
                        this.setAddress(address_list[i]);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchAccountInfo() {
        const customer_id = this.context.customer_id
        const requestBody = {
            query: `
                    query {
                      accountInfo(customer_id: "${customer_id}") {
                        language_preference
                        account_type
                        email_notifications
                        automatic_shipments
                        data_share
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
                const accountinfo = resData.data['accountInfo']
                this.setAccountInfo(accountinfo);
            })
            .catch(err => {
                console.log(err);
            });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.nameElement.current.value !== '') {
            this.state.name = this.nameElement.current.value.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');
        }
        if (this.addressLine1Element.current.value !== '') {
            this.state.address_line1 = this.addressLine1Element.current.value.toUpperCase();
        }
        if (this.addressLine2Element.current.value !== '') {
            this.state.address_line2 = this.addressLine2Element.current.value.toUpperCase();
        }
        if (this.cityElement.current.value !== '') {
            this.state.city = this.cityElement.current.value.toUpperCase();
        }
        if (this.regionElement.current.value !== '') {
            this.state.region = this.regionElement.current.value.toUpperCase();
        }
        if (this.zipElement.current.value !== '') {
           this.state.post_code = this.zipElement.current.value.toUppercase();
        }
        if (this.phoneElement.current.value !== '') {
            this.state.phone = this.phoneElement.current.value;
        }
        if (this.emailElement.current.value !== '') {
            this.state.email = this.emailElement.current.value.toUpperCase();
        }
        if (this.passwordElement.current.value !== '') {
            this.state.password = this.passwordElement.current.value.toUpperCase();
        }

        const customer_id = this.context.customer_id

        const requestBody = {
            query: `
                mutation {
                    updateCustomer(customer_id: "${customer_id}", customerInput: {customer_name: "${this.state.name}", customer_email: "${this.state.email}", customer_password: "${this.state.password}", customer_phone: "${this.state.phone}"}) {
                        customer_name
                    }
                }
            `
        };

        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed.');
                }
                return res.json();
            })
            .then(resData => {
                this.fetchCustomer();
            })
            .catch(err => {
                console.log(err);
            });

        const requestBody2 = {
            query: `
                mutation {
                    updateAddress(address_id: "${this.state.address_id}", addressInput: {address_type: "Primary", address_line1: "${this.state.address_line1}", address_line2: "${this.state.address_line2}", city: "${this.state.city}", region: "${this.state.region}", post_code: "${this.state.post_code}", country: "${this.state.country}"}) {
                        address_type
                    }
                }
            `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody2),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed.');
                }
                return res.json();
            })
            .then(resData => {
                this.fetchAddress();
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        $(document).ready(function () {
            $(".myprofile-info").prop("disabled", true);
            $("#save").prop("hidden", true);
            $("#edit").click(function () {
                $(".myprofile-info").prop("disabled", false);
                $("#save").prop("hidden", false);
            });
            $("#save").click(function () {
                $(".myprofile-info").prop("disabled", true);
            });
        });

        return (
            <React.Fragment>
                <head>
                    <script type="text/javascript" src="//code.jquery.com/jquery-3.5.1.js"></script>
                </head>
                <body class="myprofile-body">
                    <div class="grid-container">
                        <DashboardNavbars />
                        <main class="main" type="myprofile">
                            <div class="grid">
                                <div class="main-cards" type="myprofile">
                                    <div class="card" type="myprofile">
                                        <h1>MY TERRAFARM</h1>
                                        <FontAwesomeIcon icon={faCircle} size="10x" style={{ position: "absolute", top: "100px", color: "#808080" }}></FontAwesomeIcon>
                                        <FontAwesomeIcon icon={faUser} size="6x" style={{ position: "absolute", top: "130px", color: "#4F4F4F" }}></FontAwesomeIcon>
                                        <h2>{this.state.name}</h2>
                                        <h3>{this.state.email}</h3>
                                        <button class="button" type="myprofile-green">OVERVIEW</button>
                                        <button class="button" type="myprofile-gray" id="edit">EDIT ACCOUNT</button>
                                        <a href="/signin"><button class="button" type="myprofile-gray" style={{ marginTop: "275px" }} onClick={this.context.logout}>SIGN OUT</button></a>
                                    </div>
                                    <div class="card" type="myprofile">
                                        <h4>ACCOUNT INFO</h4>
                                        <h5>NAME</h5>
                                        <input class="myprofile-info" placeholder={this.state.name} ref={this.nameElement}></input>
                                        <h5>ADDRESS LINE 1</h5>
                                        <input class="myprofile-info" placeholder={this.state.address_line1} ref={this.addressLine1Element}></input>
                                        <h5>ADDRESS LINE 2</h5>
                                        <input class="myprofile-info" placeholder={this.state.address_line2} ref={this.addressLine2Element}></input>
                                        <h5>CITY</h5>
                                        <input class="myprofile-info" type="city" placeholder={this.state.city} ref={this.cityElement}></input>
                                        <h5 type="state">STATE</h5>
                                        <input class="myprofile-info" type="state" placeholder={this.state.region} ref={this.regionElement}></input>
                                        <h5 type="zip">ZIP</h5>
                                        <input class="myprofile-info" type="zip" placeholder={this.state.post_code} ref={this.zipElement}></input>
                                        <h5>PHONE NUMBER</h5>
                                        <input class="myprofile-info" placeholder={this.state.phone} ref={this.phoneElement}></input>
                                        <h5>EMAIL ADDRESS</h5>
                                        <input class="myprofile-info" placeholder={this.state.email} ref={this.emailElement}></input>
                                        <h5>PASSWORD</h5>
                                        <input class="myprofile-info" placeholder="**********" ref={this.passwordElement}></input>
                                        <button class="button" type="myprofile-green-password" style={{ marginTop: "20px" }} id="save" onClick={this.submitHandler}>Save Changes</button>
                                    </div>
                                    <div class="card" type="myprofile">
                                        <h4>SETTINGS</h4>
                                        <div>
                                            <h5>LANGUAGE</h5>
                                            <a class="drop-button" type="myprofile" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "375px" }}>
                                                Select Language
                                            <i class="fa fa-caret-down fa-1x">
                                                </i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right" type="myprofile" aria-labelledby="dropdownMenuLink" style={{ width: "375px" }}>
                                                {this.setLanguage()}
                                            </div>
                                        </div>
                                        <div>
                                            <h5>TYPE OF ACCOUNT</h5>
                                            <a class="drop-button" type="myprofile" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "375px" }}>
                                                Select Account Type
                                            <i class="fa fa-caret-down fa-1x">
                                                </i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right" type="myprofile" aria-labelledby="dropdownMenuLink" style={{ width: "375px" }}>
                                                {this.setAccountType()}
                                            </div>
                                        </div>
                                        <div>
                                            <h5>COUNTRY</h5>
                                            <a class="drop-button" type="myprofile" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "375px" }}>
                                                Select Country
                                            <i class="fa fa-caret-down fa-1x">
                                                </i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right" type="myprofile" aria-labelledby="dropdownMenuLink" style={{ width: "375px" }}>
                                                {this.setCountry()}
                                            </div>
                                        </div>
                                        <h6 style={{ marginTop: "50px" }}>Email Notifications</h6>
                                        <div class="toggle-container"><input class="toggle-switch" type="checkbox" id="Email" onChange={this.changeEmailNotifications} checked={this.state.email_notifications}/><label class="standard-label" for="Email"></label></div>
                                        <h6>Automatic Shipments</h6>
                                        <div class="toggle-container"><input class="toggle-switch" type="checkbox" id="Auto" onChange={this.changeAutomaticShipments} checked={this.state.automatic_shipments}/><label class="standard-label" for="Auto"></label></div>
                                        <h6>Share Data With Terrafarm</h6>
                                        <div class="toggle-container"><input class="toggle-switch" type="checkbox" id="Data" onChange={this.changeDataShare} checked={this.state.data_share}/><label class="standard-label" for="Data"></label></div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </body>
            </React.Fragment>
        );
    }
}

export default MyProfile;