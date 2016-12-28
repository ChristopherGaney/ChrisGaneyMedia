"use strict";

var React = require('react');
var ReactRedux = require('react-redux');
var marked = require('marked');
var axios = require('axios');

var LandingPage = React.createClass({
		displayName: 'LandingPage',

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
				console.log(this.props.message);
		},
		render: function render() {
				return React.createElement(
						'div',
						{ className: 'main_content' },
						React.createElement(
								'div',
								{ className: 'welcome' },
								React.createElement(
										'h2',
										null,
										this.props.data[0]['blogname']
								),
								React.createElement(
										'h3',
										null,
										this.props.feature
								)
						)
				);
		}
});

var LandingPageState = function LandingPageState(state) {
		return {
				message: state.message,
				data: state.data,
				feature: state.feature
		};
};

var LandingPageDispatch = function LandingPageDispatch(dispatch) {
		return {
				loadPage: function loadPage(data) {
						dispatch({
								type: 'load_Page',
								data: data
						});
				}
		};
};

var connect = ReactRedux.connect;

LandingPage = connect(LandingPageState, LandingPageDispatch)(LandingPage);

module.exports = LandingPage;
