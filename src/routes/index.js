const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* GET story */
router.get('/story', function(req, res, next) {
  res.render('story.html');
});

/* GET investment */
router.get('/investment', function(req, res, next) {
  res.render('stock.html');
});

/* GET profile */
router.get('/profile', function(req, res, next) {
  res.render('profile.html');
});

module.exports = router;
