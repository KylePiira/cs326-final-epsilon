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

router.get('/admin-submission', function(req, res, next) {
  res.render('admin_submission.html');
});

router.get('/admin-user', function(req, res, next) {
  res.render('admin_users.html');
});
module.exports = router;
