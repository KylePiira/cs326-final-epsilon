const express = require('express');
const { fake } = require('faker');
const faker = require('faker');
const router = express.Router();

function generateDummyUser() {
  return {
    id: faker.random.uuid(),
    type: 'user',
    username: faker.internet.userName(),
    reputation: faker.random.number(500),
    watchlist: ['TSLA', 'WMT', 'AMZN'],
    portfolio: {
      long: ['APPL', 'GOOGL', 'MSFT'],
      short: ['TSLA'],
    }
  }
}

function generateDummySubmission() {
  return {
    id: faker.random.uuid(),
    type: 'story',
    title: faker.lorem.sentence(5, 10),
    url: faker.internet.url(),
    author: generateDummyUser(),
    investment: 'BTC',
    created: Number(faker.time.recent() / 1000),
    votes: faker.random.number(10),
    score: faker.random.number(10),
    replies: faker.random.number(100),
  }
}

function generateDummyComment() {
  return {
    id: faker.random.uuid(),
    type: 'comment',
    body: faker.lorem.sentences(5),
    author: generateDummyUser(),
    created: Number(faker.time.recent() / 1000),
    votes: faker.random.number(10),
    score: faker.random.number(10),
    replies: faker.random.number(100),
  }
}

/* GET api home listing. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.json({
    message: 'no endpoint',
    error: true,
  });
});

/*
User API
*/
router.get('/user/:userId', function(req, res, next) {
  res.json({
    error: false,
    data: generateDummyUser(),
  });
});

router.post('/user', function(req, res, next) {
  res.json({
    error: false,
    data: {
      id: faker.random.uuid(),
    }
  });
});

router.delete('/user/:userId', function(req, res, next) {
  res.json({
    error: false,
  });
});

router.get('/user/:userId/comments', function(req, res, next) {
  const data = [];
  const limit = faker.random.number(15);
  for (let i = 0; i < limit; i++) {
    data.push(generateDummyComment());
  }
  res.json({
    error: false,
    data: data,
  });
});

router.get('/user/:userId/submissions', function(req, res, next) {
  const data = [];
  const limit = faker.random.number(15);
  for (let i = 0; i < limit; i++) {
    data.push(generateDummySubmission());
  }
  res.json({
    error: false,
    data: data,
  });
});

/*
Users API
*/
router.get('/users/all', function(req, res, next) {
  const data = [];
  const limit = faker.random.number(15);
  for (let i = 0; i < limit; i++) {
    data.push(generateDummyUser());
  }
  res.json({
    error: false,
    data: data,
  });
});

/*
Story API
*/
router.get('/story/:storyId', function(req, res, next) {
  res.json({
    error: false,
    data: generateDummySubmission(),
  });
});

router.post('/story/:storyId/upvote', function(req, res, next) {
  res.json({
    error: false,
  });
});

router.post('/story/:storyId/downvote', function(req, res, next) {
  res.json({
    error: false,
  });
});

router.delete('/story/:storyId', function(req, res, next) {
  res.json({
    error: false,
  })
})

router.post('/story', function(req, res, next) {
  res.json({
    error: false,
    data: {
      id: faker.random.uuid(),
    }
  })
});

router.get('/story/:storyId/comments', function(req, res, next) {
  const data = [];
  const limit = faker.random.number(15);
  for (let i = 0; i < limit; i++) {
    data.push(generateDummyComment());
  }
  res.json({
    error: false,
    data: data,
  });
});

/*
List Stories API
*/
router.get('/stories/all', function(req, res, next) {
  const data = [];
  const limit = faker.random.number(15);
  for (let i = 0; i < limit; i++) {
    data.push(generateDummySubmission());
  }
  res.json({
    error: false,
    data: data,
  });
});

router.get('/stories/:investment', function(req, res, next) {
  const data = [];
  const limit = faker.random.number(15);
  for (let i = 0; i < limit; i++) {
    data.push(generateDummySubmission());
  }
  res.json({
    error: false,
    data: data,
  });
});

/*
Comments API
*/
router.get('/comment/:commentId', function(req, res, next) {
  res.json({
    error: false,
    data: generateDummyComment()
  })
});

router.delete('/comment/:commentId', function(req, res, next) {
  res.json({
    error: false,
  })
})


router.post('/comment/:commentId/upvote', function(req, res, next) {
  res.json({
    error: false,
  })
});

router.post('/comment/:commentId/downvote', function(req, res, next) {
  res.json({
    error: false,
  })
});


router.get('/comment/:commentId/comments', function(req, res, next) {
  const data = [];
  const limit = faker.random.number(15);
  for (let i = 0; i < limit; i++) {
    data.push(generateDummyComment());
  }
  res.json({
    error: false,
    data: data,
  });
});

router.post('/comment', function(req, res, next) {
  res.json({
    error: false,
    data: {
      id: faker.random.uuid()
    }
  })
});

/*
Search API
*/
router.get('/search', function(req, res, next) {
  if (req.query.q) {
    const data = [];
    const limit = faker.random.number(15);
    for (let i = 0; i < limit; i++) {
      data.push(generateDummySubmission());
    }
    res.json({
      error: false,
      data: data,
    });
  } else {
    res.json({
      error: true,
      message: 'no query parameter'
    })
  }
});

module.exports = router;