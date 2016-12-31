"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var marked = require('marked');
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;

 var LandingPage = React.createClass({
	
	talkToServer: function(dats) {
		this.props.fetchArticle({ message: 'loading...'});
		axios.post(dats.toPage, {id: dats.id, blogname: dats.blogname})
				  .then(function (response) {
					if(response.data.message === 'yes') {
						 this.props.loadArticle({feature: response.data.feature, url: response.data.url});
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
	getArticle: function(id,name) {
		var blogname = name.trim().split(' ').join('-');
		var url = '/articles/' + blogname + '/' + id;
		this.talkToServer({ toPage: url, id: id, blogname: name});
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
						<h2>{this.props.feature.blogname}</h2>
						<h3>{this.props.feature.postbody}</h3>
					</div>
				</div>
				<div className="col-right">
					<ArticleList posts={this.props.posts} blogId={this.props.feature.postid} getArticle={this.getArticle} />
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
	fetchArticle: function(data) {
      dispatch({
        type: 'FETCH_ARTICLE',
        data: data
      })
    },
    loadArticle: function(data) {
      dispatch({
        type: 'LOAD_ARTICLE',
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

LandingPage = connect(
  LandingPageState,
  LandingPageDispatch
)(LandingPage)


module.exports = LandingPage;
