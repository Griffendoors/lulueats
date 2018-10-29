
import React, { Component } from 'react';


import { LinkContainer } from 'react-router-bootstrap';


class PostPreview extends Component {

  onClick = (id) => {
    this.props.selectPostPreview(id)

  }



  render() {
    return (
      <LinkContainer to={"/post/"+this.props.id}>
      <div className="post-preview">
        <a href="javascript:;">
          <h2 className="post-title">
            {this.props.title}
          </h2>
          <h3 className="post-subtitle">
            {this.props.subTitle}
          </h3>
        </a>
        <p className="post-meta">
           {this.props.author}
        </p>
      </div>
      </LinkContainer>
    );
  }
}

export default PostPreview;
