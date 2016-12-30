"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var marked = require('marked');
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;

 var Articles = React.createClass({
	
	talkToServer: function(dats) {
		console.log(dats.id);
		axios.post(dats.toPage, {id: dats.id})
				  .then(function (response) {
					if(response.data.message === 'yes') {
						console.log(response.data.feature);
						 this.props.loadArticle({feature: response.data.feature, url: response.data.url});
						 this.context.router.push(response.data.url);
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
				<div className="col-marg">
				</div>
				<div className="col-center">
					<div className="blogbox">
						<h2>{this.props.posts[0]['blogname']}</h2>
						<h3>{this.props.feature.postbody}</h3>
					</div>
					<div className="bottom_list">
						<ArticleList posts={this.props.posts} getArticle={this.getArticle} />
					</div>
				</div>
				<div className="col-marg">
				</div>
			</div>
	
  }
})

var ArticlesState = function(state) {
  return {
    message: state.message,
    posts: state.posts,
    feature: state.feature
  }
}

var ArticlesDispatch = function(dispatch) {
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

Articles = connect(
  ArticlesState,
  ArticlesDispatch
)(Articles)


module.exports = Articles;
