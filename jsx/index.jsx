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
				<title>ChrisGaneyMedia</title>
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
