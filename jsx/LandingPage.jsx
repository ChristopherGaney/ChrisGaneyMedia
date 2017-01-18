"use strict" 

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var GoodArticles = require('./GoodArticles');
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;
var Actions = require('./actions');
var bindActionCreators = require('redux').bindActionCreators;
var connect = ReactRedux.connect;

 var LandingPage = React.createClass({
	
	componentDidMount() {
		window.scrollTo(0, 0);
	},
	
  render: function() {
  
	var unescaped = unescape(this.props.home_feature.feature.postbody.toString());
		
    return <div className="main_content">
				<div className="row">
					<div className="col-welcome welcome">
						<h2>Welcome to my blog where I discuss Javascript,
							Node, React, functional programming, and other
							things fun and cool
						</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-main">
						<div className="home_box">
							<div className="blogbox">
								<div className="date">
									<h5>{this.props.home_feature.feature.publishdate}</h5>
								</div>
								<h2>{this.props.home_feature.feature.blogname}</h2>
								<h3><span dangerouslySetInnerHTML={{__html: unescaped}} /></h3>
							</div>
						</div>
					</div>
					<div className="col-right">
						<ArticleList posts={this.props.posts} getArticle={this.props.actions.getArticle} name={'LandingPage'} />
						<GoodArticles goodArticles={this.props.goodArticles} setClicked={this.props.actions.setArticleClicked} name={'LandingPage'} />
					</div>
				</div>
			</div>
  }
})


var mapStateToProps = function(state) {
  return {
    posts: state.posts,
    goodArticles: state.goodArticles,
    home_feature: state.home_feature
  }
}

var mapDispatchToProps = function(dispatch) {
	return {actions: bindActionCreators(Actions, dispatch)}
}

LandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

module.exports = LandingPage;
