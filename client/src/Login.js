
import React, { Component } from 'react';
import { Route,withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router';





class Contact extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: null,
      password: null,
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

    if (!email || !password){
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
                <LinkContainer to="/contact">
                  <a className="nav-link">Contact</a>
                </LinkContainer>
              </li>

            </ul>
          </div>
        </div>
      </nav>

          <header className="masthead" style={{"background-image": "url('img/bgContact.jpg')"}}>
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="page-heading">
                  </div>
                </div>
              </div>
            </div>
          </header>


          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <form name="sentMessage" id="contactForm" noValidate>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Email Address</label>
                      <input type="email" className="form-control" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address." value={this.state.email} onChange={this.handleEmailChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group col-xs-12 floating-label-form-group controls">
                      <label>Password</label>
                      <input type="tel" className="form-control" placeholder="Password" id="password" required data-validation-required-message="Please enter your password." value={this.state.password} onChange={this.handlePasswordChange}></input>
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
                  <p className="copyright text-muted">Copyright &copy; GWA 2018</p>
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
