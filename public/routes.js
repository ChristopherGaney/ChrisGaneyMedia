'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Index = require('./index');
var App = require('./App');
var LandingPage = require('./LandingPage');
var Articles = require('./Articles');

var routes = React.createElement(
    Route,
    { path: '/', component: Index },
    React.createElement(
        Route,
        { component: App },
        React.createElement(IndexRoute, { component: LandingPage }),
        React.createElement(Route, { path: '/articles/:title/:postid', component: Articles })
    )
);

module.exports = {
    routes: routes
};
