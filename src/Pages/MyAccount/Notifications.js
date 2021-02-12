import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Navbar, Nav, Jumbotron } from 'react-bootstrap';
import "./Notifications.css"
import $ from 'jquery'
import { Dropdown, DropdownButton, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import DashboardNavbars from "../../Pages/MyAccount/DashboardNavbars.js"
import 'bootstrap/dist/css/bootstrap.min.css';

class Notification extends React.Component {
    state = {
        notification_list: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchNotifications();
    }

    fetchNotifications() {
        const customer_id = this.context.customer_id;
        const requestBody = {
            query: `
                query {
                  notifications(customer_id: "${customer_id}") {
                    notification_id
                    notification_type
                    notification_message
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
                    notification_list: resData.data.notifications
                });
                this.state.notification_list = resData.data.notifications;
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteNotification = (index) => {
        const customer_id = this.context.customer_id;
        const token = this.context.token;
        const notification_id = this.state.notification_list[index].notification_id;
        const requestBody = {
            query: `
                mutation {
                  deleteNotification(customer_id: "${customer_id}", notification_id: "${notification_id}") {
                    notification_id
                    notification_type
                    notification_message
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
                this.fetchNotifications();
            })
            .catch(err => {
                console.log(err);
            });
    }

    loadNotifications = () => {
        var i;
        var notifications = [];
        for (i = 0; i < this.state.notification_list.length; i++) {
            var color;
            if (this.state.notification_list[i].notification_type === "info") {
                color = "black"
            }
            else if (this.state.notification_list[i].notification_type === "success" || this.state.notification_list[i].notification_type === "warning") {
                color = "white"
            }
            const index = i;
            notifications[i] = (
                <div class="notification" type={this.state.notification_list[i].notification_type}>
                    <h1 class="notification-text" type={color}>{this.state.notification_list[i].notification_message}
                        <button class="notification-close">
                            <i class="fa fa-times icon fa-s" style={{ color: {color} }} onClick={() => {this.deleteNotification(index)}}></i>
                        </button>
                    </h1>
                </div>
            );
        }
        return notifications;
    }

    render () {
        return (
            <html>
                <head>
                </head>
                <body class="notification-body">
                    <div class="grid-container">
                        <DashboardNavbars />
                        <main class="main" type="notifications">
                            <div class="main-cards" type="notifications">
                                <div class="card" type="notifications">
                                    <h1>NOTIFICATIONS</h1>
                                    {this.loadNotifications()}
                                </div>
                            </div>
                        </main>
                    </div>
                </body>
            </html>
        );
    }
}

export default Notification;