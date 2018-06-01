import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import './App.css';

import Home from'./Home.js';
import About from'./About.js';
import Posts from'./Posts.js';
import Contact from './Contact.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/posts" component={Posts}/>
        <Route path="/contact" component={Contact}/>
      </div>
    );
  }
}

export default App;
