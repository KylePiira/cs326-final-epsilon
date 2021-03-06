'use strict';
const express = require('express');
const db = require('./db.js');
const router = express.Router();

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.json({
      error: true,
      message: 'not authenticated'
    })
  }
}

/* GET api home listing. */
// eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
router.get('/userId', async function(req, res, next) {
  if (req.user) {
    res.json({
      error: false,
      data: {
        id: req.user.id,
      }
    })
  } else {
    res.json({
      error: true
    })
  }
  
});

// retrieves a user by its userId
// eslint-disable-next-line no-unused-vars
router.get('/user/:userId', checkLoggedIn, async function(req, res, next) {
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
// eslint-disable-next-line no-unused-vars
router.post('/user', checkLoggedIn, async function(req, res, next) {
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

// edit a user's admin info
router.post('/user/edit', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: await db.user.change_admin({
      username: req.body.username,
      is_admin: req.body.is_admin,
    }),
  }); 
});


// deletes a user
// eslint-disable-next-line no-unused-vars
router.delete('/user/:userId', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: await db.user.delete({id: req.params.userId}),
  });
});

// retrieves comments by userId
// eslint-disable-next-line no-unused-vars
router.get('/user/:userId/comments', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.comments({id: req.params.userId}),
  });
});

// retrieves submissions by a userId
// eslint-disable-next-line no-unused-vars
router.get('/user/:userId/submissions', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.submissions({id: req.params.userId}),
  });
});

// retrieves watchlist by a userId
// eslint-disable-next-line no-unused-vars
router.get('/user/:userId/watchlist', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.watchlist({id: req.params.userId}),
  });
});

// adds an investment to watchlist
// eslint-disable-next-line no-unused-vars
router.post('/user/:userId/watchlist', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: await db.investment.watch(req.params.userId, req.body.id),
  });
});

// deletes an investment from watchlist
// eslint-disable-next-line no-unused-vars
router.delete('/user/:userId/watchlist', checkLoggedIn, async function(req, res, next) {
  db.investment
  res.json({
    error: await db.investment.unwatch(req.params.userId, req.body.id),
  });
});

// retrieves a list of stocks of user's long
// eslint-disable-next-line no-unused-vars
router.get('/user/:userId/long', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.long({id: req.params.userId}),
  });
});

// buys a stock to a user's long
// eslint-disable-next-line no-unused-vars
router.post('/user/:userId/long', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: await db.investment.buy(req.params.userId, req.body.id),
  });
});

// retrieves a list of user's short
// eslint-disable-next-line no-unused-vars
router.get('/user/:userId/short', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.short({id: req.params.userId}),
  });
});

// sells a stock to user's short
// eslint-disable-next-line no-unused-vars
router.post('/user/:userId/short', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: await db.investment.sell(req.params.userId, req.body.id),
  });
});

// get users voting power level
// eslint-disable-next-line no-unused-vars
router.get('/user/:userId/reputation', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.reputation({id: req.params.userId}),
  })
});

/*
Users API
*/

// retrieves a list of all users
// eslint-disable-next-line no-unused-vars
router.get('/users/all', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.users.all(),
  });
});

/*
Story API
*/
// retrieve story by storyId
// eslint-disable-next-line no-unused-vars
router.get('/story/:storyId', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.submission.read({
      id: req.params.storyId,
    }),
  });
});

// upvote story by storyId
// eslint-disable-next-line no-unused-vars
router.post('/story/:storyId/upvote', checkLoggedIn, async function(req, res, next) {
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
// eslint-disable-next-line no-unused-vars
router.post('/story/:storyId/downvote', checkLoggedIn, async function(req, res, next) {
  if (req.user.reputation > 0) {
    const story = await db.submission.read({id: req.params.storyId});
    // Check if the upvoter is also the author
    if (req.user.id !== story.author) {
      // Take 1 reputation point from both the voter and the author
      await db.user.transfer({id: req.user.id}, null);
      await db.user.transfer({id: story.author}, null);
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
// eslint-disable-next-line no-unused-vars
router.delete('/story/:storyId', checkLoggedIn, async function(req, res, next) {
  db.submission.delete({id: req.params.storyId});
  res.json({
    error: false,
  })
})

// create a story
// eslint-disable-next-line no-unused-vars
router.post('/story', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: {
      id: await db.submission.create({
        title: req.body.title,
        url: req.body.url,
        investment: req.body.investment.toUpperCase(),
        author: req.user.id,
      })
    }
  })
});

// edit a story
router.post('/story/edit', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: await db.submission.update({
      id : req.body.id,
      title: req.body.title,
      url: req.body.url,
      investment: req.body.investment,
    }),
  }); 
});

// retrieve story comments by storyId
// eslint-disable-next-line no-unused-vars
router.get('/story/:storyId/comments', checkLoggedIn, async function(req, res, next) {
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
// eslint-disable-next-line no-unused-vars
router.get('/stories/all', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.investment.submissions('all'),
  });
});

// retrieves trending stories
// eslint-disable-next-line no-unused-vars
router.get('/stories/trending', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.user.trending({id: req.user.id}),
  });
});

// retrieves stories by investment
// eslint-disable-next-line no-unused-vars
router.get('/stories/:investment', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.investment.submissions(req.params.investment),
  });
});

/*
Comment API
*/

// retrieves comment by commentId
// eslint-disable-next-line no-unused-vars
router.get('/comment/:commentId', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.comment.read({id: req.params.commentId}),
  })
});

// deletes comment by commentId
// eslint-disable-next-line no-unused-vars
router.delete('/comment/:commentId', checkLoggedIn, async function(req, res, next) {
  const comment = await db.comment.read({
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
// eslint-disable-next-line no-unused-vars
router.post('/comment/:commentId/upvote', checkLoggedIn, async function(req, res, next) {
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
    });
  }
});

// downvotes a comment by commentId
// eslint-disable-next-line no-unused-vars
router.post('/comment/:commentId/downvote', checkLoggedIn, async function(req, res, next) {
  if (req.user.reputation > 0) {
    const comment = await db.comment.read({id: req.params.commentId});
    // Check if the upvoter is also the author
    if (req.user.id !== comment.author) {
      // Take 1 reputation point from both the voter and the original commenter
      await db.user.transfer({id: req.user.id}, null);
      await db.user.transfer({id: comment.author}, null);
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
// eslint-disable-next-line no-unused-vars
router.get('/comment/:commentId/comments', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.comment.comments({id: req.params.commentId}),
  });
});

// creates a comment
// eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
router.get('/search', checkLoggedIn, async function(req, res, next) {
  res.json({
    error: false,
    data: await db.search.submissions(req.query.q),
  })
});

module.exports = router;