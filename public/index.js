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
				React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
				React.createElement(
					'title',
					null,
					'ChrisGaneyMedia'
				),
				React.createElement('meta', { name: 'Description', content: 'Articles discussing Javascript, Node, React, functional programming' }),
				React.createElement('link', { rel: 'canonical', href: 'http://chrisganeymedia.com' }),
				React.createElement('meta', { property: 'og:locale', content: 'en_US' }),
				React.createElement('meta', { property: 'og:type', content: 'website' }),
				React.createElement('meta', { property: 'og:title', content: 'A Javascript Blog' }),
				React.createElement('meta', { property: 'og:description', content: 'Articles discussing Javascript, Node, React, functional programming' }),
				React.createElement('meta', { property: 'og:url', content: 'http://chrisganeymedia.com' }),
				React.createElement('meta', { property: 'og:image', content: 'http://chrisganeymedia.com/public/images/favicon.ico' }),
				React.createElement('meta', { name: 'twitter:card', content: 'summary' }),
				React.createElement('meta', { name: 'twitter:site', content: '@ChrisGaneyMedia' }),
				React.createElement('link', { rel: 'stylesheet', href: 'http://localhost:3000/static/css/normalize.css' }),
				React.createElement('link', { rel: 'stylesheet', href: 'http://localhost:3000/static/css/my_skeleton.css' }),
				React.createElement('link', { rel: 'stylesheet', href: 'http://localhost:3000/static/css/style.css' }),
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
						this.props.children
					)
				),
				React.createElement('script', { src: 'http://localhost:3000/static/bundle.js' })
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
