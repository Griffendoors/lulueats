
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


class Header extends Component {

  constructor(props){
    super(props);

  }

  render() {

    return (
      <header className="masthead" style={{"backgroundImage": "url("+this.props.bgImage+")"}}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="page-heading">
                <h1>{this.props.h1}</h1>
                <span className="subheading">{this.props.subheading}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

    );
  }
}

export default Header;
