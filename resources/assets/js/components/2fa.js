import React, { Component } from 'react';
import Nav from './navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TwoFA extends Component {
    
    constructor(props){
        super(props);
        if(sessionStorage.getItem('user_id') === ''){
            this.props.history.push("login");
        }
        this.state = {
            twofa : '',
            user_id : sessionStorage.getItem('user_id')
        };
        sessionStorage.setItem('user_id','');
    }

    componentDidMount(){
        this.refs.twofa.focus();
    }

    onSubmit(e){
        e.preventDefault();
        const {twofa, user_id} = this.state;
        axios.post('api/2fa', {
            twofa,
            user_id
        })
        .then(response => {
            this.setState({err: false});
            sessionStorage.setItem('Auth', true);
            sessionStorage.setItem('User', JSON.stringify(response.data));
            this.props.history.push("home");
        })
        .catch(error => {
            this.refs.twofa.value="";
            this.refs.twofa.focus();
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
        let user_id = this.state.user_id;
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
                                            <label htmlFor="twofa" className="col control-label">Please Enter your 2FA Code.</label>
                                            <div className="col">
                                                <input id="twofa" type="text" ref="twofa" className="form-control" name="twofa"  onChange={this.onChange.bind(this)} required />
                                                <input id="user_id" type="hidden" ref="user_id" className="form-control" name="user_id" value={user_id} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary">
                                                    Continue
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

export default TwoFA;
