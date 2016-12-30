"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var marked = require('marked');
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;

 var LandingPage = React.createClass({
	
	talkToServer: function(dats) {
		console.log(dats.id);
		axios.post(dats.toPage, {id: dats.id})
				  .then(function (response) {
					if(response.data.message === 'yes') {
						console.log(this.props.history);
						 this.props.loadArticle({feature: response.data.feature, url: response.data.url});
						 browserHistory.push(response.data.url);
						}
					else {
						console.log(response.data.message);
						}
				  }.bind( this ))
				  .catch(function (error) {
					console.log(error);
				  });
	},
	getArticle: function(id) {
		this.talkToServer({ toPage: '/articles', id: id });
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
						<h3>{this.props.feature.postbody}</h3>
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
    loadArticle: function(data) {
      dispatch({
        type: 'LOAD_ARTICLE',
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
