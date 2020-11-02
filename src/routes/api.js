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
  const type = req.data.type;
  if (type === 'upvote') {
    // do upvote
  } else if (type == 'downvote') {
    // do downvote
  } else {
    // It's an invalid request
    res.status(400)
    res.json({
      message: 'invalid type',
      error: true,
    });
  }
  res.json({
    message: ``,
    error: true,
  });
});
module.exports = router;
