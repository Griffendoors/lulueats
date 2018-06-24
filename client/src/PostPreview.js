
import React, { Component } from 'react';


import { LinkContainer } from 'react-router-bootstrap';


class PostPreview extends Component {

  onClick = (postId) => {
    this.props.selectPostPreview(postId)

  }



  render() {
    return (
      //<LinkContainer to={{pathname: "/post/" + this.props.postId}}>
      <LinkContainer to={"/post/"+this.props.postId}>
      <div className="post-preview" /*onClick = {() => this.onClick(this.props.postId)}*/>
        <a href="javascript:;">
          <h2 className="post-title">
            {this.props.postTitle}
          </h2>
          <h3 className="post-subtitle">
            {this.props.postSubtitle}
          </h3>
        </a>
        <p className="post-meta">
          Posted by {this.props.postAuthor}
        </p>
      </div>
      </LinkContainer>
    );
  }
}

export default PostPreview;
