
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

var axios = require('axios');



class Edit extends Component {

  constructor(props){
    super(props)
    this.state = {
        id: this.props.match.params.id,
        title: null,
        subTitle: null,
        author: null,
        body: null,
        selectedFile: null,
        banner_image_url: null
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

  cancelClicked = () => {
    this.props.history.push('/home/');
  }



  updatePostClicked = () => {

    if(this.state.title === null){
      this.hideUploadModal();
      return alert("Please enter Post Title");
    }
    if(this.state.subTitle === null){
      this.hideUploadModal();
      return alert("Please enter Post Subtitle");
    }


    if(this.state.selectedFile === null && this.state.banner_image_url === null) {
      var r = window.confirm("Save post without banner image?");
      if (r !== true) return;
    }

    const formData = new FormData();

    if(this.state.selectedFile !== null && this.state.selectedFile !== undefined){
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

        var id = this.state.id;

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
              this.hideUploadModal();
            this.props.history.push('/post/'+obj.body.id);
          }

        }).catch(function(error) {
          console.log(error);
        });
  });
      }
      else {
        var postObject = {
          title: this.state.title,
          subTitle: this.state.subTitle,
          author: this.state.author,
          body: this.state.body,
          banner_image_url: this.state.banner_image_url
        };

        var id = this.state.id;

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
              this.hideUploadModal();
            this.props.history.push('/post/'+obj.body.id);
          }

        }).catch(function(error) {
          console.log(error);
        });


      }


    }



    componentDidMount = () => {

      var id = this.state.id;

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
          this.setState({
            title:obj.body.title,
            subTitle:obj.body.subTitle,
            author:obj.body.author,
            body:obj.body.body,
            banner_image_url:obj.body.banner_image_url,

          });
        }

      }).then(() => {
        this.setState({loading: false});
      })
      .catch(function(error) {
        console.log(error);
      });

    }


    hideCreateWaitModal = () => {
       let modal = document.getElementById("updateWaitModal").click();
    }

    hideUploadModal = () => {
       let modal = document.getElementById("uploadModal").click();
    }




      addType = (newType) => {
        let prefix, suffix;
        if(newType === "sectionHeading"){
          prefix = "<h2 className=\"section-heading\">";
          suffix = "</h2>";
        }
        else if(newType === "p"){
          prefix = "<p>";
          suffix = "</p>";
        }
        else if(newType === "quote"){
          prefix = "<blockquote className=\"blockquote\">";
          suffix = "</blockquote>";
        }
        else if(newType === "imageCaption"){
          prefix = "<span className=\"caption text-muted\">";
          suffix = "</span>";
        }
        else if(newType === "lineBreak"){
          prefix = "<br>";
          suffix = "</br>";
        }

        let body = this.state.body
        body = body + prefix + suffix;
        this.setState({body:body})

      }




      addInlineImage = (event) => {
        let imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile, imageFile.name);
        axios.post('/image/inline', formData).then(response => {
          let image_url = response.data.image_url;

          let prefix = "<img className=\"img-fluid\" src="+image_url+" alt=\"\">"
          let suffix = "</img>";
          let body = this.state.body;
          body = body + prefix + suffix;
          this.setState({body:body})
          this.hideUploadModal();

        });

      }





      renderActionBar = () => {

            let mainImageButtonType = "btn btn-success btn-file";
            if(this.state.selectedFile === null && this.state.banner_image_url === null) mainImageButtonType = "btn btn-secondary btn-file";


            return(
              <div>
                <div className="row">
                  <div className="col-lg-12">
                    <span class={mainImageButtonType}>  Main Image <input type="file" onChange={this.fileChangedHandler}></input></span>
                    <button type="button" className="btn btn-primary" onClick={() => this.addType("sectionHeading")}>Section Heading</button>
                <button type="button" className="btn btn-primary" onClick={() => this.addType("p")}>Body</button>
                <button type="button" className="btn btn-dark" onClick={() => this.addType("quote")}>Quote</button>
                <span class="btn btn-success btn-file"  data-toggle="modal" data-target="#uploadModal">  Inline Image <input type="file" onChange={this.addInlineImage}></input></span>
                <button type="button" className="btn btn-info" onClick={() => this.addType("imageCaption")}>Image Caption</button>
                <button type="button" className="btn btn-warning" onClick={() => this.addType("lineBreak")}>Line Break</button>
                <button type = "button" className="btn btn-danger" onClick={this.cancelClicked}>Cancel</button>
                <button type = "button" className="btn btn-danger"  data-toggle="modal" data-target="#updateWaitModal"  onClick={this.updatePostClicked}>Edit Post</button>
              </div>
            </div>
          </div>
        );
      }

    render() {
      return (
        <div>

          <div className="modal fade" id="updateWaitModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Updating Post . . .</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Uploading image . . .</h5>
                </div>
              </div>
            </div>
          </div>

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
                      <label>Subtitle</label>
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
