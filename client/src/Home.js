import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Home extends Component {
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

  <header className="masthead" style={{"backgroundImage": "url('img/home-bg-2.jpeg')"}}>
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <h1>Lulu Eats</h1>
            <span className="subheading">Food and travel</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">
        <div className="post-preview">
          <a href="post.html">
            <h2 className="post-title">
              Man must explore, and this is exploration at its greatest
            </h2>
            <h3 className="post-subtitle">
              Problems look mighty small from 150 miles up
            </h3>
          </a>
          <p className="post-meta">Posted by
            <a href="#">Start Bootstrap</a>
            on September 24, 2018</p>
        </div>
        <hr></hr>
        <div className="post-preview">
          <a href="post.html">
            <h2 className="post-title">
              "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine."
            </h2>
          </a>
          <p className="post-meta">Posted by
            <a href="#">Start Bootstrap</a>
            on September 18, 2018</p>
        </div>
        <hr></hr>
        <div className="post-preview">
          <a href="post.html">
            <h2 className="post-title">
              Science has not yet mastered prophecy
            </h2>
            <h3 className="post-subtitle">
              We predict too much for the next year and yet far too little for the next ten.
            </h3>
          </a>
          <p className="post-meta">Posted by
            <a href="#">Start Bootstrap</a>
            on August 24, 2018</p>
        </div>
        <hr></hr>
        <div className="post-preview">
          <a href="post.html">
            <h2 className="post-title">
              Failure is not an option
            </h2>
            <h3 className="post-subtitle">
              Many say exploration is part of our destiny, but it’s actually our duty to future generations.
            </h3>
          </a>
          <p className="post-meta">Posted by
            <a href="#">Start Bootstrap</a>
            on July 8, 2018</p>
        </div>
        <hr></hr>

        <div className="clearfix">
          <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
        </div>
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

  export default Home;
