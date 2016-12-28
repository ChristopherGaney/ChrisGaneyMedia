'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Index = require('./index');
var LandingPage = require('./LandingPage');
var Articles = require('./Articles');

var routes = React.createElement(
  Route,
  { path: '/', component: Index },
  React.createElement(IndexRoute, { component: LandingPage }),
  React.createElement(Route, { path: '/articles', component: Articles })
);

module.exports = {
  routes: routes
};
