import React from 'react';
import "./DashboardNavbars.css"
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

class DashboardNavbars extends React.Component {
    state = {
        notification_list: [],
        customer_name: ''
    }

    componentDidMount() {
        this.fetchNotifications();
        this.fetchCustomer();
    }

    logout = () => {

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

    fetchCustomer() {
        const customer_id = this.context.customer_id;
        const token = this.context.token;
        console.log(customer_id)
        const requestBody = {
            query: `
                query {
                  customer(customer_id: "${customer_id}") {
                    customer_name
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
                    customer_name: resData.data.customer_name
                });
                this.state.customer_name = resData.data.customer.customer_name;
            })
            .catch(err => {
                console.log(err);
            });
    }

    loadNotifications = () => {
        var i;
        var notifications = [];
        for (i = 0; i < this.state.notification_list.length; i++) {
            const index = i;
            notifications[i] = (<li class="dropdown-item" type="notification" style={{ background: "transparent" }}><a href="/dashboard/notifications">{this.state.notification_list[i].notification_message}</a></li>);
        }

        return notifications
    }

    render () {
        return (
            <React.Fragment>
                <header class="DashboardHeader">
                    <ul style={{ listStyleType: "none" }}>
                        <a href="/dashboard" class="dash">
                            <li class="header-dashboard" style={{ position: "absolute" }}>
                                DASHBOARD
                            </li>
                        </a>
                        <ul class="header__list" style={{ listStyleType: "none" }}>
                            <div className="header-icons">
                                <div class="dropdown">
                                    <a class="drop-button" type="notification" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-bell icon fa-lg" style={{ position: "absolute", left: "84.5vw" }}></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink" id="notification-menu">
                                        {this.loadNotifications()}
                                    </div>
                                </div>
                                <div class="dropdown">
                                    <a class="drop-button" type="account" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-user icon fa-lg" style={{ position: "absolute" }}></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                        <li class="dropdown-item" type="account" style={{ background: "transparent" }}><a href="/dashboard/myprofile">My Profile</a></li>
                                        <li class="dropdown-item" type="account" style={{ background: "transparent" }}><a onClick={this.logout()} href="/signin">Log Out</a></li>
                                    </div>
                                </div>
                                <script type="text/javascript">
                                    $(document).ready(function () {
                                        $('.dropdown-toggle').dropdown()
                                    });
                                </script>
                            </div>
                        </ul>
                    </ul>
                </header>
                <aside class="sidenav">
                    <li class="sidenav__profile">{this.state.customer_name}</li>
                    <ul class="sidenav__list">
                        <a class="sidenav__list-item-link" href="/dashboard/status"><li class="sidenav__list-item">STATUS</li></a>
                        <a class="sidenav__list-item-link" href="/dashboard/feedback"><li class="sidenav__list-item">FEEDBACK</li></a>
                        <a class="sidenav__list-item-link" href="/dashboard/notifications"><li class="sidenav__list-item">NOTIFICATIONS</li></a>
                        <a class="sidenav__list-item-link" href="/dashboard/myprofile"><li class="sidenav__list-item">MY PROFILE</li></a>
                    </ul>
                </aside>
            </React.Fragment>
        );
    }
}

export default DashboardNavbars;