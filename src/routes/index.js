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

module.exports = router;
