
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Header from './components/Header';



class Contact extends Component {

  constructor(props){
    super(props);
    this.state = {
      posts: [],
      authorized: false,
      nameInput: "",
      emailInput: "",
      messageInput: ""
    }

  }

  componentDidMount(){
    this.authorize();
  }

  authorize = () => {
    let token = localStorage.getItem('token');
    if(token !== null) this.checkTokenIsGood(token);
  }


  checkTokenIsGood = (token) => {
    fetch('/authentication/checkToken',{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"

      },
      body: JSON.stringify({token}),
    }).then(r =>  r.json().then(data => ({res: r, body: data}))).then(obj => {
      if(!obj.res.ok) throw Error(obj.res.statusText);
      else this.setState({authorized:true});

    }).catch(function(error) {
      console.log(error);
    });
  }

  validateMessage = (senderName,senderEmail,senderMessage) =>{
    if(senderName === null || senderEmail === null || senderMessage === null) return false;
    if(senderName === undefined || senderEmail === undefined || senderMessage === undefined) return false;
    if(senderName.length === 0 || senderEmail.length === 0 || senderMessage.length === 0 ) return false;


    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(senderEmail).toLowerCase());
  }

  sendMessage = () => {
    let name = this.state.nameInput;
    let email = this.state.emailInput;
    let message = this.state.messageInput;


    if(!this.validateMessage(name,email,message)) return alert("Please complete form")


    let postObject = {
      name: name,
      email: email,
      message: message
    }

    fetch('/contact/send',{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"

      },
      body: JSON.stringify(postObject),
    }).then(r =>  r.json().then(data => ({res: r, body: data})))
    .then(obj => {
      console.log(obj);
      if(!obj.res.ok){
        alert("Something went wrong!");
        throw Error(obj.res.statusText);
      }
      else{
        alert("Message delivered!");
        this.setState({nameInput: "", emailInput: "", messageInput: ""});

      }

    }).catch(function(error) {
      console.log(error);
    });





  }

  handleNameInputChange = (e) => {
    this.setState({nameInput: e.target.value});
  }

  handleEmailInputChange = (e) => {
    this.setState({emailInput: e.target.value});
  }

  handleMessageInputChange = (e) => {
    this.setState({messageInput: e.target.value});
  }


  render() {
    return (


      <div>

        <NavBar authorized = {this.state.authorized} />

        <Header bgImage = {'img/bgContact.jpg'} h1 = {"Contact Me"} subheading = {"I would love to hear from you"} />



        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
              <form name="sentMessage" id="contactForm" noValidate>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" id="name" value={this.state.nameInput} onChange={this.handleNameInputChange}></input>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Email Address" id="email"  value={this.state.emailInput} onChange={this.handleEmailInputChange}></input>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls">
                    <label>Message</label>
                    <textarea rows="5" className="form-control" placeholder="Message" id="message"  value={this.state.messageInput} onChange={this.handleMessageInputChange}></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <br></br>
                <div id="success"></div>
                <div className="form-group">
                  <button className="btn btn-primary" id="sendMessageButton" onClick = {this.sendMessage}>Send</button>
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
