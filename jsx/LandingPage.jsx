"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var marked = require('marked');
var axios = require('axios');

 var LandingPage = React.createClass({
	loadPageFromServer: function() {
		
		axios.post('/page')
				  .then(function (response) {
					if(response.data.message === 'yes') {
						console.log('Retrieved!');
						 this.props.loadPage(response.data);
						}
					else {
						console.log(response.data.message);
						}
				  }.bind( this ))
				  .catch(function (error) {
					console.log(error);
				  });
	},
	 componentDidMount: function() {
		//this.loadPageFromServer();
	},
	componentWillMount: function() {
		console.log(this.props.message);
	},
	getArticle: function(id) {
		
	},
  render: function() {
    return <div className="row main_content">
				<div className="col-main">
					<div className="welcome">
						<h2>Welcome to my blog where I discuss Javascript,
							Node, React, functional programming, and other
							things fun and cool
						</h2>
					</div>
					<div className="blogbox">
						<h2>{this.props.posts[0]['blogname']}</h2>
						<h3>{this.props.feature}</h3>
					</div>
				</div>
				<div className="col-right">
					<ArticleList posts={this.props.posts} getArticle={this.getArticle} />
				</div>
			</div>
  }
})

var LandingPageState = function(state) {
  return {
    message: state.message,
    posts: state.posts,
    feature: state.feature
  }
}

var LandingPageDispatch = function(dispatch) {
  return {
    loadPage: function(data) {
      dispatch({
        type: 'load_Page',
        data: data
      })
    }
  }
}

var connect = ReactRedux.connect;

LandingPage = connect(
  LandingPageState,
  LandingPageDispatch
)(LandingPage)


module.exports = LandingPage;
