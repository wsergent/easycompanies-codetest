/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router, Switch, Route} from 'react-router-dom';;
import Index from './components/index';
import Login from './components/login';
import TwoFA from './components/2fa';
import Register from './components/register';
import Home from './components/home';

ReactDOM.render(
    <Router>
        <Switch>
	    <Route exact path='/' component={Index}/>
	    <Route path='/login' component={Login}/>
	    <Route path='/2fa' component={TwoFA}/>
	    <Route path='/register' component={Register}/>
	    <Route path='/home' component={Home}/>
	    <Route path='/*' component={Index}/>
	</Switch>
    </Router>,
    document.getElementById('app')
);
