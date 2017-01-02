var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link;
var App = require('./App');

var Index = React.createClass({

	render: function() {
		return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>ChrisGaneyMedia</title>
				<meta name="Description" content="Articles discussing Javascript, Node, React, functional programming" />
				<link rel="canonical" href="http://chrisganeymedia.com" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="A Javascript Blog" />
				<meta property="og:description" content="Articles discussing Javascript, Node, React, functional programming" />
				<meta property="og:url" content="http://chrisganeymedia.com" />
				<meta property="og:image" content="http://chrisganeymedia.com/public/images/favicon.ico" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@ChrisGaneyMedia" />
				<link rel="stylesheet" href="http://localhost:3000/static/css/normalize.css" />
				<link rel="stylesheet" href="http://localhost:3000/static/css/my_skeleton.css" />
				<link rel="stylesheet" href="http://localhost:3000/static/css/style.css" />
				<script dangerouslySetInnerHTML={{__html: this.props.initialState}} />
			</head>
			<body>
				<div id="content">
					<div id="wrapper" className="container">
						{this.props.children}
					</div>
				</div>	

				{<script src="http://localhost:3000/static/bundle.js"></script>}

			</body>
		</html>
		)
	}
});


var IndexState = function(state) {
	var stateJSON = JSON.stringify(state).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
	return {
		initialState: "window.__INITIAL_STATE__ = "+stateJSON
	}
}

Index = connect(
	IndexState
)(Index)

module.exports = Index
