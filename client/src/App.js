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
import Logout from './Logout.js';






class App extends Component {


  constructor(props) {
      super(props);
      this.state = {
      //  token: null
      }
  }


/*
  setToken(token) {
    this.setState({token:token});
    //this.state.history.push('/');
  }

*/
/*
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
    .then(token => this.setState({token}))


    .then(r =>  r.json().then(data => ({res: r, body: data})))
    .then(obj => {
      if(!obj.res.ok){
        alert("Something went wrong!");
        throw Error(obj.res.statusText);
      }
      else{
        var postObject = obj.body;
        this.setState({postObject:postObject});
                  this.props.history.push('/post/'+obj.body.id);
      }

    }).then(() => {
        this.setState({loading: false});
      })
      .catch(function(error) {
         console.log(error);
    });

  }
*/

  render() {
/*
    const myLoginObject = (props) => {
        return (
          <Login
          //  setToken={this.setToken.bind(this)}
          />
        );
    }

    const myHomeObject = (props) => {
        return (
          <Home
            //token={this.state.token}
          />
        );
    }
*/

    return (
      <div className="App">
        <Route path="/" exact component = {Home}/>
        <Route path="/about" component={About}/>
        <Route path="/post/:id" component={Post}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/create" component={Create}/>
        <Route path="/edit/:id" component={Edit}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component = {Logout}/>

      </div>
    );
  }
}

export default App;
