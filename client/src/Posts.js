
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';



class Posts extends Component {
  render() {
    return (
      <div>
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
                <LinkContainer to="/posts">
                  <a className="nav-link">Posts</a>
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

          <header className="masthead" style={{"background-image": "url('img/post-bg.jpg')"}}>
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <div className="post-heading">
                    <h1>Man must explore, and this is exploration at its greatest</h1>
                    <h2 className="subheading">Problems look mighty small from 150 miles up</h2>
                    <span className="meta">Posted by
                      <a href="#">Start Bootstrap</a>
                      on August 24, 2018</span>
                  </div>
                </div>
              </div>
            </div>
          </header>


          <article>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <p>"Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory."</p>

                  <p>"Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science."</p>

                  <p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>

                  <p>"A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her."</p>

                  <p>"For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us."</p>

                  <h2 className="section-heading">The Final Frontier</h2>

                  <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>

                  <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>

                  <blockquote className="blockquote">The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>

                  <p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>

                  <h2 className="section-heading">Reaching for the Stars</h2>

                  <p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.</p>

                  <a href="#">
                    <img className="img-fluid" src="img/post-sample-image.jpg" alt=""></img>
                  </a>
                  <span className="caption text-muted">To go places and do things that have never been done before – that’s what living is all about.</span>

                  <p>Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.</p>

                  <p>As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.</p>

                  <p>Placeholder text by
                    <a href="http://spaceipsum.com/">Space Ipsum</a>. Photographs by
                    <a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>.</p>
                </div>
              </div>
            </div>
          </article>

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

export default Posts;
