
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Header from './components/Header';


class About extends Component {

  constructor(props){
    super(props);
    this.state = {
      numberOfPostsToPreview:1,
      posts: [],
      authorized: false
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


  render() {
    return (
      <div>
        <NavBar authorized = {this.state.authorized}/>

        <Header bgImage = {'img/bgAbout.jpg'} h1 = {"About Me"} subheading = {"This is what I do"} />

        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <p>My name is Lulu and I like Snacks, Brains and stuff.</p>
            </div>
          </div>
        </div>

        <hr></hr>

        <Footer/>
      </div>
    );
  }
}

export default About;
