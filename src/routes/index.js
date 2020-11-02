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

/*GET login*/
router.get('/login', function(req, res, next) {
  res.render('login.html');
});

/*GET sign up*/
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up.html');
});

/*GET submit*/
router.get('/submit', function(req, res, next) {
  res.render('submit.html');
});

/*GET search results*/
router.get('/search-results', function(req, res, next) {
  res.render('search-results.html');
});

module.exports = router;
