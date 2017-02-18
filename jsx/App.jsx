"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var Router = require('react-router').Router
var Route = require('react-router').Route
var LandingPage = require('./LandingPage');


 var App = React.createClass({
	
  render: function() {
	
    return <div id="wrapper" className="wrapper">
					<Header />
					{this.props.children}
					<Footer />
			</div>
  }
})

var Header = React.createClass({
  render: function() {
    return <header>
				<div className="row header">
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
						<div className="links_header">
							<h3>Some of My Work</h3>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-links">
						<div className="links_list">
							<a href='http://github.com/ChristopherGaney' target='_blank'><h3>github.com/ChristopherGaney</h3></a>
							<a href='http://www.mathmataz.com' target='_blank'><h3>www.mathmataz.com</h3></a>
							<a href='http://festusxcboosters.org' target='_blank'><h3>festusxcboosters.org</h3></a>
							<a href='http://saintegenevievehome.com' target='_blank'><h3>saintegenevievehome.com</h3></a>
							<a href='https://www.smashwords.com/books/view/488947' target='_blank'><h3>Monstrato: a novel</h3></a>
						</div>
					</div>
					<div className="col-links">
						<div className="links_list">
							<a href='https://www.linkedin.com/in/christopher-ganey-0b094b125' target='_blank'><h3>LinkedIn</h3></a>
							<a href='https://twitter.com/ChrisGaneyMedia' target='_blank'><h3>Twitter</h3></a>
							<a href='http://www.facebook.com/christophercganey' target='_blank'><h3>facebook</h3></a>
						</div>
					</div>
				</div>
			</footer>
  }
})


module.exports = App;
