
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';





class Edit extends Component {

  constructor(props){
    super(props)
    this.state = {
      postObject: {
        id: this.props.match.params.id,
        title: null,
        subTitle: null,
        author: null,
        body: null
      }
    }
  }

  handleTitleChange = (e) => {
    var postObject = this.state.postObject;
    postObject.title =  e.target.value;
    this.setState({postObject: postObject});
  }
  handleSubTitleChange = (e) => {
    var postObject = this.state.postObject;
    postObject.subTitle =  e.target.value;
    this.setState({postObject: postObject});
  }
  handleAuthorChange = (e) => {
    var postObject = this.state.postObject;
    postObject.author =  e.target.value;
    this.setState({postObject: postObject});
  }
  handleBodyChange = (e) => {
    var postObject = this.state.postObject;
    postObject.body =  e.target.value;
    this.setState({postObject: postObject});
  }

  updatePostClicked = () => {

    var id = this.state.postObject.id;

    fetch('/posts/'+id+'/edit',{
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"

      },
      body: JSON.stringify(this.state.postObject),

    })
  }

  componentDidMount = () => {

    var id = this.state.postObject.id;

    fetch('/posts/'+id,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(postObject => this.setState({postObject: postObject}))
    .then(() => {
      this.setState({loading: false});
    })

    // TODO: VALIDATE EVERYWHERE
    // TODO: NEED THIS TEXT AREA TO GROW WHEN 90% FULL*/
    // TODO: TIDY UP FORMS
    // TODO: FIELD NAMES SAME EVERYWHERE
    // TODO: Redirects after, create, edit, delete
    // TODO: GET RID OF POST OBJECT
    //
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
                      <input type="text" className="form-control" placeholder="Title" id="title" required data-validation-required-message="Please enter post title." value={this.state.postObject.title} onChange={this.handleTitleChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Author</label>
                      <input type="email" className="form-control" placeholder="Lulu Caitcheon" id="author" required data-validation-required-message="Please enter the author of this post." value={this.state.postObject.author} onChange={this.handleAuthorChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group col-xs-12 floating-label-form-group controls">
                      <label>Subtitle</label>
                      <input type="tel" className="form-control" placeholder="Subtitle" id="subtitle" required data-validation-required-message="Please enter a subtitle." value={this.state.postObject.subTitle} onChange={this.handleSubTitleChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Body</label>
                      <textarea rows="10" className="form-control" placeholder="Body" id="body" required data-validation-required-message="Please enter post body."  value={this.state.postObject.body} onChange={this.handleBodyChange}></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>


                  <br></br>
                  <div id="success"></div>
                  <div className="form-group">
                    <button type="button" className="btn btn-primary"  onClick={this.updatePostClicked} id="updatePostButton">Update</button>
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

export default Edit;
