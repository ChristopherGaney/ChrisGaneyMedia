"use strict";

var React = require('react');
var ReactRedux = require('react-redux');

module.exports = React.createClass({
	displayName: 'exports',


	onChoose: function onChoose(id, name) {
		console.log('choosen');
		this.props.getArticle(id, name);
	},
	render: function render() {

		var articleNodes = this.props.posts.map(function (article) {
			return React.createElement(Article, { blogname: article.blogname, key: article._id, id: article._id, onChoose: this.onChoose.bind(this, article._id, article.blogname) });
		}, this);
		return React.createElement(
			'div',
			{ className: 'sidebar' },
			React.createElement(
				'div',
				{ className: 'list' },
				articleNodes
			)
		);
	}
});

var Article = React.createClass({
	displayName: 'Article',


	render: function render() {
		return React.createElement(
			'div',
			{ className: 'article_name', onClick: this.props.onChoose },
			React.createElement(
				'h3',
				null,
				this.props.blogname
			)
		);
	}
});
