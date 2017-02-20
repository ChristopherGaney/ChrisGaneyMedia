"use strict";

var React = require('react');
var ReactRedux = require('react-redux');

module.exports = React.createClass({
	displayName: 'exports',

	onChoose: function onChoose(id) {
		this.props.setClicked({ id: id });
	},
	render: function render() {

		var name = this.props.name === 'LandingPage' ? 'good_articles' : 'bottom_good_articles';

		console.log(this.props.goodArticles);
		var articleNodes = this.props.goodArticles.map(function (article) {
			return React.createElement(Article, { articleUrl: article.articleUrl, articleTitle: article.articleTitle, articleAuthor: article.articleAuthor, clicked: article.clicked, key: article._id, id: article._id, onChoose: this.onChoose.bind(this, article._id) });
		}, this);
		return React.createElement(
			'div',
			{ className: 'sidebar' },
			React.createElement(
				'div',
				{ className: name },
				React.createElement(
					'h3',
					null,
					'Good Articles'
				)
			),
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

		var name = this.props.clicked ? 'hasclicked' : '';

		return React.createElement(
			'a',
			{ className: name, href: this.props.articleUrl, target: '_blank', onClick: this.props.onChoose },
			React.createElement(
				'h4',
				null,
				this.props.articleTitle
			),
			React.createElement(
				'h5',
				null,
				this.props.articleAuthor
			)
		);
	}
});
