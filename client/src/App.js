import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, HashRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import './App.css';

import Home from'./Home.js';
import About from'./About.js';
import Post from'./Post.js';
import Contact from './Contact.js';
import Create from './Create.js';
import Edit from './Edit.js';
import Login from './Login.js';
import Logout from './Logout.js';



class App extends Component {


  constructor(props) {
      super(props);
      this.state = {
      }
  }


  render() {

    return (
    //  <HashRouter>
        <Switch>
        <Route path="/" exact component = {Home}/>
        <Route path="/about" component={About}/>
        <Route path="/post/:id" component={Post}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/create" component={Create}/>
        <Route path="/edit/:id" component={Edit}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component = {Logout}/>
        <Route component = {Home}/>
      </Switch>
  //  </HashRouter>

    );
  }
}

export default App;
