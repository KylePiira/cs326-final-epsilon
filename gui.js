const express = require('express');
const router = express.Router();

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/login');
  }
}

function checkAdmin(req, res, next) {
  if (req.user.is_admin) {
    next();
  } else {
    res.redirect('/');
  }
}

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', checkLoggedIn, function(req, res, next) {
  res.sendFile('index.html', {root: __dirname + '/html'});
});
/* GET story */
// eslint-disable-next-line no-unused-vars
router.get('/story', checkLoggedIn, function(req, res, next) {
  res.sendFile('story.html', {root: __dirname + '/html'});
});
/* GET investment */
// eslint-disable-next-line no-unused-vars
router.get('/investment', checkLoggedIn, function(req, res, next) {
  res.sendFile('investment.html', {root: __dirname + '/html'});
});
/* GET profile */
// eslint-disable-next-line no-unused-vars
router.get('/user', checkLoggedIn, function(req, res, next) {
  res.sendFile('profile.html', {root: __dirname + '/html'});
});
/*GET login*/
// eslint-disable-next-line no-unused-vars
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root: __dirname + '/html'});
});
/*GET sign up*/
// eslint-disable-next-line no-unused-vars
router.get('/register', function(req, res, next) {
  res.sendFile('register.html', {root: __dirname + '/html'});
});
/*GET submit*/
// eslint-disable-next-line no-unused-vars
router.get('/submit', checkLoggedIn, function(req, res, next) {
  res.sendFile('submit.html', {root: __dirname + '/html'});
});
/*GET search results*/
// eslint-disable-next-line no-unused-vars
router.get('/search', checkLoggedIn, function(req, res, next) {
  res.sendFile('search.html', {root: __dirname + '/html'});
});
/* GET admin for submssions */
// eslint-disable-next-line no-unused-vars
router.get('/admin/submissions', checkLoggedIn, checkAdmin, function(req, res, next) {
  res.sendFile('admin/submissions.html', {root: __dirname + '/html'});
});
/* GET admin for comments */
// eslint-disable-next-line no-unused-vars
router.get('/admin/users', checkLoggedIn, checkAdmin, function(req, res, next) {
  res.sendFile('admin/users.html', {root: __dirname + '/html'});
});
module.exports = router;