
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

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
    var month = dateObject.getMonth() + 1;
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
          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Are you sure you want to delete this post?</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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

          <NavBar authorize = {this.state.authorized} />
          <header className="masthead" style={{"backgroundImage": "url(\'"+this.state.postObject.banner_image_url+"\')"}}>
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



          <Footer/>

        </div>
      );
    }
  }
}

export default Post;
