
import React, { Component } from 'react';
import { Route,withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router';


import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Header from './components/Header';


class Contact extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      redirect: false

    }

  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  loginClicked = () => {

    let email =  this.state.email;
    let password = this.state.password;

    if (email === "" || password === ""){
      alert("Please enter email and password");
      return;
    }

    var credentialsObject = {
      email: this.state.email,
      password: this.state.password,
    };


    fetch('/authentication/login',{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"

      },
      body: JSON.stringify(credentialsObject),
    }).then(r =>  r.json().then(data => ({res: r, body: data})))
    .then(obj => {
      if(!obj.res.ok){
        if(obj.res.status === 403)  alert("Incorrect email or password");
        else throw Error(obj.res.statusText);
      }
      else{
        localStorage.setItem('token', obj.body.token);

        this.setState({redirect:true})
      }

    }).catch(function(error) {
      console.log(error);
    });


  }

  render(){
    if(this.state.redirect) {
      return <Redirect to='/'/>
    }
    return (
      <div>

        <NavBar authorized = {false}/>


        <Header bgImage = {'img/bgContact.jpg'} h1 = {""} subheading = {""} />


        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <form name="sentMessage" id="contactForm" noValidate>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Username</label>
                    <input type="email" className="form-control" placeholder="Username" id="email" required data-validation-required-message="Please enter your email address." value={this.state.email} onChange={this.handleEmailChange}></input>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group col-xs-12 floating-label-form-group controls">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" id="password" required data-validation-required-message="Please enter your password." value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <br></br>
                <div id="success"></div>
                <div className="form-group">
                  <button type = "button" className="btn btn-primary" onClick={this.loginClicked}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <hr></hr>

        <Footer/>
      </div>


    );

  }

}

export default Contact;
