"use strict";

var React = require('react');
var ReactRedux = require('react-redux');
var marked = require('marked');
var axios = require('axios');
var LandingPage = require('./LandingPage');

var App = React.createClass({
	displayName: 'App',

	loadPageFromServer: function loadPageFromServer() {

		axios.post('/page').then(function (response) {
			if (response.data.message === 'yes') {
				console.log('Retrieved!');
				this.props.loadPage(response.data);
			} else {
				console.log(response.data.message);
			}
		}.bind(this)).catch(function (error) {
			console.log(error);
		});
	},
	componentDidMount: function componentDidMount() {
		this.loadPageFromServer();
	},
	componentWillMount: function componentWillMount() {
		console.log(this.props.children);
	},
	render: function render() {

		return React.createElement(
			'div',
			{ id: 'wrapper', className: 'container' },
			React.createElement(Header, null),
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
				{ className: 'row' },
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
						{ className: 'links' },
						React.createElement(
							'h5',
							null,
							'Privacy Policy'
						),
						React.createElement(
							'h5',
							null,
							'About Us'
						),
						React.createElement(
							'h5',
							null,
							'Contact'
						),
						React.createElement(
							'h5',
							null,
							'Site Map'
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
		data: state.data,
		feature: state.feature
	};
};

var AppDispatch = function AppDispatch(dispatch) {
	return {
		loadPage: function loadPage(data) {
			dispatch({
				type: 'loadPage',
				data: data
			});
		}
	};
};

var connect = ReactRedux.connect;

App = connect(AppState, AppDispatch)(App);

module.exports = App;
