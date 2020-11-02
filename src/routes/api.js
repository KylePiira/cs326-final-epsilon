var express = require('express');
var router = express.Router();

/* GET api home listing. */
router.get('/', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({
    message: 'no endpoint',
    error: true,
  }));
});

module.exports = router;
