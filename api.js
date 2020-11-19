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
router.get('/story/:storyId', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.submission.read({
      id: req.params.storyId,
    }),
  });
});

router.post('/story/:storyId/upvote', async function(req, res, next) {
  db.submission.upvote({id: req.params.storyId});
  res.json({
    error: false,
  });
});

router.post('/story/:storyId/downvote', async function(req, res, next) {
  db.submission.downvote({id: req.params.storyId});
  res.json({
    error: false,
  });
});

router.delete('/story/:storyId', async function(req, res, next) {
  db.submission.delete({id: req.params.storyId});
  res.json({
    error: false,
  })
})

router.post('/story', async function(req, res, next) {
  res.json({
    error: false,
    data: {
      id: await db.submission.create({
        title: req.body.title,
        url: req.body.url,
        investment: req.body.investment,
        author: req.user.id,
      })
    }
  })
});

router.get('/story/:storyId/comments', async function(req, res, next) {
  const comments = await db.submission.comments({id: req.params.storyId});
  // for (const comment of comments) {
  //   comments.author = await db.user.read({id: comments.author});
  // }
  res.json({
    error: false,
    data: comments,
  });
});

/*
Stories API
*/
router.get('/stories/all', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.investment.submissions('all'),
  });
});

router.get('/stories/:investment', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.investment.submissions(req.params.investment),
  });
});

/*
Comment API
*/
router.get('/comment/:commentId', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.comment.read({id: req.params.commentId}),
  })
});

router.delete('/comment/:commentId', async function(req, res, next) {
  db.comment.delete({id: req.params.commentId});
  res.json({
    error: false,
  })
})


router.post('/comment/:commentId/upvote', function(req, res, next) {
  db.comment.upvote({id: req.params.commentId});
  res.json({
    error: false,
  })
});

router.post('/comment/:commentId/downvote', function(req, res, next) {
  db.comment.downvote({id: req.params.commentId});
  res.json({
    error: false,
  })
});


router.get('/comment/:commentId/comments', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.comment.comments({id: req.params.commentId}),
  });
});

router.post('/comment', async function(req, res, next) {
  if (await db.comment.exists({id: req.body.parent})) {
    db.comment.reply({id: req.body.parent});
  } else if (await db.submission.exists({id: req.body.parent})) {
    db.submission.reply({id: req.body.parent});
  } else {
    res.json({
      error: true,
      message: "Parent does not exist"
    })
    return;
  }
  const commentId = await db.comment.create({
    author: req.user.id,
    parent: req.body.parent,
    body: req.body.body,
  })
  res.json({
    error: false,
    data: {
      id: commentId
    }
  })
});

/*
Search API
*/
router.get('/search', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.search.submissions(req.query.q),
  })
});

module.exports = router;