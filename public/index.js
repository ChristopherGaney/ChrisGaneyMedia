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
