const express = require('express');
const faker = require('faker');
const router = express.Router();

function generateDummyUser() {
  const dummyStocks = ['TSLA', 'APPL', 'MSFT', 'FB', 'AMZN', 'GOOGL',
                        'ABC', 'CNN', 'BBC', 'T', 'AK', 'TX', 'OIL',
                        'USD', 'GOLD', 'VT', 'SPY', 'VTI'];
  return {
    id: faker.random.uuid(),
    type: 'user',
    username: faker.internet.userName(),
    email: faker.internet.email(),
    date: faker.date.past(2),
    reputation: faker.random.number(500),
    watchlist: faker.random.arrayElements(dummyStocks, faker.random.number(5)),
    portfolio: {
      long: faker.random.arrayElements(dummyStocks, faker.random.number(5)),
      short: faker.random.arrayElements(dummyStocks, faker.random.number(5)),
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
    created: Math.floor(faker.time.recent() / 1000),
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
    created: Math.floor(faker.time.recent() / 1000),
    votes: faker.random.number(10),
    score: faker.random.number(10),
    replies: faker.random.number(100),
  }
}

/* GET api home listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'no endpoint',
    error: true,
  });
});

/*
User API
*/

// retrieves a userId of the currently logged in user
router.get('/userId', async function(req, res, next) {
  res.json({
    error: false,
    data: {
      id: req.user.id,
    }
  })
});

// retrieves a user by its userId
router.get('/user/:userId', async function(req, res, next) {
  if (db.user.exists({id: req.params.userId})) {
    res.json({
      error: false,
      data: await db.user.read({id: req.params.userId}),
    });
  } else {
    res.json({
      error: true,
      message: 'User does not exist'
    })
  }
});

// creates a user
router.post('/user', async function(req, res, next) {
  if (db.user.exists({username: req.body.username})) {
    res.json({
      error: true,
      message: 'User already exists'
    })
  } else {
    res.json({
      error: false,
      data: {
        id: await db.user.create({
          username: req.body.username,
          password: req.body.password,
        }),
      }
    });
  }
});

// deletes a user
router.delete('/user/:userId', async function(req, res, next) {
  res.json({
    error: await db.user.delete({id: req.params.userId}),
  });
});

// retrieves comments by userId
router.get('/user/:userId/comments', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.comments({id: req.params.userId}),
  });
});

// retrieves submissions by a userId
router.get('/user/:userId/submissions', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.submissions({id: req.params.userId}),
  });
});

// retrieves watchlist by a userId
router.get('/user/:userId/watchlist', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.watchlist({id: req.params.userId}),
  });
});

// adds an investment to watchlist
router.post('/user/:userId/watchlist', async function(req, res, next) {
  res.json({
    error: await db.investment.watch(req.params.userId, req.body.id),
  });
});

// deletes an investment from watchlist
router.delete('/user/:userId/watchlist', async function(req, res, next) {
  db.investment
  res.json({
    error: await db.investment.unwatch(req.params.userId, req.body.id),
  });
});

// retrieves a list of stocks of user's long
router.get('/user/:userId/long', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.long({id: req.params.userId}),
  });
});

// buys a stock to a user's long
router.post('/user/:userId/long', async function(req, res, next) {
  res.json({
    error: await db.investment.buy(req.params.userId, req.body.id),
  });
});

// retrieves a list of user's short
router.get('/user/:userId/short', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.short({id: req.params.userId}),
  });
});

// sells a stock to user's short
router.post('/user/:userId/short', async function(req, res, next) {
  res.json({
    error: await db.investment.sell(req.params.userId, req.body.id),
  });
});

/*
Users API
*/

// retrieves a list of all users
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

// retrieves a story by its storyId
router.get('/story/:storyId', function(req, res, next) {
  res.json({
    error: false,
    data: generateDummySubmission(),
  });
});

// upvotes a story
router.post('/story/:storyId/upvote', function(req, res, next) {
  res.json({
    error: false,
  });
});

// downvotes a story
router.post('/story/:storyId/downvote', function(req, res, next) {
  res.json({
    error: false,
  });
});

// deletes a story
router.delete('/story/:storyId', function(req, res, next) {
  res.json({
    error: false,
  })
})

// creates a story
router.post('/story', function(req, res, next) {
  res.json({
    error: false,
    data: {
      id: faker.random.uuid(),
    }
  })
});

// retrieves a story's comments
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
Stories API
*/

// gets a list of all the stories
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

// gets a list of all the stories for a particular investment
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
Comment API
*/

// retrieves a comment by its commentId
router.get('/comment/:commentId', function(req, res, next) {
  res.json({
    error: false,
    data: generateDummyComment()
  })
});

// deletes a comment
router.delete('/comment/:commentId', function(req, res, next) {
  res.json({
    error: false,
  })
})

// upvotes a comment
router.post('/comment/:commentId/upvote', function(req, res, next) {
  res.json({
    error: false,
  })
});

// downvotes a comment
router.post('/comment/:commentId/downvote', function(req, res, next) {
  res.json({
    error: false,
  })
});

// retrieves a comment's thread of comments
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

// creates a comment
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

// retrieves search results
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