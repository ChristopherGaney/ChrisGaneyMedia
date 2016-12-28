"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var marked = require('marked');
var axios = require('axios');

 var LandingPage = React.createClass({
	loadPageFromServer: function() {
		
		axios.post('/page')
				  .then(function (response) {
					if(response.data.message === 'yes') {
						console.log('Retrieved!');
						 this.props.loadPage(response.data);
						}
					else {
						console.log(response.data.message);
						}
				  }.bind( this ))
				  .catch(function (error) {
					console.log(error);
				  });
	},
	 componentDidMount: function() {
		this.loadPageFromServer();
	},
	componentWillMount: function() {
		console.log(this.props.message);
	},
  render: function() {
    return <div className="main_content">
				<div className="welcome">
					<h2>{this.props.data[0]['blogname']}</h2>
					<h3>{this.props.feature}</h3>
				</div>
			</div>
  }
})

var LandingPageState = function(state) {
  return {
    message: state.message,
    data: state.data,
    feature: state.feature
  }
}

var LandingPageDispatch = function(dispatch) {
  return {
    loadPage: function(data) {
      dispatch({
        type: 'load_Page',
        data: data
      })
    }
  }
}

var connect = ReactRedux.connect;

LandingPage = connect(
  LandingPageState,
  LandingPageDispatch
)(LandingPage)


module.exports = LandingPage;
