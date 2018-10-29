
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

let Parser = require('html-react-parser');




class Post extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: true,
      postObject: {},
      authorized: false
    }

  }

  componentDidMount(){
    this.authorize();
    this.populate();
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



  populate = () => {
    var id = this.props.match.params.id;

    fetch('/posts/'+id,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(r =>  r.json().then(data => ({res: r, body: data})))
    .then(obj => {
      if(!obj.res.ok) throw Error(obj.res.statusText);
      else{
        var postObject = obj.body;
        this.setState({postObject:postObject});
      }

    }).then(() => {
      this.setState({loading: false});
    })
    .catch(function(error) {
      console.log(error);
    });

    // TODO: VALIDATE EVERYWHERE
    // TODO: EDit post - dont do another server call, just pass info from here.
    // TODO: Server and client, refavtor and abstract. DRY.
  }

  reallyDeletePost = () => {
    var id = this.props.match.params.id;

    fetch('/posts/'+id,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(r =>  r.json().then(data => ({res: r, body: data})))
    .then(obj => {
      if(!obj.res.ok){
        alert("Something went wrong!");
        throw Error(obj.res.statusText);
      }
      else{
        this.props.history.push('/')
      }

    }).then(() => {
      this.setState({loading: false});
    })
    .catch(function(error) {
      console.log(error);
    });

  }

  getNiceDateTime(){
    var fromPost = this.state.postObject.date;
    var dateObject = new Date(Date.parse(fromPost));
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth();
    var day = dateObject.getDate();
    var dateReadable = day + "-" + month + "-" + year

    return dateReadable; 
  }


  renderControls(){
    if(this.state.authorized){
      return(
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="clearfix">
                <a className="btn btn-danger float-right" href = "javascript:;"  data-toggle="modal" data-target="#exampleModalCenter">Delete Post &rarr;</a>
                <LinkContainer to={"/edit/"+this.state.postObject.id}>
                  <a className="btn btn-warning float-right" href = "javascript:;" >  Edit Post &rarr;</a>
                </LinkContainer>

              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(
        <div></div>
      );
    }
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

  processBody = () => {
    let processedBody = this.state.postObject.body;

    return (Parser(processedBody));
  }

  render() {

    let niceDateTime = this.getNiceDateTime(this.state.postObject.date);





    if(this.state.loading){
      return(
        <h1>Post Not Found</h1>
      );
    }
    else{
      return (
        <div>
          <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Are you sure you want to delete this post?</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-footer">
                  <button onClick={this.reallyDeletePost} type="button" className="btn btn-secondary" data-dismiss="modal">delete</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>

          {this.renderNav()}
          <header className="masthead" style={{"background-image": "url(\'"+this.state.postObject.banner_image_url+"\')"/*"url('../img/bgPost1.jpg')"*/}}>
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="post-heading">
                    <h1>{this.state.postObject.title}</h1>
                    <h2 className="subheading">{this.state.postObject.subTitle}</h2>
                    <span className="meta">Posted by {this.state.postObject.author} on {niceDateTime} </span>
                  </div>
                </div>
              </div>
            </div>
          </header>


          <article>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">

                  <p>{this.processBody()}</p>

                </div>
              </div>
            </div>
          </article>

          {this.renderControls()}

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
}

export default Post;
