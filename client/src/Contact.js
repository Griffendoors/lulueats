
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';





class Contact extends Component {
  render() {
    return (
      <div>

      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand" >Lulu Caitcheon</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <LinkContainer to="/">
                <a className="nav-link">Home</a>
              </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to="/about">
                  <a className="nav-link">About</a>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to="/posts">
                  <a className="nav-link">Posts</a>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to="/contact">
                  <a className="nav-link">Contact</a>
                </LinkContainer>
              </li>
            </ul>
          </div>
        </div>
      </nav>

          <header className="masthead" style={{"background-image": "url('img/contact-bg.jpg')"}}>
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="page-heading">
                    <h1>Contact Me</h1>
                    <span className="subheading">Have questions? I have answers.</span>
                  </div>
                </div>
              </div>
            </div>
          </header>


          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
                <form name="sentMessage" id="contactForm" novalidate>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Name</label>
                      <input type="text" className="form-control" placeholder="Name" id="name" required data-validation-required-message="Please enter your name."></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Email Address</label>
                      <input type="email" className="form-control" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address."></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group col-xs-12 floating-label-form-group controls">
                      <label>Phone Number</label>
                      <input type="tel" className="form-control" placeholder="Phone Number" id="phone" required data-validation-required-message="Please enter your phone number."></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Message</label>
                      <textarea rows="5" className="form-control" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <br></br>
                  <div id="success"></div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" id="sendMessageButton">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <hr></hr>

          <footer>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <ul className="list-inline text-center">
                    <li className="list-inline-item">
                      <a href="https://www.instagram.com/itsjustlulu_/">
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">Copyright &copy; Griff Web Apps 2018</p>
                  <p className="copyright text-muted">Theme from Blackrock Digital</p>
                </div>
              </div>
            </div>
          </footer>
      </div>


    );
  }
}

export default Contact;
