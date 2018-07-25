import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
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


class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      loginObject: {
        status: true,
        token: null
      }

    }
  }

  attemptLogin = (emailAddress,password) => {
    fetch('/authetication/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        emailAddress : emailAddress,
        password: password
      }
    })
    .then(res => res.json())
    .then(loginObject => this.setState({loginObject}))
  }


  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/post/:id" component={Post}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/login" component={Login}/>
        <Route path="/create" component={Create}/>
        <Route path="/edit/:id" component={Edit}/>

      </div>
    );
  }
}



export default App;
