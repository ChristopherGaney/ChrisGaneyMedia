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

var Articles = React.createClass({
	displayName: 'Articles',
	componentDidMount: function componentDidMount() {
		window.scrollTo(0, 0);
	},
	componentDidUpdate: function componentDidUpdate() {
		window.scrollTo(0, 0);
	},


	render: function render() {
		var unescaped = unescape(this.props.chosen_feature.feature.postbody.toString());
		return React.createElement(
			'div',
			{ className: 'main_content' },
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-nav' },
					React.createElement(
						'button',
						{ className: 'home_btn', onClick: this.props.actions.getHomePage },
						React.createElement(
							'p',
							null,
							'home'
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-center' },
					React.createElement(
						'div',
						{ className: 'blogbox' },
						React.createElement(
							'div',
							{ className: 'date' },
							React.createElement(
								'h5',
								null,
								this.props.chosen_feature.feature.publishdate
							)
						),
						React.createElement(
							'h2',
							null,
							this.props.chosen_feature.feature.blogname
						),
						React.createElement(
							'h3',
							null,
							React.createElement('span', { dangerouslySetInnerHTML: { __html: unescaped } })
						)
					),
					React.createElement(
						'div',
						{ className: 'bottom_list' },
						React.createElement(ArticleList, { posts: this.props.posts, getArticle: this.props.actions.getArticle, name: 'Articles' }),
						React.createElement(GoodArticles, { goodArticles: this.props.goodArticles, setClicked: this.props.actions.setArticleClicked, name: 'Articles' })
					)
				)
			)
		);
	}
});

var mapStateToProps = function mapStateToProps(state) {
	return {
		posts: state.posts,
		goodArticles: state.goodArticles,
		chosen_feature: state.chosen_feature
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(Actions, dispatch) };
};

Articles = connect(mapStateToProps, mapDispatchToProps)(Articles);

module.exports = Articles;
