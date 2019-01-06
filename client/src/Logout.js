
import React, { Component } from 'react';
import { Route,withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router';


import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Header from './components/Header';

class Logout extends Component {

  constructor(props){
    super(props)
    this.state = {
      redirect: false

    }

  }



  componentDidMount(){
    let token = localStorage.getItem('token');
    if(token !== null) this.logout(token);
  }



  logout = (token) => {

    fetch('/authentication/logout',{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"

      },
      body: JSON.stringify({token}),
    }).then(r =>  r.json().then(data => ({res: r, body: data})))
    .then(obj => {
      console.dir(obj)
      if(!obj.res.ok) throw Error(obj.res.statusText);
      else{
        localStorage.setItem('token', null);
      }
      this.setState({redirect:true});

    }).catch(function(error) {
      console.log(error);
    });


  }

  render(){
    if(this.state.redirect) {
      return <Redirect to='/' token = "hello"/>
    }
    return (
      <div>

        <NavBar authorized = {false}/>


        <Header bgImage = {'img/bgContact.jpg'} h1 = {""} subheading = {""} />

        <hr></hr>
        <Footer/>
      </div>


    );

  }

}

export default Logout;
