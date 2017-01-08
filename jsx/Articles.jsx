"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var GoodArticles = require('./GoodArticles');
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;

 var Articles = React.createClass({
	
	talkToServer: function(dats) {
		this.props.fetchArticle({ message: 'loading...'});
		axios.post(dats.toPage, { id: dats.id })
				  .then(function (response) {
					if(response.data.message === 'yes' && dats.toPage === '/') {
						 this.props.goHome({feature: response.data.feature, url: response.data.url});
						 browserHistory.push(response.data.url);
						}
					else if(response.data.message === 'yes') {
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
	getHomePage: function() {
		var id = this.props.posts[0]._id;
		this.talkToServer({ toPage: '/', id: id});
	},
	getArticle: function(id,name) {
		var blogname = name.trim().split(' ').join('-');
		var url = '/articles/' + blogname + '/' + id;
		this.talkToServer({ toPage: url, id: id});
	},
  render: function() {
			var unescaped = unescape(this.props.feature.postbody.toString());
    return <div className="main_content">
				<div className="row">
					<div className="col-nav">
						<button className="home_btn" onClick={this.getHomePage} >
							<p>home</p>
						</button>
					</div>
				</div>
				<div className="row">
					
					<div className="col-center">
						<div className="blogbox">
							<div className="date">
								<h5>{this.props.feature.publishdate}</h5>
							</div>
							<h2>{this.props.feature.blogname}</h2>
							<h3><span dangerouslySetInnerHTML={{__html: unescaped}} /></h3>
						</div>
						<div className="bottom_list">
							<ArticleList posts={this.props.posts} getArticle={this.getArticle} name={'Articles'} />
							<GoodArticles name={'Articles'} />
						</div>
					</div>
					
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

Articles = connect(
  ArticlesState,
  ArticlesDispatch
)(Articles)


module.exports = Articles;
