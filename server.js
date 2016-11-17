'use strict';

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');

app.use((0, _serveFavicon2.default)(__dirname + '/public/images/favicon.ico'));

app.use(_express2.default.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
