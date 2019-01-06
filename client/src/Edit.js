
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

var axios = require('axios');



class Edit extends Component {

  constructor(props){
    super(props)
    this.state = {
        id: this.props.match.params.id,
        title: "",
        subTitle: "",
        author: "",
        mainImageFile: "",
        body: "",
        inlineImages: [],
        loading: false,
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

  mainImageFileChangedHandler = (event) => {
    this.setState({mainImageFile: event.target.files[0]})
  }

  cancelClicked = () => {
    this.props.history.push('/home/');
  }

  unprocessBody = (body) => {
    let unprocessed = body;
    unprocessed = unprocessed.replace(/<h2 className=\"section-heading\">/g, "<heading>");
    unprocessed = unprocessed.replace(/<\/h2>/g, "<\/heading>");

    unprocessed = unprocessed.replace(/<p>/g, "<paragraph>");
    unprocessed = unprocessed.replace(/<\/p>/g, "</paragraph>");

    unprocessed = unprocessed.replace(/<blockquote className=\"blockquote\">/g, "<quote>");
    unprocessed = unprocessed.replace(/<\/blockquote>/g, "</quote>");

    unprocessed = unprocessed.replace(/<span className=\"caption text-muted\">/g, "<caption>");
    unprocessed = unprocessed.replace(/<\/span>/g, "</caption>");

    unprocessed = unprocessed.replace(/<br>/g, "<linebreak>");
    unprocessed = unprocessed.replace(/<\/br>/g, "</linebreak>");

    return unprocessed;
  }


    processBody = (body) => {
      let processed = body;
      processed = processed.replace(/<heading>/g, "<h2 className=\"section-heading\">");
      processed = processed.replace(/<\/heading>/g, "</h2>");

      processed = processed.replace(/<paragraph>/g, "<p>");
      processed = processed.replace(/<\/paragraph>/g, "</p>");

      processed = processed.replace(/<quote>/g, "<blockquote className=\"blockquote\">");
      processed = processed.replace(/<\/quote>/g, "</blockquote>");

      processed = processed.replace(/<caption>/g, "<span className=\"caption text-muted\">");
      processed = processed.replace(/<\/caption>/g, "</span>");

      processed = processed.replace(/<linebreak>/g, "<br>");
      processed = processed.replace(/<\/linebreak>/g, "</br>");


      return processed;
    }

    sendInlines = () => {
      return new Promise((resolve, reject) => {

        let uploaded = [];
        let removed = [];

        const uploaders = this.state.inlineImages.map(image => {
          if(!this.state.body.includes(image.name)){
            removed.push(image);
            return;
          }
          const formData = new FormData();
          formData.append('image', image, image.name);

          return axios.post('/image', formData, {
          }).then(response => {
            uploaded.push({image_url:response.data.image_url,name: image.name});
          })

        });

        axios.all(uploaders)
        .then(() => {
          this.setState({
            inlineImages: this.state.inlineImages.filter((e) => { return !removed.includes(e); })
          });
        })
        .then(() => {
          let updatedBody = this.state.body;

          uploaded.forEach((u)=>{

            var replace = "<image name=\""+u.name+"\">";
            var re = new RegExp(replace,"g");
            updatedBody = updatedBody.replace(re, "<img className=\"img-fluid\" src=\""+u.image_url+"\" alt=\"\"></img>");

          });

          this.setState({body:updatedBody});
        })
        .then(()=>{
          resolve();
        });
      });

    }

    createPostObject = () => {

      return new Promise((resolve, reject) => {
        let body = this.processBody(this.state.body);

        let postObject = {
          title: this.state.title,
          subTitle: this.state.subTitle,
          author: this.state.author,
          body: body,
          banner_image_url: ""
        };

        if(this.state.mainImageFile !== ""){
          const formData = new FormData();

          formData.append('image', this.state.mainImageFile, this.state.mainImageFile.name);

          axios.post('/image', formData).then(response => {
            console.log(response);
            postObject.banner_image_url = response.data.image_url;
            resolve(postObject);
          });
        }
        else resolve(postObject);
      });

    }



  updatePostClicked = () => {

    this.setState({loading: true})
    this.sendInlines()
    .then(() => {
      return this.createPostObject();
    })
    .then(postObject => {

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
            this.setState({loading: false})
            this.props.history.push('/post/'+obj.body.id);
          }

        }).catch(function(error) {
          console.log(error);
        });
  });




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
            body: this.unprocessBody(obj.body.body),
            mainImageFile:obj.body.banner_image_url,

          });
        }

      }).then(() => {
        this.setState({loading: false});
      })
      .catch(function(error) {
        console.log(error);
      });

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

        let images = this.state.inlineImages;

        let file = event.target.files[0];

        images.push(file);

        this.setState({
          inlineImages: images
        }, () => {
          let body = this.state.body;
          body = body + "<image name=\""+file.name+"\">";
          this.setState({body:body})
        });

      }





      renderActionBar = () => {


            let mainImageButtonType = "btn btn-success btn-file";
            if(this.state.mainImageFile === "") mainImageButtonType = "btn btn-secondary btn-file";


            return(
              <div>
                <div className="row">
                  <div className="col-lg-12">
                    <span className={mainImageButtonType}>  Main Image <input type="file" onChange={this.mainImageFileChangedHandler}></input></span>
                    <button type="button" className="btn btn-primary" onClick={() => this.addType("sectionHeading")}>Section Heading</button>
                <button type="button" className="btn btn-primary" onClick={() => this.addType("p")}>Paragraph</button>
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
      if(this.state.loading) return(
        <div> Loading . . .</div>
      );
      return (

        <div>



          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">


                <form name="sentMessage" id="contactForm" noValidate>

                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Title</label>
                      <input type="text" className="form-control" placeholder="Title" id="title" value={this.state.title} onChange={this.handleTitleChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Author</label>
                      <input type="email" className="form-control" placeholder="Lulu Caitcheon" id="author" value={this.state.author} onChange={this.handleAuthorChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group col-xs-12 floating-label-form-group controls">
                      <label>SubTitle</label>
                      <input type="tel" className="form-control" placeholder="Subtitle" id="subtitle" value={this.state.subTitle} onChange={this.handleSubTitleChange}></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Body</label>
                      <textarea rows="14" className="form-control" placeholder="Body" id="body" value={this.state.body} onChange={this.handleBodyChange}></textarea>
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
