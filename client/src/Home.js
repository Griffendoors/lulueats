import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-bootstrap';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Header from './components/Header';
import PostPreview from'./PostPreview.js';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      numberOfPostsToPreview:3,
      extendedNumberOfPostsToPreview: 99,
      posts: [],
      authorized: false
    }

  }

  componentDidMount(){
    this.authorize();
    this.getPosts();
  }

  authorize = () => {
    let token = localStorage.getItem('token');
    if(token !== null) this.checkTokenIsGood(token);
  }


  checkTokenIsGood = (token) => {
    fetch('/authentication/checkToken',{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"

      },
      body: JSON.stringify({token}),
    }).then(r =>  r.json().then(data => ({res: r, body: data}))).then(obj => {
      if(!obj.res.ok) throw Error(obj.res.statusText);
      else this.setState({authorized:true});

    }).catch(function(error) {
      console.log(error);
    });
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
        if(obj.res.status === 401) console.log("Not logged in")
        else console.log("something went wrong");
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


  getNiceDateTime(fromPost){
    var dateObject = new Date(Date.parse(fromPost));
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    var dateReadable = day + "-" + month + "-" + year

    return dateReadable; 
  }



  renderPostPreviews(){
    const posts = this.state.posts;
    const subset = posts.slice(0,this.state.numberOfPostsToPreview);

    const postComponents = subset.map((post,index) =>


    <div>
      <PostPreview  key = {this.index}
        id = {post.id}
        title = {post.title}
        subTitle = {post.subTitle}
        author = {"Posted by " + post.author + " on " + this.getNiceDateTime(post.date)}
        isPrivate = {post.isPrivate}
        />
      <hr></hr>
    </div>
  );
  return postComponents;
}


renderShowMoreButton = () => {
  if(this.state.posts.length < 4) return null;
  else return <a className="btn btn-primary float-right" href = "javascript:;" onClick={this.showMorePosts} >Older Posts &rarr;</a>

}

render() {
  return (
    <div>

      <NavBar authorized = {this.state.authorized} />

      <Header bgImage = {'img/bgHome.jpeg'} h1 = {"Lulu Eats"} subheading = {"Food and Travel"} />

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">

            {this.renderPostPreviews()}

            <div className="clearfix">
              {this.renderShowMoreButton()}
            </div>
          </div>
        </div>
      </div>

      <hr></hr>

      <Footer/>

    </div>
  );
}

}

export default Home;
