"use strict";

var React = require('react');
var ReactRedux = require('react-redux');
var marked = require('marked');
var axios = require('axios');

var Articles = React.createClass({
  displayName: 'Articles',


  render: function render() {

    return React.createElement(
      'div',
      { className: 'main_content' },
      React.createElement(
        'div',
        { className: 'welcome' },
        React.createElement(
          'h2',
          null,
          this.props.message
        )
      )
    );
  }
});

var ArticlesState = function ArticlesState(state) {
  return {
    message: state.message,
    data: state.data,
    feature: state.feature
  };
};

var ArticlesDispatch = function ArticlesDispatch(dispatch) {
  return {
    loadPage: function loadPage(data) {
      dispatch({
        type: 'load_Page',
        data: data
      });
    }
  };
};

var connect = ReactRedux.connect;

Articles = connect(ArticlesState, ArticlesDispatch)(Articles);

module.exports = Articles;
