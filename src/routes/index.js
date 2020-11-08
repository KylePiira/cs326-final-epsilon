const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* GET story */
router.get('/story/:storyId', function(req, res, next) {
  res.render('story.html', {
    storyId: req.params.storyId,
  });
});

/* GET investment */
router.get('/i/:investmentId', function(req, res, next) {
  res.render('stock.html', {
    investmentId: req.params.investmentId, 
  });
});

/* GET profile */
router.get('/u/:userId', function(req, res, next) {
  res.render('profile.html', {
    userId: req.params.userId,
  });
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
router.get('/search', function(req, res, next) {
  res.render('search-results.html');
});

/* GET admin for submssions */
router.get('/admin/submissions', function(req, res, next) {
  res.render('admin/submissions.html');
});

/* GET admin for comments */
router.get('/admin/users', function(req, res, next) {
  res.render('admin/users.html');
});

module.exports = router;
