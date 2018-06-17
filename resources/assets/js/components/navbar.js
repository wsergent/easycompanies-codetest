import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Nav extends Component {

    constructor(props) {
        super(props);
    }

    logout(e) {
        e.preventDefault();
        axios.post('api/logout')
            .then(response => {
                sessionStorage.setItem('Auth', false);
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClick(e) {
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        let links;
        if (sessionStorage.getItem('Auth') === "true") {
            links = <ul className="nav navbar-nav navbar-right">
                        <a className="navbar-brand" href="#" onClick={this.logout.bind(this)}>Log Out</a>  
                    </ul>;
        }else{
            links = <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>;
        }
        return (
            <nav className="navbar navbar-default navbar-laravel">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#" onClick={this.handleClick.bind(this)}>EasyCompanies Code Test V1.5</a>
                    </div>
                    {links}
                </div>
            </nav>
        );
    }
}

export default withRouter(Nav);
