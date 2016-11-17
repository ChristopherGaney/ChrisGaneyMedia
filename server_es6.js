'use strict';

import util from 'util';
import express from 'express';
import path from 'path';
let app = express();

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');    

import favicon from 'serve-favicon';
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
