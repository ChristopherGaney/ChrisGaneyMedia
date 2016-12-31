"use strict"

var React = require('react');
var ReactRedux = require('react-redux');

module.exports = React.createClass({
		
		onChoose: function(id,name) {
			console.log('choosen');
			this.props.getArticle(id,name);
		},
  render: function() {
		
		var articleNodes = this.props.posts.map(function(article) {
			return (
				<Article blogname={article.blogname} key={article._id} id={article._id} onChoose={this.onChoose.bind(this,article._id,article.blogname)} />
			);
		},this);
    return <div className="sidebar">
			   <div className="list">
					{articleNodes}
				</div>
			</div>
			
  }
})

 var Article = React.createClass({
		
  render: function() {
    return <div className="article_name" onClick={this.props.onChoose} >
			   <h3>{this.props.blogname}</h3>
			</div>
			
  }
})
