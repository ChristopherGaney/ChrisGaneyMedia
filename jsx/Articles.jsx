"use strict"

var React = require('react');
var ReactRedux = require('react-redux');
var marked = require('marked');
var axios = require('axios');

 var Articles = React.createClass({

  render: function() {
  
    return <div className="main_content">
				<div className="welcome">
					<h2>{this.props.message}</h2>
				</div>
			</div>
	
  }
})

var ArticlesState = function(state) {
  return {
    message: state.message,
    data: state.data,
    feature: state.feature
  }
}

var ArticlesDispatch = function(dispatch) {
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

Articles = connect(
  ArticlesState,
  ArticlesDispatch
)(Articles)


module.exports = Articles;
