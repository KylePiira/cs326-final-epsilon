const express = require('express');
const { resource } = require('./app.js');
const db = require('./db.js');
const router = express.Router();

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

// get users voting power level
router.get('/user/:userId/reputation', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.reputation({id: req.params.userId}),
  })
});

/*
Users API
*/

// retrieves a list of all users
router.get('/users/all', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.users.all(),
  });
});

/*
Story API
*/

// retrieve story by storyId
router.get('/story/:storyId', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.submission.read({
      id: req.params.storyId,
    }),
  });
});

// upvote story by storyId
router.post('/story/:storyId/upvote', async function(req, res, next) {
  if (req.user.reputation > 0) {
    const story = await db.submission.read({id: req.params.storyId});
    // Check if the upvoter is also the author
    if (req.user.id !== story.author) {
      // Transfer the reputation to the author
      await db.user.transfer({id: req.user.id}, {id: story.author});
    } else {
      // Destroy the reputation
      await db.user.transfer({id: req.user.id}, null);
    }
    await db.submission.upvote({id: req.params.storyId});
    res.json({
      error: false,
    });
  } else {
    res.json({
      error: true,
      message: 'Insufficient reputation'
    })
  }
});

// downvote story by storyId
router.post('/story/:storyId/downvote', async function(req, res, next) {
  if (req.user.reputation > 0) {
    const story = await db.submission.read({id: req.params.storyId});
    // Check if the upvoter is also the author
    if (req.user.id !== story.author) {
      // Transfer the reputation to the author
      await db.user.transfer({id: req.user.id}, {id: story.author});
    } else {
      // Destroy the reputation
      await db.user.transfer({id: req.user.id}, null);
    }
    await db.submission.downvote({id: req.params.storyId});
    res.json({
      error: false,
    });
  } else {
    res.json({
      error: true,
      message: 'Insufficient reputation'
    })
  }
});

// delete story by storyId
router.delete('/story/:storyId', async function(req, res, next) {
  db.submission.delete({id: req.params.storyId});
  res.json({
    error: false,
  })
})

// create a story
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

// retrieve story comments by storyId
router.get('/story/:storyId/comments', async function(req, res, next) {
  const comments = await db.submission.comments({id: req.params.storyId});
  res.json({
    error: false,
    data: comments,
  });
});

/*
Stories API
*/

// retrieves all stories
router.get('/stories/all', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.investment.submissions('all'),
  });
});

// retrieves trending stories
router.get('/stories/trending', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.trending({id: req.user.id}),
  });
});

// retrieves stories by investment
router.get('/stories/:investment', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.investment.submissions(req.params.investment),
  });
});

/*
Comment API
*/

// retrieves comment by commentId
router.get('/comment/:commentId', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.comment.read({id: req.params.commentId}),
  })
});

// deletes comment by commentId
router.delete('/comment/:commentId', async function(req, res, next) {
  const comment = db.comment.read({
    id: req.params.commentId
  });
  if (await db.comment.exists({id: comment.parent})) {
    db.comment.unreply({id: comment.parent});
  } else if (await db.submission.exists({id: comment.parent})) {
    db.submission.unreply({id: comment.parent});
  } else {
    res.json({
      error: true,
      message: "Parent does not exist"
    })
    return;
  }
  db.comment.delete({id: req.params.commentId});
  res.json({
    error: false,
  });
});

// upvotes a comment by commentId
router.post('/comment/:commentId/upvote', async function(req, res, next) {
  if (req.user.reputation > 0) {
    const comment = await db.comment.read({id: req.params.commentId});
    // Check if the upvoter is also the author
    if (req.user.id !== comment.author) {
      // Transfer the reputation to the author
      await db.user.transfer({id: req.user.id}, {id: comment.author});
    } else {
      // Destroy the reputation
      await db.user.transfer({id: req.user.id}, null);
    }
    await db.comment.upvote({id: req.params.commentId});
    res.json({
      error: false,
    });
  } else {
    res.json({
      error: true,
      message: 'Insufficient reputation'
    })
  }
});

// downvotes a comment by commentId
router.post('/comment/:commentId/downvote', async function(req, res, next) {
  if (req.user.reputation > 0) {
    const comment = await db.comment.read({id: req.params.commentId});
    // Check if the upvoter is also the author
    if (req.user.id !== comment.author) {
      // Transfer the reputation to the author
      await db.user.transfer({id: req.user.id}, {id: comment.author});
    } else {
      // Destroy the reputation
      await db.user.transfer({id: req.user.id}, null);
    }
    await db.comment.downvote({id: req.params.commentId});
    res.json({
      error: false,
    });
  } else {
    res.json({
      error: true,
      message: 'Insufficient reputation'
    })
  }
});

// retrieves a comment's comments by commentId
router.get('/comment/:commentId/comments', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.comment.comments({id: req.params.commentId}),
  });
});

// creates a comment
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

// retrieves search results
router.get('/search', async function(req, res, next) {
  res.json({
    error: false,
    data: await db.search.submissions(req.query.q),
  })
});

module.exports = router;