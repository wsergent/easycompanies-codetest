import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './navbar';
import axios from 'axios';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email : '',
            password: '',
            password_confirmation: '',
            phone: ''
        };
    }

    onSubmit(e){
        e.preventDefault();
        const {name, email, password, password_confirmation, phone} = this.state;
        axios.post('api/register', {
            name,
            email,
            password,
            password_confirmation,
            phone
        })
        .then(response => {
            sessionStorage.setItem('Auth', true);
            sessionStorage.setItem('User', JSON.stringify(response.data));
            this.setState({err: false});
            this.setState({msg: 'Registered Successfully!'});
            this.props.history.push("home");
        })
        .catch(error => {
            var msg = "Please correct the following and try again.\n\n";
            let obj = error.response.data.errors;
            Object.keys(obj).forEach(function(key) {
                msg = msg + obj[key] + "\n";
            });            
            this.refs.password.value="";
            this.refs.confirm.value="";
            this.setState({err: true});
            this.setState({msg: msg});
        });
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        let error = this.state.err;
        let msg = this.state.msg;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger preline';
        return (   
            <div>   
                <Nav />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">Register</div>
                                <div className="panel-body">
                                    <div className="col">
                                        {error !== undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>
                                    <form className="form-horizontal" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor="name" className="col control-label">Name</label>
                                            <div className="col">
                                                <input id="name" type="text" className="form-control" ref="name" name="name" onChange={this.onChange.bind(this)} required autoFocus />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="col control-label">E-Mail Address</label>
                                            <div className="col">
                                                <input id="email" type="email" className="form-control" ref="email" name="email" onChange={this.onChange.bind(this)} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="col control-label">Password</label>
                                            <div className="col">
                                                <input id="password" type="password" className="form-control"  ref="password" name="password" onChange={this.onChange.bind(this)} required/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password-confirm" className="col control-label">Confirm Password</label>
                                            <div className="col">
                                                <input id="password-confirm" type="password" className="form-control" ref="confirm" name="password_confirmation" onChange={this.onChange.bind(this)} required/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone" className="col control-label">Phone Number</label>
                                            <div className="col">
                                                <input id="phone" type="text" className="form-control" ref="phone" name="phone" onChange={this.onChange.bind(this)} required/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

export default Register;
