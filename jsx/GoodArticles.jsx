"use strict"

var React = require('react');
var ReactRedux = require('react-redux');

module.exports = React.createClass({
	onChoose: function(id) {
		console.log('choosen');
		this.props.setClicked(id);
	},
  render: function() {
		var name = this.props.name === 'LandingPage' ? 'good_articles' : 'bottom_good_articles';
		console.log(this.props.goodArticles);
		var articleNodes = this.props.goodArticles.map(function(article) {
			return (
				<Article articleUrl={article.articleUrl} articleTitle={article.articleTitle} articleAuthor={article.articleAuthor} clicked={article.clicked} key={article._id} id={article._id} onChoose={this.onChoose.bind(this,article._id)} />
			);
		},this);
    return <div className="sidebar">
				<div className={name}>
					<h3>Good Articles</h3>
				</div>
				<div className="list">
					{articleNodes}
				</div>
			</div>
  }
})


 var Article = React.createClass({
		
  render: function() {
    return <a href={this.props.articleUrl} target="_blank" onClick={this.props.onChoose} >
				<h4>{this.props.articleTitle}</h4>
				<h5>{this.props.articleAuthor}</h5>
			</a>
			
  }
})

