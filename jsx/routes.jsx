
var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Index = require('./index')
var LandingPage = require('./LandingPage');
var Articles = require('./Articles');



var routes = (
    <Route path="/" component={Index}>
      <IndexRoute component={LandingPage} />
      <Route path="/articles" component={Articles} />
    </Route>
)

module.exports = {
  routes: routes
}
