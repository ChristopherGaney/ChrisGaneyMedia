'use strict';

var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link;
var App = require('./App');

var Index = React.createClass({
	displayName: 'Index',


	render: function render() {
		return React.createElement(
			'html',
			null,
			React.createElement(
				'head',
				null,
				React.createElement('meta', { charSet: 'utf-8' }),
				React.createElement(
					'title',
					null,
					'ChrisGaneyMedia'
				),
				React.createElement('link', { rel: 'stylesheet', href: 'css/style.css' }),
				React.createElement('script', { dangerouslySetInnerHTML: { __html: this.props.initialState } })
			),
			React.createElement(
				'body',
				null,
				React.createElement(
					'div',
					{ id: 'content' },
					React.createElement(
						'div',
						{ id: 'wrapper', className: 'container' },
						React.createElement(Header, null),
						this.props.children,
						React.createElement(Footer, null)
					)
				),
				React.createElement('script', { src: 'bundle.js' })
			)
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

var IndexState = function IndexState(state) {
	var stateJSON = JSON.stringify(state).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
	return {
		initialState: "window.__INITIAL_STATE__ = " + stateJSON
	};
};

Index = connect(IndexState)(Index);

module.exports = Index;
