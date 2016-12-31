"use strict";

var React = require('react');
var ReactRedux = require('react-redux');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var marked = require('marked');
var axios = require('axios');
var LandingPage = require('./LandingPage');
var browserHistory = require('react-router').browserHistory;

var App = React.createClass({
	displayName: 'App',

	talkToServer: function talkToServer(dats) {
		this.props.fetchArticle({ message: 'loading...' });
		axios.post(dats.toPage, { id: dats.id, blogname: dats.blogname }).then(function (response) {
			if (response.data.message === 'yes') {
				this.props.goHome({ feature: response.data.feature, url: response.data.url });
				browserHistory.push(response.data.url);
			} else {
				this.props.fetchFailure({ message: 'Failure Loading Page' });
			}
		}.bind(this)).catch(function (error) {
			console.log(error);
		});
	},
	getHomePage: function getHomePage(id) {
		var id = this.props.posts[0]._id;
		var name = this.props.posts[0].blogname;
		this.talkToServer({ toPage: '/', id: id, blogname: name });
	},
	render: function render() {

		return React.createElement(
			'div',
			{ id: 'wrapper', className: 'wrapper' },
			React.createElement(Header, { getHomePage: this.getHomePage }),
			this.props.children,
			React.createElement(Footer, null)
		);
	}
});

var Header = React.createClass({
	displayName: 'Header',

	render: function render() {
		return React.createElement(
			'header',
			null,
			React.createElement(
				'div',
				{ className: 'row header' },
				React.createElement(
					'div',
					{ className: 'col-header' },
					React.createElement(
						'div',
						{ className: 'apptitle' },
						React.createElement(
							'h1',
							null,
							'ChrisGaneyMedia'
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'col-nav' },
					React.createElement(
						'button',
						{ className: 'home_btn', onClick: this.props.getHomePage },
						React.createElement(
							'p',
							null,
							'Home'
						)
					)
				)
			)
		);
	}
});

var Footer = React.createClass({
	displayName: 'Footer',


	render: function render() {
		return React.createElement(
			'footer',
			null,
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-footer' },
					React.createElement(
						'div',
						{ className: 'links_header' },
						React.createElement(
							'h3',
							null,
							'Some of My Work'
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-links' },
					React.createElement(
						'div',
						{ className: 'links_list' },
						React.createElement(
							'a',
							{ href: 'http://github.com/ChristopherGaney' },
							React.createElement(
								'h5',
								null,
								'github.com/ChristopherGaney'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://www.mathmataz.com' },
							React.createElement(
								'h5',
								null,
								'www.mathmataz.com'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://festusxcboosters.org' },
							React.createElement(
								'h5',
								null,
								'festusxcboosters.org'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://saintegenevievehome.com' },
							React.createElement(
								'h5',
								null,
								'saintegenevievehome.com'
							)
						),
						React.createElement(
							'a',
							{ href: 'https://www.smashwords.com/books/view/488947' },
							React.createElement(
								'h5',
								null,
								'www.smashwords.com/'
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'col-links' },
					React.createElement(
						'div',
						{ className: 'links_list' },
						React.createElement(
							'a',
							{ href: 'http://www.linkedin.com' },
							React.createElement(
								'h5',
								null,
								'https://linkedin.com'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://www.twitter.com' },
							React.createElement(
								'h5',
								null,
								'https://twitter.com'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://www.facebook.com' },
							React.createElement(
								'h5',
								null,
								'https://facebook.com'
							)
						)
					)
				)
			)
		);
	}
});

var AppState = function AppState(state) {
	return {
		message: state.message,
		posts: state.posts,
		feature: state.feature
	};
};

var AppDispatch = function AppDispatch(dispatch) {
	return {
		fetchArticle: function fetchArticle(data) {
			dispatch({
				type: 'FETCH_ARTICLE',
				data: data
			});
		},
		goHome: function goHome(data) {
			dispatch({
				type: 'GO_HOME',
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

App = connect(AppState, AppDispatch)(App);

module.exports = App;
