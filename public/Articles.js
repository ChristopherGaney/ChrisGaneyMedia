"use strict";

var React = require('react');
var ReactRedux = require('react-redux');
var ArticleList = require('./ArticleList');
var marked = require('marked');
var axios = require('axios');
var browserHistory = require('react-router').browserHistory;

var Articles = React.createClass({
		displayName: 'Articles',


		talkToServer: function talkToServer(dats) {
				this.props.fetchArticle({ message: 'loading...' });
				axios.post(dats.toPage, { id: dats.id, blogname: dats.blogname }).then(function (response) {

						if (response.data.message === 'yes') {
								this.props.loadArticle({ feature: response.data.feature, url: response.data.url });
								browserHistory.push(response.data.url);
						} else {
								this.props.fetchFailure({ message: 'Failure Loading Page' });
						}
				}.bind(this)).catch(function (error) {
						console.log(error);
				});
		},

		getArticle: function getArticle(id, name) {
				var blogname = name.trim().split(' ').join('-');
				var url = '/articles/' + blogname + '/' + id;
				this.talkToServer({ toPage: url, id: id, blogname: name });
		},
		render: function render() {

				return React.createElement(
						'div',
						{ className: 'main_content' },
						React.createElement(
								'div',
								{ className: 'row' },
								React.createElement('div', { className: 'col-marg' }),
								React.createElement(
										'div',
										{ className: 'col-center' },
										React.createElement(
												'div',
												{ className: 'blogbox' },
												React.createElement(
														'h2',
														null,
														this.props.feature.blogname
												),
												React.createElement(
														'h3',
														null,
														this.props.feature.postbody
												)
										),
										React.createElement(
												'div',
												{ className: 'bottom_list' },
												React.createElement(ArticleList, { posts: this.props.posts, getArticle: this.getArticle })
										)
								),
								React.createElement('div', { className: 'col-marg' })
						)
				);
		}
});

var ArticlesState = function ArticlesState(state) {
		return {
				message: state.message,
				posts: state.posts,
				feature: state.feature
		};
};

var ArticlesDispatch = function ArticlesDispatch(dispatch) {
		return {
				fetchArticle: function fetchArticle(data) {
						dispatch({
								type: 'FETCH_ARTICLE',
								data: data
						});
				},
				loadArticle: function loadArticle(data) {
						dispatch({
								type: 'LOAD_ARTICLE',
								data: data
						});
				},
				fetchFailure: function fetchFailure(data) {
						dispatch({
								type: 'FETCH_FAILURE',
								data: data
						});
				}
		};
};

var connect = ReactRedux.connect;

Articles = connect(ArticlesState, ArticlesDispatch)(Articles);

module.exports = Articles;
