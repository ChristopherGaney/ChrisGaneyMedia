'use strict';

import util from 'util';
import express from 'express';
import path from 'path';
import pug from 'pug';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import mongoose from 'mongoose';
import mongo from 'mongodb';
import assert from 'assert';

import React from 'react';
import ReactDOM from 'react-dom/server';
import ReactRouter from 'react-router';
import { match } from 'react-router';
import createStore from './public/redux-store';
import routes from './public/routes.js'
import {Provider} from 'react-redux';

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

app.engine('pug', pug.__express);
app.set('view engine', 'pug');    

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
	
	if(req.url === '/') {
			BlogPost.getAllPostsByDate(function(err, posts) {
				let message = '';
				let feature = '';
				if(posts) {
					let identifier = posts[0]._id;
					BlogPost.getPostById(identifier, function(err, post) {
						if(post) {
							feature = post;
						}
					});			
				}
				else {
					message = 'There are no posts to display.';
				}
				 var router = Router.create({ location: req.url, routes: routes });
				  router.run(function (Handler, state) {
					var html = ReactDOMServer.renderToString(React.createElement(Handler, {data: { "message" : message, "posts" : posts, "feature": feature }}));
					return res.render('index', { content: html,
												local_data: { "message" : message, "posts" : posts, "feature": feature }
						});
					  });
			});
		
	}
	else {
		next();
	}
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
