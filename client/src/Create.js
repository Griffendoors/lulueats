
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';





class Contact extends Component {

  constructor(props){
    super(props)
    this.state = {
      title: null,
      subtTitle: null,
      author: null,
      body: null,

    }
  }

  //TODO: CREATE DEDICATED OBJECT IN STATE FOR POST DATA

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
    })

    //TODO: CHECK POST SUCCESFULLY CREATED. DONT LOSE POST IF NOT SAVED! GIVE USER OPP TO CTRL C

    // TODO : FUCKED UP REFERSH / URL ENTER / REACT ROUTER CAUGHT BE EXPERSS THING?

    // TODO : CLICK POSt PREVIEW; GRAB THE DATA BASED ON THAT ID;

    //TODO : Redirect on post creation

    // TODO: ERROR ON BAD POST CREATION

    // TODO: Lock down client and server
  }


  render() {
    return (
      <div>

          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
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
                      <textarea rows="50" className="form-control" placeholder="Body" id="body" required data-validation-required-message="Please enter post body."  value={this.state.body} onChange={this.handleBodyChange}></textarea>
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
