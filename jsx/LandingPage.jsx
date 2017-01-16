"use strict" 

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var GoodArticles = require('./GoodArticles');
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;

 var LandingPage = React.createClass({
	
	talkToServer: function(dats) {
		this.props.fetchChosenFeature({ message: 'loading...'});
		axios.post(dats.toPage, {id: dats.id})
				  .then(function (response) {
					if(response.data.message === 'yes') {
						console.log(response.data);
						 this.props.loadChosenFeature({feature: response.data.feature, message: 'loaded'});
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
		this.talkToServer({ toPage: url, id: id});
	},
	setClicked: function(id) {
		this.props.setArticleClicked({ _id: id });
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
						<ArticleList posts={this.props.posts} getArticle={this.getArticle} name={'LandingPage'} />
						<GoodArticles goodArticles={this.props.goodArticles} setClicked={this.setClicked} name={'LandingPage'} />
					</div>
				</div>
			</div>
  }
})

var mapStateToProps = function(state) {
	console.log(state);
  return {
    posts: state.posts,
    goodArticles: state.goodArticles,
    home_feature: state.home_feature
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
	fetchChosenFeature: function(data) {
      dispatch({
        type: 'FETCH_CHOSEN_FEATURE',
        data: data
      })
    },
    loadChosenFeature: function(data) {
    console.log('here ' + data);
      dispatch({
        type: 'LOAD_CHOSEN_FEATURE',
        data: data
      })
    },
    fetchFailure: function(data) {
      dispatch({
        type: 'FETCH_FAILURE',
        data: data
      })
    },
    setArticleClicked: function(data) {
		dispatch({
        type: 'SET_CLICKED',
        data: data
      })
     }
  }
}

var connect = ReactRedux.connect;

LandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)


module.exports = LandingPage;
