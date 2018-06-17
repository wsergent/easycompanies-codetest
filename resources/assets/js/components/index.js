import React, { Component } from 'react';
import Nav from './navbar';

class Index extends Component {

    render() {
        return (
            <div> 
                <Nav />       
                <div className="container text-center title">
                    <h1>About EasyCompanies</h1>
                    <p>Lorem ipsum dolor sit amet, cu eum offendit copiosae concludaturque. Duo eu facilisi instructior theophrastus, stet saperet abhorreant vix id. Ea vim saepe vidisse liberavisse, ex nihil dicant dicunt cum. Ad per feugiat consectetuer, ex usu everti sensibus.</p>
                    <h3>Registration and Access</h3>
                    <p>Thanks for your interest. You can <a href="/register">Register</a> for access, or if you already have access, please <a href="/login">Sign In</a>.</p>
                </div>
            </div>
        );
    }

};

export default Index;
