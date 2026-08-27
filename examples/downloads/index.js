'use strict'

var express = require('../../');
var path = require('node:path');

var app = module.exports = express();

var FILES_DIR = path.join(__dirname, 'files')

app.get('/', function(req, res){
  res.send('<ul>' +
    '<li>Download <a href="/files/notes/groceries.txt">notes/groceries.txt</a>.</li>' +
    '<li>Download <a href="/files/amazing.txt">amazing.txt</a>.</li>' +
    '<li>Download <a href="/files/missing.txt">missing.txt</a>.</li>' +
    '<li>Download <a href="/files/CCTV大赛上海分赛区.txt">CCTV大赛上海分赛区.txt</a>.</li>' +
    '</ul>')
});

app.get('/files/*file', function (req, res, next) {
  res.download(req.params.file.join('/'), { root: FILES_DIR }, function (err) {
    if (!err) return;
    if (err.status !== 404) return next(err);
    res.statusCode = 404;
    res.send('Cant find that file, sorry!');
  });
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
