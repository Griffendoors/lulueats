
import React, { Component } from 'react';


import { LinkContainer } from 'react-router-bootstrap';


class PostPreview extends Component {

  onClick = (id) => {
    this.props.selectPostPreview(id)

  }



  render() {
    return (
      //<LinkContainer to={{pathname: "/post/" + this.props.id}}>
      <LinkContainer to={"/post/"+this.props.id}>
      <div className="post-preview" /*onClick = {() => this.onClick(this.props.id)}*/>
        <a href="javascript:;">
          <h2 className="post-title">
            {this.props.title}
          </h2>
          <h3 className="post-subtitle">
            {this.props.subTitle}
          </h3>
        </a>
        <p className="post-meta">
          Posted by {this.props.author}
        </p>
      </div>
      </LinkContainer>
    );
  }
}

export default PostPreview;
