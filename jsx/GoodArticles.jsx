"use strict"

var React = require('react');
var ReactRedux = require('react-redux');

module.exports = React.createClass({
	
  render: function() {
		var name = this.props.name === 'LandingPage' ? 'good_articles' : 'bottom_good_articles';
    return <div className="sidebar">
				<div className={name}>
					<h3>Good Articles</h3>
				</div>
				<div className="list">
					<a href="http://www.nicholascloud.com/2016/08/new-presentation-github-is-your-resume-now/"
						target="_blank">
						<h4>Github is Your Resume Now</h4>
						<h5>by Nicholas Cloud</h5>
					</a>
				</div>
			</div>
  }
})
