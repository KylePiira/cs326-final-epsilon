var express = require('express');
var router = express.Router();

/* GET api home listing. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.json({
    message: 'no endpoint',
    error: true,
  });
});

/* GET api home listing. */
router.post('/vote/create', function(req, res, next) {
  console.log(req.body)
  if (!req.body.type) {
    res.status(400);
    res.json({
      message: 'no type specified',
      error: true,
    });
  }

  if (req.body.type === 'upvote') {
    // do upvote
  } else if (req.body.type == 'downvote') {
    // do downvote
  } else {
    // It's an invalid request
    res.status(400);
    res.json({
      message: 'invalid type',
      error: true,
    });
  }

  if (!req.body.comment && !req.body.story) {
    res.status(400);
    res.json({
      message: 'no comment or story',
      error: true
    });
  }

  if (req.body.comment && req.body.story) {
    res.status(400);
    res.json({
      message: 'both comment and story',
      error: true
    });
  }

  if (req.body.comment) {
    res.json({
      message: `${req.body.type} on ${req.body.comment}`,
      error: false,
    });
  } else {
    res.json({
      message: `${req.body.type} on ${req.body.story}`,
      error: false,
    });
  }
  
});

module.exports = router;