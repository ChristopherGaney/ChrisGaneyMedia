"use strict";

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
	displayName: 'LandingPage',
	componentDidMount: function componentDidMount() {
		window.scrollTo(0, 0);
	},


	render: function render() {

		var unescaped = unescape(this.props.home_feature.feature.postbody.toString());

		return React.createElement(
			'div',
			{ className: 'main_content' },
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-welcome welcome' },
					React.createElement(
						'h2',
						null,
						'Welcome to my blog where I discuss Javascript, Node, React, functional programming, and other things fun and cool'
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-main' },
					React.createElement(
						'div',
						{ className: 'home_box' },
						React.createElement(
							'div',
							{ className: 'blogbox' },
							React.createElement(
								'div',
								{ className: 'date' },
								React.createElement(
									'h5',
									null,
									this.props.home_feature.feature.publishdate
								)
							),
							React.createElement(
								'h2',
								null,
								this.props.home_feature.feature.blogname
							),
							React.createElement(
								'h3',
								null,
								React.createElement('span', { dangerouslySetInnerHTML: { __html: unescaped } })
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'col-right' },
					React.createElement(ArticleList, { posts: this.props.posts, getArticle: this.props.actions.getArticle, name: 'LandingPage' }),
					React.createElement(GoodArticles, { goodArticles: this.props.goodArticles, setClicked: this.props.actions.setArticleClicked, name: 'LandingPage' })
				)
			)
		);
	}
});

var mapStateToProps = function mapStateToProps(state) {
	return {
		posts: state.posts,
		goodArticles: state.goodArticles,
		home_feature: state.home_feature
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(Actions, dispatch) };
};

LandingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPage);

module.exports = LandingPage;
