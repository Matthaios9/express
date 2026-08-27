'use strict'

var express = require('../..');
var path = require('node:path');
var redis = require('redis');

var db = redis.createClient();
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

async function initializeRedis() {
  try {

    await db.connect();

    await db.sAdd('ferret', 'tobi');
    await db.sAdd('ferret', 'loki');
    await db.sAdd('ferret', 'jane');
    await db.sAdd('cat', 'manny');
    await db.sAdd('cat', 'luna');
  } catch (err) {
    console.error('Error initializing Redis:', err);
    process.exit(1);
  }
}

app.get('/search/{:query}', function (req, res, next) {
  var query = req.params.query || '';
  db.sMembers(query)
    .then((vals) => res.send(vals))
    .catch((err) => {
      console.error(`Redis error for query "${query}":`, err);
      next(err);
    });
});

app.get('/client.js', function(req, res){
  res.sendFile(path.join(__dirname, 'client.js'));
});

(async () => {
  await initializeRedis();
  if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
  }
})();
