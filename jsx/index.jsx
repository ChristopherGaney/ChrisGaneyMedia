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
				<link rel="stylesheet" href="css/normalize.css" />
				<link rel="stylesheet" href="css/my_skeleton.css" />
				<link rel="stylesheet" href="css/style.css" />
				<script dangerouslySetInnerHTML={{__html: this.props.initialState}} />
			</head>
			<body>
				<div id="content">
					<div id="wrapper" className="container">
						<Header />
						{this.props.children}
						<Footer />
					</div>
				</div>	

				{<script src="bundle.js"></script>}

			</body>
		</html>
		)
	}
});

var Header = React.createClass({

  render: function() {
    return <header>
				<div className="row">
				   <div className="col-header">
						<div className="apptitle">
							<h1 >ChrisGaneyMedia</h1>
						</div>
					</div>
				</div>
			</header>
  }
})



var Footer = React.createClass({
	
  render: function() {
    return <footer>
				<div className="row">
					<div className="col-footer">
						<div className="links">
							<h5>Privacy Policy</h5>
							<h5>About Us</h5>
							<h5>Contact</h5>
							<h5>Site Map</h5>
						</div>
					</div>
				</div>
			</footer>
  }
})

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
