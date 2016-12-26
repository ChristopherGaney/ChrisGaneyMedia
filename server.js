'use strict';

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reduxStore = require('./public/redux-store');

var _reduxStore2 = _interopRequireDefault(_reduxStore);

var _routes = require('./public/routes.js');

var _routes2 = _interopRequireDefault(_routes);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;
var testedUrl = 'mongodb://localhost:27017/chrisganeymedia';
MongoClient.connect(testedUrl, function (err, db) {
	_assert2.default.equal(null, err);
	console.log("Connected correctly to server.");
	db.close();
});

_mongoose2.default.connect('mongodb://localhost:27017/chrisganeymedia');
var db = _mongoose2.default.connection;

var app = (0, _express2.default)();

app.engine('pug', _pug2.default.__express);
app.set('view engine', 'pug');

app.use((0, _serveFavicon2.default)(__dirname + '/public/images/favicon.ico'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(cookieParser());
app.use((0, _expressValidator2.default)());

app.use(_express2.default.static(__dirname + '/public'));

app.use(function (req, res, next) {

	if (req.url === '/') {
		BlogPost.getAllPostsByDate(function (err, posts) {
			var message = '';
			var feature = '';
			if (posts) {
				var identifier = posts[0]._id;
				BlogPost.getPostById(identifier, function (err, post) {
					if (post) {
						feature = post;
					}
				});
			} else {
				message = 'There are no posts to display.';
			}
			var router = Router.create({ location: req.url, routes: _routes2.default });
			router.run(function (Handler, state) {
				var html = ReactDOMServer.renderToString(_react2.default.createElement(Handler, { data: { "message": message, "posts": posts, "feature": feature } }));
				return res.render('index', { content: html,
					local_data: { "message": message, "posts": posts, "feature": feature }
				});
			});
		});
	} else {
		next();
	}
});

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		console.log(err);
	});
}

app.listen(3000, function () {
	console.log('Listening on port 3000...');
});
