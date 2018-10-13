
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


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

  renderNav(){
    if(this.state.authorized){
      return(
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
                <li className="nav-item">
                  <LinkContainer to="/create">
                    <a className="nav-link">Create</a>
                  </LinkContainer>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
    else{
      return(
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
      );
    }
  }

  render() {
    return (


  <div>

    {this.renderNav()}

          <header className="masthead" style={{"background-image": "url('img/bgAbout.jpg')"}}>
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="page-heading">
                    <h1>About Me</h1>
                    <span className="subheading">This is what I do.</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequuntur magnam, excepturi aliquid ex itaque esse est vero natus quae optio aperiam soluta voluptatibus corporis atque iste neque sit tempora!</p>
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

export default About;
