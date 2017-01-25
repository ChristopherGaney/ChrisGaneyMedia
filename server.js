'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _blogpost = require('./models/blogpost.js');

var _blogpost2 = _interopRequireDefault(_blogpost);

var _postbody = require('./models/postbody.js');

var _postbody2 = _interopRequireDefault(_postbody);

var _goodarticles = require('./models/goodarticles.js');

var _goodarticles2 = _interopRequireDefault(_goodarticles);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _sanitizeHtml = require('sanitize-html');

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

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

app.use((0, _serveFavicon2.default)(__dirname + '/public/images/favicon.ico'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressValidator2.default)());
app.use('/static', _express2.default.static('public'));

var sanitizeString = function sanitizeString(string) {
	string = string.replace(/&gt;/gi, '>');
	string = string.replace(/&lt;/gi, '<');
	string = string.replace(/(&copy;|&quot;|&amp;)/gi, '');
	string = string.replace('$', '');
	string = (0, _sanitizeHtml2.default)(string, {
		allowedTags: [],
		allowedAttributes: []
	});
	return string;
};

app.post(['/', '/articles/:title/:postid'], function (req, res) {
	var id;
	if (req.path === '/') {
		id = req.body.id;
		req.checkBody('id', 'Invalid Id').notEmpty();
		id = sanitizeString(id);
	} else {
		id = req.params.postid;
		req.checkParams('id', 'Invalid Id').notEmpty();
		id = sanitizeString(id);
	}
	var message = 'yes';
	var feature = '';
	_postbody2.default.getBodyByPostId(id, function (err, post) {
		if (post) {
			feature = post;

			var newState = {
				message: 'yes',
				feature: feature,
				url: req.path
			};
			console.log(newState);
			res.json(newState);
		}
	});
});

app.get('/admin', function (req, res) {
	var curr = new _postbody2.default({});

	_postbody2.default.createOrUpdate(curr, function (err, post) {
		if (post) {
			feature = post;

			var initialState = {

				feature: feature

			};

			res.json(initialState);
		}
	});
});

app.get(['/', '/articles/:title/:postid'], function (req, res) {
	var ReactRouter = require('react-router');
	var match = ReactRouter.match;
	var RouterContext = _react2.default.createFactory(ReactRouter.RouterContext);
	var Provider = _react2.default.createFactory(require('react-redux').Provider);
	var routes = require('./public/routes.js').routes;
	var store = require('./public/redux-store');
	var id = '';

	if (req.params.postid) {
		id = req.params.postid;
		req.checkParams('id', 'Invalid Id').notEmpty();
		id = sanitizeString(id);
	}

	_blogpost2.default.getAllPosts(function (err, posts) {
		var message = 'yes';
		var feature = '';
		if (posts) {
			if (id === '') {
				id = posts[0]._id;
			}
			_postbody2.default.getBodyByPostId(id, function (err, post) {
				if (post) {
					feature = post;
				}

				_goodarticles2.default.getGoodArticles(function (articles) {
					var initialState = {};
					if (req.path === '/') {
						initialState = {
							posts: posts,
							goodArticles: articles,
							home_feature: { feature: feature, message: 'loading...' }
						};
					} else {
						initialState = {
							posts: posts,
							goodArticles: articles,
							chosen_feature: { feature: feature, message: 'loading...' }
						};
					}

					store = store.configureStore(initialState);

					match({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
						if (error) {
							res.status(500).send(error.message);
						} else if (redirectLocation) {
							res.redirect(302, redirectLocation.pathname + redirectLocation.search);
						} else if (renderProps) {
							res.send("<!DOCTYPE html>" + _server2.default.renderToString(Provider({ store: store }, RouterContext(renderProps))));
						} else {
							res.status(404).send('Not found');
						}
					});
				});
			});
		} else {
			message = 'There are no posts to display.';
		}
	});
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

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("Listening on: " + port);
});
