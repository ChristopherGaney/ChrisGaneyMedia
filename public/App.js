"use strict";

var React = require('react');
var ReactRedux = require('react-redux');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var LandingPage = require('./LandingPage');

var App = React.createClass({
	displayName: 'App',


	render: function render() {

		return React.createElement(
			'div',
			{ id: 'wrapper', className: 'wrapper' },
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
							{ href: 'http://github.com/ChristopherGaney', target: '_blank' },
							React.createElement(
								'h3',
								null,
								'github.com/ChristopherGaney'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://www.mathmataz.com', target: '_blank' },
							React.createElement(
								'h3',
								null,
								'www.mathmataz.com'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://festusxcboosters.org', target: '_blank' },
							React.createElement(
								'h3',
								null,
								'festusxcboosters.org'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://saintegenevievehome.com', target: '_blank' },
							React.createElement(
								'h3',
								null,
								'saintegenevievehome.com'
							)
						),
						React.createElement(
							'a',
							{ href: 'https://www.smashwords.com/books/view/488947', target: '_blank' },
							React.createElement(
								'h3',
								null,
								'Monstrato: a novel'
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
							{ href: 'https://www.linkedin.com/in/christopher-ganey-0b094b125', target: '_blank' },
							React.createElement(
								'h3',
								null,
								'LinkedIn'
							)
						),
						React.createElement(
							'a',
							{ href: 'https://twitter.com/ChrisGaneyMedia', target: '_blank' },
							React.createElement(
								'h3',
								null,
								'Twitter'
							)
						),
						React.createElement(
							'a',
							{ href: 'http://www.facebook.com/christophercganey', target: '_blank' },
							React.createElement(
								'h3',
								null,
								'facebook'
							)
						)
					)
				)
			)
		);
	}
});

module.exports = App;
