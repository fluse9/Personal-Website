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
        const notifications = ([
            {'notification_type': "success", notification_message: "You successfully planted a Genovese Basil crop!"},
            {'notification_type': "success", notification_message: "You successfully planted a Romaine Lettuce crop!"},
            {'notification_type': "info", notification_message: "Your account settings have been updated."},
            {'notification_type': "warning", notification_message: "Your water tank is running low."}
        ])
        this.state.notification_list = notifications;
        this.setState({
            notification_list: notifications
        });
    }

    deleteNotification = (index) => {
        var i;
        var notification_list = [];
        for (i = 0; i < this.state.notification_list.length; i++) {
            if (index != i) {
                notification_list.push(this.state.notification_list[i]);
            }
        }
        this.state.notification_list = notification_list;
        this.setState({
            notification_list: notification_list
        });
    }

    loadNotifications = () => {
        var i;
        var notifications = [];
        for (i = 0; i < this.state.notification_list.length; i++) {
            var color;
            const index = i;
            if (this.state.notification_list[i].notification_type === "info") {
                notifications[i] = (
                <div class="notification" type={this.state.notification_list[i].notification_type}>
                    <h1 class="notification-text" style={{ color: "black" }}>{this.state.notification_list[i].notification_message}
                        <button class="notification-close">
                            <i class="fa fa-times icon fa-s" style={{ color: "black" }} onClick={() => {this.deleteNotification(index)}}></i>
                        </button>
                    </h1>
                </div>
            );
            }
            else if (this.state.notification_list[i].notification_type === "success" || this.state.notification_list[i].notification_type === "warning") {
                notifications[i] = (
                <div class="notification" type={this.state.notification_list[i].notification_type}>
                    <h1 class="notification-text" style={{ color: "#ECECED" }}>{this.state.notification_list[i].notification_message}
                        <button class="notification-close">
                            <i class="fa fa-times icon fa-s" style={{ color: "#ECECED" }} onClick={() => {this.deleteNotification(index)}}></i>
                        </button>
                    </h1>
                </div>
            );
            }
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