"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var marked = require('marked');
var axios = require('axios');
var LandingPage = require('./LandingPage');

 var App = React.createClass({
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
		console.log(this.props.children);
	},
  render: function() {
	
    return <div id="wrapper" className="container">
					<Header />
					{this.props.children}
					<Footer />
			</div>
  }
})


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

var AppState = function(state) {
  return {
    message: state.message,
    data: state.data,
    feature: state.feature
  }
}

var AppDispatch = function(dispatch) {
  return {
    loadPage: function(data) {
      dispatch({
        type: 'loadPage',
        data: data
      })
    }
  }
}

var connect = ReactRedux.connect;

App = connect(
  AppState,
  AppDispatch
)(App)


module.exports = App;
