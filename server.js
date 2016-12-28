
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var BlogPost = require('./models/blogpost');
var PostBody = require('./models/postbody');

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

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.post('/', function(req, res) {

	BlogPost.getAllPostsById(null, function(err, posts) {
		console.log(posts);
		var message = 'yes';
		var feature = '';
		var identifier;
		if(posts) {
			identifier = posts[0]._id;
			PostBody.getBodyByPostId(identifier, function(err, post) {
				if(post) {
					feature = post;
				}
			});			
		}
		else {
			message = 'There are no posts to display.';
		}
		console.log(req.url);
		
		var initialState = {
			message: message,
			data: posts,
			feature: feature
		}
		
		res.json(initialState);
	});
    
});

app.get(['/', '/articles'], function(req, res) {
  var ReactRouter = require('react-router');
  var match = ReactRouter.match;
  var RouterContext = React.createFactory(ReactRouter.RouterContext);
  var Provider = React.createFactory(require('react-redux').Provider);
  var routes = require('./public/routes.js').routes
  var store = require('./public/redux-store');
  
	BlogPost.getAllPostsById(function(err, posts) {
		console.log(posts[0].blogname);
		var message = 'yes';
		var feature = '';
		var identifier;
		if(posts) {
			identifier = posts[0]._id;
			PostBody.getBodyByPostId(identifier, function(err, post) {
				if(post) {
					feature = post.postbody;
				}
		
			var initialState = {
				message: 'yes',
				data: posts,
				feature: feature
			};
			console.log(initialState);
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
		}
		else {
			message = 'There are no posts to display.';
		}
	});

  });

app.listen(3000, function () {
	console.log('Listening on port 3000...');
});


