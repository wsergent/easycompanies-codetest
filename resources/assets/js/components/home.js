import React, { Component } from 'react';
import Nav from './navbar';

class Home extends Component {

    constructor(props){
        super(props);
        if(sessionStorage.getItem('Auth') !== "true"){
            this.props.history.push("login");
        }
    }

    render() {
        let user = JSON.parse(sessionStorage.getItem('User'));
        var userData = Object.keys(user).map(function (key) { return user[key]; });
        var t = userData[4].split(/[- :]/);
        var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

        return (
            <div> 
                <Nav link="Logout" />       
                <div className="container text-center title">
                    <h1>Secure Area</h1>
                    <h3>Logged In User Details</h3>
                    <p>
                        <b>Name:</b> {userData[1]}<br />
                        <b>Email:</b> {userData[2]}<br />
                        <b>Last Login:</b> {d.toLocaleString('en-AU')}
                    </p>
                </div>
            </div>
        );
    }
};

export default Home;
