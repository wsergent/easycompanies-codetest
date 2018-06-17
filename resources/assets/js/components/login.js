import React, { Component } from 'react';
import Nav from './navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: ''
        };
    }

    componentDidMount(){
        this.refs.email.focus();
    }

    onSubmit(e){
        e.preventDefault();
        const {email , password} = this.state;
        axios.post('api/login', {
            email, 
            password
        })
        .then(response => {
            sessionStorage.setItem('user_id', response.data.id);
            this.setState({err: false});
            this.props.history.push("2fa");
        })
        .catch(error => {
            this.refs.email.value="";
            this.refs.password.value="";
            this.setState({err: true});
        });
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        let error = this.state.err;
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials';
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger';
        return (
            <div >
                <Nav />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">Sign in</div>
                                <div className="panel-body">   
                                    <div className="col">
                                        {error !== undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>
                                    <form className="form-horizontal" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor="email" className="col control-label">E-Mail Address</label>
                                            <div className="col">
                                                <input id="email" type="email" ref="email" className="form-control" name="email"  onChange={this.onChange.bind(this)} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="col control-label">Password</label>
                                            <div className="col">
                                                <input id="password" type="password" ref="password" className="form-control" name="password"  onChange={this.onChange.bind(this)}  required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col">
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="remember" /> Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary">
                                                    Login
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

export default Login;
