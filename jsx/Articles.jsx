"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var GoodArticles = require('./GoodArticles');
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;

 var Articles = React.createClass({
	
	talkToServer: function(dats) {
		if(dats.toPage === '/') {
			this.props.fetchHomeFeature({ message: 'loading...'});
		}
		else {
			this.props.fetchChosenFeature({ message: 'loading...'});
		}
		
		axios.post(dats.toPage, { id: dats.id })
				  .then(function (response) {
					if(response.data.message === 'yes' && dats.toPage === '/') {
						 this.props.loadHomeFeature({feature: response.data.feature, message: ''});
						 browserHistory.push(response.data.url);
						}
					else if(response.data.message === 'yes') {
						 this.props.loadChosenFeature({feature: response.data.feature, message: ''});
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
	setClicked: function(id) {
		this.props.setArticleClicked({ _id: id });
	},
	componentDidUpdate() {
		window.scrollTo(0, 0);
	},
  render: function() {
			var unescaped = unescape(this.props.chosen_feature.feature.postbody.toString());
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
								<h5>{this.props.chosen_feature.feature.publishdate}</h5>
							</div>
							<h2>{this.props.chosen_feature.feature.blogname}</h2>
							<h3><span dangerouslySetInnerHTML={{__html: unescaped}} /></h3>
						</div>
						<div className="bottom_list">
							<ArticleList posts={this.props.posts} getArticle={this.getArticle} name={'Articles'} />
							<GoodArticles goodArticles={this.props.goodArticles} setClicked={this.setClicked} name={'Articles'} />
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
  return {
    fetchChosenFeature: function(data) {
      dispatch({
        type: 'FETCH_CHOSEN_FEATURE',
        data: data
      })
    },
     fetchHomeFeature: function(data) {
      dispatch({
        type: 'FETCH_HOME_FEATURE',
        data: data
      })
    },
    loadChosenFeature: function(data) {
      dispatch({
        type: 'LOAD_CHOSEN_FEATURE',
        data: data
      })
    },
    loadHomeFeature: function(data) {
      dispatch({
        type: 'LOAD_HOME_FEATURE',
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

Articles = connect(
   mapStateToProps,
  mapDispatchToProps
)(Articles)


module.exports = Articles;
