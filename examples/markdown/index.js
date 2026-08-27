'use strict'

var escapeHtml = require('escape-html');
var express = require('../..');
var fs = require('node:fs');
var marked = require('marked');
var path = require('node:path');

var app = module.exports = express();

app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    var html = marked.parse(str).replace(/\{([^}]+)\}/g, function(_, name){
      return escapeHtml(options[name] || '');
    });
    fn(null, html);
  });
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'md');

app.get('/', function(req, res){
  res.render('index', { title: 'Markdown Example' });
});

app.get('/fail', function(req, res){
  res.render('missing', { title: 'Markdown Example' });
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
