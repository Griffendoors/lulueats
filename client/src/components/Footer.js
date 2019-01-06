
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


class Footer extends Component {

  constructor(props){
    super(props);

  }

  render() {
    return (
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

    );
  }
}

export default Footer;
