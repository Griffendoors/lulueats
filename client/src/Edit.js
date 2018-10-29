
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

var axios = require('axios');



class Edit extends Component {

  constructor(props){
    super(props)
    this.state = {
      postObject: {
        id: this.props.match.params.id,
        title: null,
        subTitle: null,
        author: null,
        body: null,
        selectedFile: null,
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

  fileChangedHandler = (event) => {
    var postObject = this.state.postObject;
    postObject.selectedFile =  event.target.files[0]
    this.setState({postObject: postObject})
  }

  cancelClicked = () => {
    this.props.history.push('/home/');
  }



  updatePostClicked = () => {

    if(this.state.postObject.title === null) return alert("Please enter Post Title");
    if(this.state.postObject.subTitle === null) return alert("Please enter Post Subtitle");


    if(this.state.postObject.selectedFile === null) {
      var r = window.confirm("Save post without banner image?");
      if (r !== true) return;
    }

    const formData = new FormData();

    if(this.state.postObject.selectedFile !== null && this.state.postObject.selectedFile !== undefined){
      console.log(this.state.postObject.selectedFile)
      formData.append('image', this.state.postObject.selectedFile, this.state.postObject.selectedFile.name);
      axios.post('/image/masthead', formData).then(response => {
        let banner_image_id = response.data.image_id;
        let banner_image_url = response.data.image_url;

        var postObject = {
          title: this.state.postObject.title,
          subTitle: this.state.postObject.subTitle,
          author: this.state.postObject.author,
          body: this.state.postObject.body,
          banner_image_url: banner_image_url
        };

        var id = this.state.postObject.id;

        fetch('/posts/'+id+'/edit',{
          method: "PUT",
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
      else {
        var postObject = {
          title: this.state.postObject.title,
          subTitle: this.state.postObject.ubTitle,
          author: this.state.postObject.author,
          body: this.state.postObject.body,
          banner_image_url: null
        };

        var id = this.state.postObject.id;

        fetch('/posts/'+id+'/edit',{
          method: "PUT",
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



    componentDidMount = () => {

      var id = this.state.postObject.id;

      fetch('/posts/'+id,{
        method: "GET",
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




      addType = (newType) => {
        if(newType === "sectionHeading"){
          let prefix = "<h2 className=\"section-heading\">";
          let suffix = "</h2>";
        }
        else if(newType === "p"){
          let prefix = "<p>";
          let suffix = "</p>";
        }
        else if(newType === "quote"){
          let prefix = "<blockquote className=\"blockquote\">";
          let suffix = "</blockquote>";
        }
        else if(newType === "imageCaption"){
          let prefix = "<span className=\"caption text-muted\">";
          let suffix = "</span>";
        }
        else if(newType === "lineBreak"){
          let prefix = "<br>";
          let suffix = "</br>";
        }

        let po = this.state.postObject
        let body = po.body;
        body = body + prefix + suffix;
        po.body = body;
        this.setState({postObject:po})

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
          let body = this.state.postObject.body;
          body = body + prefix + suffix;
          this.setState({body:body})

        });

      }





      renderActionBar = () => {

            let mainImageButtonType = "btn btn-success btn-file";
            if(this.state.postObject.selectedFile === null) mainImageButtonType = "btn btn-secondary btn-file";


            return(
              <div>
                <div className="row">
                  <div className="col-lg-12">
                    <span class={mainImageButtonType}>  Main Image <input type="file" onChange={this.fileChangedHandler}></input></span>
                    <button type="button" className="btn btn-primary" onClick={() => this.addType("sectionHeading")}>Section Heading</button>
                <button type="button" className="btn btn-primary" onClick={() => this.addType("p")}>Body</button>
                <button type="button" className="btn btn-dark" onClick={() => this.addType("quote")}>Quote</button>
                <span class="btn btn-success btn-file">  Inline Image <input type="file" onChange={this.addInlineImage}></input></span>
                <button type="button" className="btn btn-info" onClick={() => this.addType("imageCaption")}>Image Caption</button>
                <button type="button" className="btn btn-warning" onClick={() => this.addType("lineBreak")}>Line Break</button>
                <button type = "button" className="btn btn-danger" onClick={this.cancelClicked}>Cancel</button>
                <button type = "button" className="btn btn-danger" onClick={this.updatePostClicked}>Edit Post</button>
              </div>
            </div>
          </div>
        );
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
                      <textarea rows="8" className="form-control" placeholder="Body" id="body" required data-validation-required-message="Please enter post body."  value={this.state.postObject.body} onChange={this.handleBodyChange}></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>


                    {this.renderActionBar()}

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
