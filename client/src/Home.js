import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-bootstrap';

import PostPreview from'./PostPreview.js';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      numberOfPostsToPreview:3,
      extendedNumberOfPostsToPreview: 99,
      posts: [],
      itsMe: true

    }
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts(){
    fetch('/posts/allPreviews',{
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
        var posts = obj.body;
        this.setState({posts:posts});
      }

    }).catch(function(error) {
        console.log(error);
    });


  }





  showMorePosts = () => {
    var extendedNumberOfPostsToPreview = this.state.extendedNumberOfPostsToPreview;
    this.setState({numberOfPostsToPreview:extendedNumberOfPostsToPreview});
  }

  selectPostPreview = (id) => {
    var post = this.getPostByID(id);


  }


  renderPostPreviews(){
    const posts = this.state.posts;
    const subset = posts.slice(0,this.state.numberOfPostsToPreview);

    const postComponents = subset.map((post) =>


      <div>
      <PostPreview  id = {post.id}
                    title = {post.title}
                    subTitle = {post.subTitle}
                    author = {"Posted by " + post.author}
                    isPrivate = {post.isPrivate}
                    selectPostPreview ={this.selectPostPreview}
      />
      <hr></hr>
      </div>
    );
    return postComponents;
  }

  renderNav(){
    if(this.state.itsMe){
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
                <li className="nav-item">
                  <LinkContainer to="/about">
                    <a className="nav-link">About</a>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/contact">
                    <a className="nav-link">Contact</a>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/create">
                    <a className="nav-link">Create</a>
                  </LinkContainer>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
    else{
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
                <li className="nav-item">
                  <LinkContainer to="/about">
                    <a className="nav-link">About</a>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/contact">
                    <a className="nav-link">Contact</a>
                  </LinkContainer>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }

  render() {
    console.dir(this.props);
    return (


  <div>

    {this.renderNav()}



  <header className="masthead" style={{"backgroundImage": "url('img/bgHome.jpeg')"}}>
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <h1>Lulu Eats</h1>
            <span className="subheading">Food and travel</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">


        {this.renderPostPreviews()}

        <div className="clearfix">
          <a className="btn btn-primary float-right" href = "javascript:;" onClick={this.showMorePosts} >Older Posts &rarr;</a>
        </div>
      </div>
    </div>
  </div>

  <hr></hr>


  <footer>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <ul className="list-inline text-center">
            <li className="list-inline-item">
              <a href="https://www.instagram.com/itsjustlulu_/">
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle fa-stack-2x"></i>
                  <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
          </ul>
          <p className="copyright text-muted">Copyright &copy; GWA 2018</p>
          <p className="copyright text-muted">Theme from Blackrock Digital</p>
        </div>
      </div>
    </div>
  </footer>
  </div>

      );
    }
  }

  export default Home;
