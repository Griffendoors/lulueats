
import React, { Component } from 'react';
import { Route,withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router';


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


//TODO: DONT WORRY TOO MUCH HERE - CHANGING TO COOKIES


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

export default Logout;
