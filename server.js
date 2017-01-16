'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var BlogPost = require('./models/blogpost');
var PostBody = require('./models/postbody');
var GoodArticles = require('./models/goodarticles');
var expressValidator = require('express-validator');
var sanitizeHtml = require('sanitize-html');
var favicon = require('serve-favicon');


var mongoose = require('mongoose');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var testedUrl = 'mongodb://localhost:27017/chrisganeymedia';
MongoClient.connect(testedUrl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

mongoose.connect('mongodb://localhost:27017/chrisganeymedia');
var db = mongoose.connection;

var React = require('react');
var ReactDOMServer = require('react-dom/server');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use('/static', express.static('public'));

function sanitizeString(string) {
	string = string.replace(/&gt;/gi, '>');
	string = string.replace(/&lt;/gi, '<');
	string = string.replace(/(&copy;|&quot;|&amp;)/gi, '');
	string = string.replace('$', '');
	string = sanitizeHtml(string, {
		allowedTags: [],
		allowedAttributes: []
		});
	return string;
}

app.post(['/', '/articles/:title/:postid'], function(req, res) {
	var id;
	if(req.path === '/') {
		id = req.body.id;
		req.checkBody('id', 'Invalid Id').notEmpty();
		id = sanitizeString(id);
	}
	else {
		id = req.params.postid;
		req.checkParams('id', 'Invalid Id').notEmpty();
		id = sanitizeString(id);
	}
	var message = 'yes';
	var feature = '';
	PostBody.getBodyByPostId(id, function(err, post) {
		if(post) {
			feature = post;

			var newState = {
				message: 'yes',
				feature: feature,
				url: req.path
			}
			console.log(newState);
			res.json(newState);
		}
	});		
	
});

app.get('/admin', function(req, res) {
	var curr = new PostBody({ });

	PostBody.createOrUpdate(curr, function(err, post) {
		if(post) {
			feature = post;

			var initialState = {
				
				feature: feature

			}
	
			res.json(initialState);
		}
	});		

  });

app.get(['/', '/articles/:title/:postid'], function(req, res) {
  var ReactRouter = require('react-router');
  var match = ReactRouter.match;
  var RouterContext = React.createFactory(ReactRouter.RouterContext);
  var Provider = React.createFactory(require('react-redux').Provider);
  var routes = require('./public/routes.js').routes
  var store = require('./public/redux-store');
  var id = '';
  
  if(req.params.postid) {
	  id = req.params.postid;
	  req.checkParams('id', 'Invalid Id').notEmpty();
	  id = sanitizeString(id);
  }

	BlogPost.getAllPostsById(function(err, posts) {
		var message = 'yes';
		var feature = '';
		if(posts) {
			if(id === '') {
				id = posts[0]._id;
			}
			PostBody.getBodyByPostId(id, function(err, post) {
				if(post) {
					feature = post;
				}
			
			GoodArticles.getGoodArticles(function(articles) {
				if(req.path === '/') {
					var initialState = {
							posts: posts,
							goodArticles: articles,
							home_feature: {feature: feature, message: 'loading...'}
						};
				}
				else {
					var initialState = {
							posts: posts,
							goodArticles: articles,
							chosen_feature: {feature: feature, message: 'loading...'}
						};
				}
			
			store = store.configureStore(initialState);
		
			match({routes: routes, location: req.url}, function(error, redirectLocation, renderProps) {
				  if (error) {
					res.status(500).send(error.message)
				  } else if (redirectLocation) {
					res.redirect(302, redirectLocation.pathname + redirectLocation.search)
				  } else if (renderProps) {
					res.send("<!DOCTYPE html>"+
					  ReactDOMServer.renderToString(
						Provider({store: store}, RouterContext(renderProps))
					  )
					);
		  } else {
			res.status(404).send('Not found')
		  }
		});
		});
		});			
		}
		else {
			message = 'There are no posts to display.';
		}
	});

  });
  
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
    });
}

app.listen(3000, function () {
	console.log('Listening on port 3000...');
});


