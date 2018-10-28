
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

var axios = require('axios');



class Create extends Component {

  constructor(props){
    super(props)
    this.state = {
      title: null,
      subtTitle: null,
      author: null,
      selectedFile: null,
      body: "",

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

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }



  createPostClicked = () => {

    if(this.state.selectedFile === null) {
      var r = window.confirm("Save post without banner image?");
      if (r !== true) return;
    }

    const formData = new FormData();

    if(this.state.selectedFile !== null){
      formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
      axios.post('/image/masthead', formData).then(response => {
        let banner_image_id = response.data.image_id;
        let banner_image_url = response.data.image_url;

        var postObject = {
          title: this.state.title,
          subTitle: this.state.subTitle,
          author: this.state.author,
          body: this.state.body,
          banner_image_url: banner_image_url
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


      });
    }
    else{

      var postObject = {
        title: this.state.title,
        subTitle: this.state.subTitle,
        author: this.state.author,
        body: this.state.body,
        banner_image_url: null
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


  }



  addType = (newType) => {
    if(newType === "sectionHeading"){
      let prefix = "<h2 className=\"section-heading\">";
      let suffix = "</h2>";
      let body = this.state.body;
      body = body + prefix + suffix;
      this.setState({body:body})
    }
    else if(newType === "p"){
      let prefix = "<p>";
      let suffix = "</p>";
      let body = this.state.body;
      body = body + prefix + suffix;
      this.setState({body:body})
    }
    else if(newType === "quote"){
      let prefix = "<blockquote className=\"blockquote\">";
      let suffix = "</blockquote>";
      let body = this.state.body;
      body = body + prefix + suffix;
      this.setState({body:body})
    }
    else if(newType === "imageCaption"){
      let prefix = "<span className=\"caption text-muted\">";
      let suffix = "</span>";
      let body = this.state.body;
      body = body + prefix + suffix;
      this.setState({body:body})
    }
    else if(newType === "lineBrea,"){
      let prefix = "<br>";
      let suffix = "</br>";
      let body = this.state.body;
      body = body + prefix + suffix;
      this.setState({body:body})
    }

  }




  addInlineImage = (event) => {
    let imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    axios.post('/image/inline', formData).then(response => {
      let image_url = response.data.image_url;

      alert("done")
      let prefix = "<img className=\"img-fluid\" src="+image_url+" alt=\"\">"
      let suffix = "</img>";
      let body = this.state.body;
      body = body + prefix + suffix;
      this.setState({body:body})

    });

  }





  renderActionBar = () => {


    return(
      <div>
      <div className="row">
      <div className="col-lg-12">
      <button type="button" className="btn btn-primary" onClick={() => this.addType("sectionHeading")}>Section Heading</button>
      <button type="button" className="btn btn-primary" onClick={() => this.addType("p")}>Body</button>
      <button type="button" className="btn btn-primary" onClick={() => this.addType("quote")}>Quote</button>
      <button type="button" className="btn btn-primary" onClick={() => this.addInlineImage()}>Image</button>
      <button type="button" className="btn btn-primary" onClick={() => this.addType("imageCaption")}>Image Caption</button>
      <button type="button" className="btn btn-primary" onClick={() => this.addType("BREAK")}>Line Break</button>
      <input type="file" onChange={this.addInlineImage}></input>

      </div>
      </div>
      </div>
    );
  }

  // TODO : INSERT AT CURSOR POSITION

  //TODO: CREATE  -  DONT LET CREATE WITHOUT ALL FIELDS,

  // TODO : MAKE ALL HACKY STYLING LOOK BETTER IE BUTTONS

  //TODO HASHROUTER BACK TO BROWSER ROUTER - BUT BR BREAKS STYLE PATHS - SOMETHING TO DO WITH THIS.pROPS.PUSH

  // TODO : IF CHANGE MIND ABOUT IMAGE, IMAGE HAS ALREADY BEEN UPLOADED (INLINE OR MASTHEAD)\

  // TODO: CONTACT ME SCRIPT

  //TODO : CHANGE BETWEEN HTML AND NICE FOR WHAT USER SEES

  // TODO: FEEDBACCK ON WAITING FOR INLINE UPLOAD AND POST CREATE


  // TODO: COMPLETE OPERATIONS AROUND IMAGES - CAN EDIT EDIT IMAGE. DELETE WILL REMOVE FROM CLOUD ETC

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




  render() {



    return (


      <div>

      <div className="container">
      <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">

      <input type="file" onChange={this.fileChangedHandler}></input>

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
      <textarea rows="14" className="form-control" placeholder="Body" id="body" required data-validation-required-message="Please enter post body."  value={this.state.body} onChange={this.handleBodyChange}></textarea>
      <p className="help-block text-danger"></p>
      {this.renderActionBar()}
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

export default Create;
