import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import './App.css';

import Home from'./Home.js';
import About from'./About.js';
import Post from'./Post.js';
import Contact from './Contact.js';
import Login from './Login.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/post/:postId" component={Post}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/login" component={Login}/>

      </div>
    );
  }
}



export default App;
