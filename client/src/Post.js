
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';



class Post extends Component {

 constructor(props){
   super(props)
   this.state = {
     loading: true,
     itsMe: true,
     postObject: {
       id: 99,
       title: "This is the title of a post",
       subtitle: "This is the subtitle of a post",
       author: "Ryan Griffin",
       date: "Today and now",
       body: "BLEP BLEP BLEP OBE TWO THREE HELL OTHERE RG"
     }

   }
 }

 editButtonPressed = () => {

 }

 deleteButtonPressed = () => {

 }

 componentWillMount = () => {
   var postId = 7;//this.props.postId;


 }

 componentDidMount = () => {
   this.setState({loading: false});
 }

 renderControls(){
   if(this.state.itsMe){
     return(
       <div className="container">
         <div className="row">
           <div className="col-lg-8 col-md-10 mx-auto">
             <div className="clearfix">
                            <LinkContainer to="/edit">
               <a className="btn btn-warning float-right" href = "javascript:;" /*onClick={this.showMorePosts}*/ >  Edit Post &rarr;</a>
                            </LinkContainer>
             </div>
             <hr></hr>
             <div className="clearfix">
               <a className="btn btn-danger float-right" href = "javascript:;"  data-toggle="modal" data-target="#exampleModalCenter">Delete Post &rarr;</a>
             </div>
         </div>
       </div>
     </div>
     );
   }
   else{
     return(
       <div></div>
     );
   }
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
   if(this.state.loading){
     return(
       <h1>Loading Lala</h1>
     );
   }
   else{


   return (


 <div>

 <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLongTitle">Are you sure you want to delete this post?</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">

       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">delete</button>
         <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
       </div>
     </div>
   </div>
 </div>

   {this.renderNav()}

          <header className="masthead" style={{"background-image": "url('../img/bgPost1.jpg')"}}>
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="post-heading">
                    <h1>{this.state.postObject.title}</h1>
                    <h2 className="subheading">{this.state.postObject.subTitle}</h2>
                    <span className="meta">Posted by {this.state.postObject.author} on {this.state.postObject.date} </span>
                  </div>
                </div>
              </div>
            </div>
          </header>


          <article>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">

                  <p>{this.state.postObject.body}</p>

                </div>
              </div>
            </div>
          </article>

                 {this.renderControls()}

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
                  <p className="copyright text-muted">Copyright &copy; Griff Web Apps 2018</p>
                  <p className="copyright text-muted">Theme from Blackrock Digital</p>
                </div>
              </div>
            </div>
          </footer>

      </div>
    );
  }
  }
}

export default Post;
