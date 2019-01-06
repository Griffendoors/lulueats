
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


class NavBar extends Component {

  constructor(props){
    super(props);

  }

  render() {

    let createMenuItem = this.props.authorized === true ?
      <li className="nav-item">
        <LinkContainer to="/create">
          <a className="nav-link">Create</a>
        </LinkContainer>
      </li> :  null;

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
                {createMenuItem}
              </ul>
            </div>
          </div>
        </nav>


      </div>

    );
  }
}

export default NavBar;
