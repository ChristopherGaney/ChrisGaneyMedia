"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link;
var marked = require('marked');
var axios = require('axios');
var LandingPage = require('./LandingPage');
var browserHistory = require('react-router').browserHistory;

 var App = React.createClass({
	talkToServer: function(dats) {
		this.props.fetchArticle({ message: 'loading...'});
		axios.post(dats.toPage, { id: dats.id, blogname: dats.blogname })
				  .then(function (response) {
					if(response.data.message === 'yes') {
						 this.props.goHome({feature: response.data.feature, url: response.data.url});
						 browserHistory.push(response.data.url);
						}
					
					else {
						this.props.fetchFailure({ message: 'Failure Loading Page'});
						}
				  }.bind( this ))
				  .catch(function (error) {
					console.log(error);
				  });
	},
	getHomePage: function(id) {
		var id = this.props.posts[0]._id;
		var name = this.props.posts[0].blogname;
		this.talkToServer({ toPage: '/', id: id, blogname: name});
	},
  render: function() {
	
    return <div id="wrapper" className="wrapper">
					<Header getHomePage={this.getHomePage} />
					{this.props.children}
					<Footer />
			</div>
  }
})

var Header = React.createClass({
  render: function() {
    return <header>
				<div className="row header">
				   <div className="col-header">
						<div className="apptitle">
							<h1 >ChrisGaneyMedia</h1>
						</div>
					</div>
					<div className="col-nav">
						<button className="home_btn" onClick={this.props.getHomePage} >
							<p>Home</p>
						</button>
					</div>
				</div>
			</header>
  }
})

var Footer = React.createClass({
	
  render: function() {
    return <footer>
				<div className="row">
					<div className="col-footer">
						<div className="links_header">
							<h3>Some of My Work</h3>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-links">
						<div className="links_list">
							<a href='http://github.com/ChristopherGaney'><h5>github.com/ChristopherGaney</h5></a>
							<a href='http://www.mathmataz.com'><h5>www.mathmataz.com</h5></a>
							<a href='http://festusxcboosters.org'><h5>festusxcboosters.org</h5></a>
							<a href='http://saintegenevievehome.com'><h5>saintegenevievehome.com</h5></a>
							<a href='https://www.smashwords.com/books/view/488947'><h5>www.smashwords.com/</h5></a>
						</div>
					</div>
					<div className="col-links">
						<div className="links_list">
							<a href='http://www.linkedin.com'><h5>https://linkedin.com</h5></a>
							<a href='http://www.twitter.com'><h5>https://twitter.com</h5></a>
							<a href='http://www.facebook.com'><h5>https://facebook.com</h5></a>
							
						</div>
					</div>
				</div>
			</footer>
  }
})

var AppState = function(state) {
  return {
    message: state.message,
    posts: state.posts,
    feature: state.feature
  }
}

var AppDispatch = function(dispatch) {
  return {
    fetchArticle: function(data) {
      dispatch({
        type: 'FETCH_ARTICLE',
        data: data
      })
    },
    goHome: function(data) {
      dispatch({
        type: 'GO_HOME',
        data: data
      })
    },
    fetchFailure: function(data) {
      dispatch({
        type: 'FETCH_FAILURE',
        data: data
      })
    }
  }
}

var connect = ReactRedux.connect;

App = connect(
  AppState,
  AppDispatch
)(App)


module.exports = App;
