
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

var axios = require('axios');





class Contact extends Component {

  constructor(props){
    super(props)
    this.state = {
      title: null,
      subtTitle: null,
      author: null,
      body: null,
      selectedFile: null,

    }
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }
  handleSubTitleChange = (e) => {
    this.setState({subTitle: e.target.value});
  }
  handleAuthorChange = (e) => {
    this.setState({author: e.target.value});
  }
  handleBodyChange = (e) => {
    this.setState({body: e.target.value});
  }


  createPostClicked = () => {

    var postObject = {
      title: this.state.title,
      subTitle: this.state.subTitle,
      author: this.state.author,
      body: this.state.body,
    };


    fetch('/posts/create',{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"

      },
      body: JSON.stringify(postObject),
    }).then(r =>  r.json().then(data => ({res: r, body: data})))
      .then(obj => {
        if(!obj.res.ok){
          alert("Something went wrong!");
          throw Error(obj.res.statusText);
        }
        else{
          this.props.history.push('/post/'+obj.body.id);
        }

      }).catch(function(error) {
          console.log(error);
      });


  }


    // TODO : CLICK POSt PREVIEW; GRAB THE DATA BASED ON THAT ID;

    // TODO: ERROR ON BAD POST CREATION

    // TODO: Lock down client and server

    // TODO: DONT ALLOW BLANK FILEDS ?

    // TODO: VALIDATE EVERYWHERE

    // TODO: OK OR ERROR - CHECK EVERYWHERE - SERVER TOO - DIFFERENT ACTIONS DIFFERENT STATUSES - IF RESPONSE IS BAD, STAY HERE


    renderNav(){
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
                </ul>
              </div>
            </div>
          </nav>
        );

    }
    /*
    <form action='/image/masthead' method="post" enctype="multipart/form-data">
      <input type='file' name='image' />
    </form>
    */


    fileChangedHandler = (event) => {
      this.setState({selectedFile: event.target.files[0]})
      console.log("changed")
      console.dir(event.target.files[0])
    }
/*
    uploadHandler = () => {
      console.log("starting");
      const formData = new FormData()
      formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
      axios.post('/image/masthead', formData)
      console.log("done");
    }
*/
    uploadHandler = () => {
    //  axios.post('/image/masthead', this.state.selectedFile);
    const formData = new FormData()
    formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('/image/masthead', formData)
    }


    render() {
      return (


    <div>

          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">

                <input type="file" onChange={this.fileChangedHandler}></input>
                <button onClick={this.uploadHandler}>upload</button>

                <form name="sentMessage" id="contactForm" noValidate>

                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Title</label>
                      <input type="text" className="form-control" placeholder="Title" id="title" required data-validation-required-message="Please enter post title." value={this.state.title} onChange={this.handleTitleChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Author</label>
                      <input type="email" className="form-control" placeholder="Lulu Caitcheon" id="author" required data-validation-required-message="Please enter the author of this post." value={this.state.author} onChange={this.handleAuthorChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group col-xs-12 floating-label-form-group controls">
                      <label>SubTitle</label>
                      <input type="tel" className="form-control" placeholder="Subtitle" id="subtitle" required data-validation-required-message="Please enter a subtitle." value={this.state.subTitle} onChange={this.handleSubTitleChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Body</label>
                      <textarea rows="8" className="form-control" placeholder="Body" id="body" required data-validation-required-message="Please enter post body."  value={this.state.body} onChange={this.handleBodyChange}></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <br></br>
                  <div id="success"></div>
                  <div className="form-group">
                    <button type = "button" className="btn btn-primary" onClick={this.createPostClicked}>Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <hr></hr>

      </div>


    );
  }
}

export default Contact;
