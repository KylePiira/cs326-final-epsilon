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
/* GET home page. */
router.get('/', checkLoggedIn, function(req, res, next) {
  res.sendFile('index.html', {root: __dirname + '/html'});
});
/* GET story */
router.get('/story', checkLoggedIn, function(req, res, next) {
  res.sendFile('story.html', {root: __dirname + '/html'});
});
/* GET investment */
router.get('/investment', checkLoggedIn, function(req, res, next) {
  res.sendFile('investment.html', {root: __dirname + '/html'});
});
/* GET profile */
router.get('/user', checkLoggedIn, function(req, res, next) {
  res.sendFile('profile.html', {root: __dirname + '/html'});
});
/*GET login*/
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root: __dirname + '/html'});
});
/*GET sign up*/
router.get('/register', function(req, res, next) {
  res.sendFile('register.html', {root: __dirname + '/html'});
});
/*GET submit*/
router.get('/submit', checkLoggedIn, function(req, res, next) {
  res.sendFile('submit.html', {root: __dirname + '/html'});;
});
/*GET search results*/
router.get('/search', checkLoggedIn, function(req, res, next) {
  res.sendFile('search.html', {root: __dirname + '/html'});
});
/* GET admin for submssions */
router.get('/admin/submissions', checkLoggedIn, function(req, res, next) {
  res.sendFile('admin/submissions.html', {root: __dirname + '/html'});
});
/* GET admin for comments */
router.get('/admin/users', checkLoggedIn, function(req, res, next) {
  res.sendFile('admin/users.html', {root: __dirname + '/html'});
});
module.exports = router;