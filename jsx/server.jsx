'use strict';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import BlogPost from './models/blogpost.js';
import PostBody from './models/postbody.js';
import GoodArticles from './models/goodarticles.js';
import expressValidator from 'express-validator';
import sanitizeHtml from 'sanitize-html';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import mongo from 'mongodb';
import assert from 'assert';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactRouter, { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { routes } from './public/routes.js';
import store from './public/redux-store';
let routeContext = React.createFactory(RouterContext);
let provider = React.createFactory(Provider);

const MongoClient = mongo.MongoClient;
let testedUrl = 'mongodb://localhost:27017/chrisganeymedia';
MongoClient.connect(testedUrl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

mongoose.connect('mongodb://localhost:27017/chrisganeymedia');
const db = mongoose.connection;

const app = express();
 
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use('/static', express.static('public'));

const sanitizeString = (string) => {
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
	let id = '';
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
	let message = 'yes';
	let feature = '';
	PostBody.getBodyByPostId(id, function(err, post) {
		if(post) {
			feature = post;

			const newState = {
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
	const curr = new PostBody({ });

	PostBody.createOrUpdate(curr, function(err, post) {
		if(post) {
			feature = post;

			const initialState = {
				
				feature: feature

			}
	
			res.json(initialState);
		}
	});		

  });

app.get(['/', '/articles/:title/:postid'], function(req, res) {
	 
	  let id = '';
  
  if(req.params.postid) {
	  id = req.params.postid;
	  req.checkParams('id', 'Invalid Id').notEmpty();
	  id = sanitizeString(id);
  }

	BlogPost.getAllPosts(function(err, posts) {
		let message = 'yes';
		let feature = '';
		if(posts) {
			if(id === '') {
				id = posts[0]._id;
			}
			PostBody.getBodyByPostId(id, function(err, post) {
				if(post) {
					feature = post;
				}
			
			GoodArticles.getGoodArticles(function(articles) {
				let initialState = {};
				if(req.path === '/') {
					initialState = {
							posts: posts,
							goodArticles: articles,
							home_feature: {feature: feature, message: 'loading...'}
						};
				}
				else {
					initialState = {
							posts: posts,
							goodArticles: articles,
							chosen_feature: {feature: feature, message: 'loading...'}
						};
				}
			
			const Store = store.configureStore(initialState);
		
			match({routes: routes, location: req.url}, function(error, redirectLocation, renderProps) {
				  if (error) {
					res.status(500).send(error.message)
				  } else if (redirectLocation) {
					res.redirect(302, redirectLocation.pathname + redirectLocation.search)
				  } else if (renderProps) {
					res.send("<!DOCTYPE html>"+
					  ReactDOMServer.renderToString(
						provider({store: Store}, routeContext(renderProps))
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
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
    });
}

const port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Listening on: " + port);
	});


