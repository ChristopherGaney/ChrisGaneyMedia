
var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Index = require('./index');
var App = require('./App');
var LandingPage = require('./LandingPage');
var Articles = require('./Articles');



var routes = (
    <Route path="/" component={Index}>
		<Route component={App}>
		  <IndexRoute component={LandingPage} />
		  <Route path="/articles/:title/:postid" component={Articles} />
      </Route>
    </Route>
)

module.exports = {
  routes: routes
}
