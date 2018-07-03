
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';





class Contact extends Component {

  updatePostClicked = () => {

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
                      <input type="text" className="form-control" placeholder="Title" id="title" required data-validation-required-message="Please enter post title."></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Author</label>
                      <input type="email" className="form-control" placeholder="Lulu Caitcheon" id="author" required data-validation-required-message="Please enter the author of this post."></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group col-xs-12 floating-label-form-group controls">
                      <label>Subtitle</label>
                      <input type="tel" className="form-control" placeholder="Subtitle" id="subtitle" required data-validation-required-message="Please enter a subtitle."></input>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>Body</label>
                      <textarea rows="10" className="form-control" placeholder="Body" id="body" required data-validation-required-message="Please enter post body."></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
{/*TODO: NEED THIS TEXT AREA TO GROW WHEN 90% FULL*/}

                  <br></br>
                  <div id="success"></div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" id="updatePostButton">Update</button>
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
