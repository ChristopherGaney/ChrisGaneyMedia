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

 var Articles = React.createClass({
 
	componentDidMount() {
		window.scrollTo(0, 0);
	},
	componentDidUpdate() {
		window.scrollTo(0, 0);
	},
	
  render: function() {
			var unescaped = unescape(this.props.chosen_feature.feature.postbody.toString());
    return <div className="main_content">
				<div className="row">
					<div className="col-nav">
						<button className="home_btn" onClick={this.props.actions.getHomePage} >
							<p>home</p>
						</button>
					</div>
				</div>
				<div className="row">
					
					<div className="col-center">
						<div className="blogbox">
							<div className="date">
								<h5>{this.props.chosen_feature.feature.publishdate}</h5>
							</div>
							<h2>{this.props.chosen_feature.feature.blogname}</h2>
							<h3><span dangerouslySetInnerHTML={{__html: unescaped}} /></h3>
						</div>
						<div className="bottom_list">
							<ArticleList posts={this.props.posts} getArticle={this.props.actions.getArticle} name={'Articles'} />
							<GoodArticles goodArticles={this.props.goodArticles} setClicked={this.props.actions.setArticleClicked} name={'Articles'} />
						</div>
					</div>
					
				</div>
			</div>
	
  }
})

var mapStateToProps = function(state) {
  return {
    posts: state.posts,
    goodArticles: state.goodArticles,
    chosen_feature: state.chosen_feature
  }
}

var mapDispatchToProps = function(dispatch) {
	return {actions: bindActionCreators(Actions, dispatch)}
}

Articles = connect(
   mapStateToProps,
  mapDispatchToProps
)(Articles)

module.exports = Articles;
