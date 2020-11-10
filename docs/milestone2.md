# Part 0: API Endpoints

## User API

`GET /api/user/:userId`

Retrieve a user object given their UUID.

Example response:

```json
{
	"error": false,
	"data": {
		"id": "7d5d9549-8e30-46e1-ab5f-e9cb7402f03a",
		"type": "user",
		"username": "Don_Moore73",
		"email":"Marine@gmail.com",
		"date":"2016-02-28T04:46:00.384Z",
		"reputation": 247,
		"watchlist": ["TSLA", "WMT", "AMZN"],
		"portfolio": {
			"long": ["APPL", "GOOGL", "MSFT"],
			"short": ["TSLA"]
		}
	}
}
```

`POST /api/user`

Create a new user with a username and password.

Example response:

```json
{
	"error": false,
	"data": {
		"id": "7d5d9549-8e30-46e1-ab5f-e9cb7402f03a"
    }
}
```

`DELETE /api/user/:userId`

Delete a user with a specific user ID.

Example response:

```json
{
    "error": false,
}
```

`GET /api/user/:userId/comments`

Retrieve a list of comments that a user has posted

Example response:

```json
{
	"error": false,
	"data": [{
		"id": "46b72477-8af2-408c-912b-d037161fcd49",
		"type": "comment",
		"body": "Dolores officia dolore est non voluptates eos et aut qui. Excepturi et eos quas esse nihil est. Cumque eligendi et. Cum pariatur quibusdam eaque ullam. Voluptatem vero et suscipit dolor.",
		"author": {
			"id": "6d6fe787-e10f-4b4a-bcbc-3c6b92441b46",
			"type": "user",
			"username": "Jordyn.Grimes90",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 238,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"created": 1604955161.566,
		"votes": 10,
		"score": 7,
		"replies": 4
	}]
}
```

`GET /api/user/:userId/submisssions`

Retrieve a list of submissions that a user has posted

Example response:

```json
{
	"error": false,
	"data": [{
		"id": "7a923f85-efe1-4da7-a7ae-7bbed59cc9d8",
		"type": "story",
		"title": "Vero autem aliquid laudantium sit.",
		"url": "http://emie.org",
		"author": {
			"id": "b152fdab-ca0d-4a8a-93e2-0e3a608586cb",
			"type": "user",
			"username": "Vincent.Raynor",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 318,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"investment": "BTC",
		"created": 1604955276.44,
		"votes": 7,
		"score": 2,
		"replies": 15
	}]
}
```

`GET /api/user/:userId/watchlist`

Retrieve a watchlist by userId

Example response:

```json
{
	"error": false,
	"data": ["TSLA", "WMT", "AMZN"]
}
```

`POST /api/user/:userId/watchlist`

Add a ticker to the watchlist

Example response:

```json
{
	"error": false,
}
```

`DELETE /api/user/:userId/watchlist`

Add a ticker to the watchlist

Example response:

```json
{
	"error": false,
}
```

`GET /api/user/:userId/long`

Retrieve a user's long stocks

Example response:

```json
{
	"error": false,
	"data": ["APPL", "GOOGL", "MSFT"]
}
```

`POST /api/user/:userId/long`

Adds a ticker to a user's long stocks

Example response:

```json
{
	"error": false,
}
```

`DELETE /api/user/:userId/long`

Delete a ticker from a user's long stocks

Example response:

```json
{
	"error": false,
}
```

`GET /api/user/:userId/short`

Retrieve a user's short stocks

Example response:

```json
{
	"error": false,
	"data": ["TSLA"]
}
```

`POST /api/user/:userId/short`

Adds a ticker to a user's short stocks

Example response:

```json
{
	"error": false,
}
```

`DELETE /api/user/:userId/short`

Delete a ticker from a user's short stocks

Example response:

```json
{
	"error": false,
}
```


## Users API

`GET /api/users/all`

Retrieve a list of all users

Example response:

```json
{
	"error": false,
	"data": [{
		"id": "41d9cc65-b2b2-451a-b78e-f46bb7996343",
		"type": "user",
		"username": "Vinnie45",
		"email":"Marine@gmail.com",
		"date":"2016-02-28T04:46:00.384Z",
		"reputation": 234,
		"watchlist": ["TSLA", "WMT", "AMZN"],
		"portfolio": {
			"long": ["APPL", "GOOGL", "MSFT"],
			"short": ["TSLA"]
		}
	}, {
		"id": "7e8108ed-401f-4785-9ad2-b2ff353ba5ae",
		"type": "user",
		"username": "Maureen_Hansen",
		"email":"Marine@gmail.com",
		"date":"2016-02-28T04:46:00.384Z",
		"reputation": 453,
		"watchlist": ["TSLA", "WMT", "AMZN"],
		"portfolio": {
			"long": ["APPL", "GOOGL", "MSFT"],
			"short": ["TSLA"]
		}
	}]
}
```

## Story API

`GET /api/story/:storyId`

Retrieve a story by its ID.

Example response:

```json
{
	"error": false,
	"data": {
		"id": "f725b92e-0646-41c1-9fc6-85bbd256900d",
		"type": "story",
		"title": "Adipisci dolore veritatis velit magni.",
		"url": "http://koby.net",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Jaida.Von",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"investment": "BTC",
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 60
	}
}
```

`POST /api/story/:storyId/upvote`

Upvote a story by its ID.

Example response:

```json
{
    "error": false,
}
```

`POST /api/story/:storyId/downvote`

Downvote a story by its ID.

Example response:

```json
{
    "error": false,
}
```

`POST /api/story`

Create a new story from title, url, and investment.

Example response:

```json
{
    "error": false,
    "data": {
        "id": "f725b92e-0646-41c1-9fc6-85bbd256900d"
    }
}
```



## Stories API
`GET /api/stories/all`

Retrieve a list of all stories

Example response:

```json
{
	"error": false,
	"data": [{
		"id": "7d5d9549-8e30-46e1-ab5f-e9cb7402f03a",
		"type": "story",
		"title": "Adipisci dolore veritatis velit magni.",
		"url": "http://koby.net",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Jaida.Von",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"investment": "BTC",
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 60
	}, {
		"id": "f725b92e-0646-41c1-9fc6-85bbd256900d",
		"type": "story",
		"title": "Coca hgn idhe idhswh.",
		"url": "http://koby.net",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Maria.Lee",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"investment": "BTC",
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 70
	}]
}
```

`GET /api/stories/:investment`

Retrieve a list of all stories

Example response:

```json
{
	"error": false,
	"data": [{
		"id": "7d5d9549-8e30-46e1-ab5f-e9cb7402f03a",
		"type": "story",
		"title": "Adipisci dolore veritatis velit magni.",
		"url": "http://koby.net",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Jaida.Von",
			"reputation": 371,
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"investment": "BTC",
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 60
	}, {
		"id": "f725b92e-0646-41c1-9fc6-85bbd256900d",
		"type": "story",
		"title": "Coca hgn idhe idhswh.",
		"url": "http://koby.net",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Maria.Lee",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"investment": "BTC",
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 70
	}]
}
```



## Comment API

`GET /api/comment/:commentId`

Retrieve a comment given their comment Id.

Example response:

```json
{
	"error": false,
	"data": {
		"id": "f725b92e-0646-41c1-9fc6-85bbd256900d",
		"type": "comment",
		"body": "Adipisci dolore veritatis velit magni.",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Jaida.Von",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 60
	}
}
```

`DELETE /api/comment/:commentId`

Delete a comment with a specific comment ID.

Example response:

```json
{
    "error": false,
}
```
`POST /api/story/:commentId/upvote`

Upvote a comment by its ID.

Example response:

```json
{
    "error": false,
}
```

`POST /api/story/:commentId/downvote`

Downvote a commment by its ID.

Example response:

```json
{
    "error": false,
}
```

`GET /api/comment/:commentId/comments`

Retrieve a list of all replies of the comment by comment's ID

Example response:

```json
{
	"error": false,
	"data": [{
		"id": "7d5d9549-8e30-46e1-ab5f-e9cb7402f03a",
		"type": "comment",
		"body": "Adipisci dolore veritatis velit magni.",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Jaida.Von",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 60
	}, {
		"id": "f725b92e-0646-41c1-9fc6-85bbd256900d",
		"type": "comment",
		"body": "Adipisci dolore veritatis velit magni.",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Jaida.Von",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 60
	}]
}
```

`POST /api/comment`

Create a new comment.

Example response:

```json
{
    "error": false,
    "data": {
        "id": "f725b92e-0646-41c1-9fc6-85bbd256900d"
    }
}
```


## Search API

`GET /api/search`

Retrieve a list of stories by a query

Example response:

```json
{
	"error": false,
	"data": [{
		"id": "f725b92e-0646-41c1-9fc6-85bbd256900d",
		"type": "story",
		"title": "Adipisci dolore veritatis velit magni.",
		"url": "http://koby.net",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Jaida.Von",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"investment": "BTC",
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 60
		
	}, {
		"id": "f725b92e-0646-41c1-9fc6-85bbd256900d",
		"type": "story",
		"title": "Adipisci dolore veritatis velit magni.",
		"url": "http://koby.net",
		"author": {
			"id": "d94e2e6a-7a11-4494-810e-055e58293538",
			"type": "user",
			"username": "Jaida.Von",
			"email":"Marine@gmail.com",
			"date":"2016-02-28T04:46:00.384Z",
			"reputation": 371,
			"watchlist": ["TSLA", "WMT", "AMZN"],
			"portfolio": {
				"long": ["APPL", "GOOGL", "MSFT"],
				"short": ["TSLA"]
			}
		},
		"investment": "BTC",
		"created": 1604955535,
		"votes": 9,
		"score": 4,
		"replies": 60
	}]
}
```

```json
{
    "error": true,
    "message":  "no query parameter"
}
```


# Part 2: Front-end Implementation

This is the homepage, which lists some stories which are read from a Javascript API. Each of the stories can be upvoted or downvoted by users.

![](./docs/screenshots/milestone-2/index.png)

This is the profile page, which displays the stories, comments, and portfolio for the user. They can also vote on comment and stories, as well as reply here.

![](./docs/screenshots/milestone-2/profile.png)

This is the story page, which displays all of the comments posted on a story. From this page, users are able to submit new comments, submit replies to existing comments, vote on the story, and vote on existing comments.

![](./docs/screenshots/milestone-2/story.png)

This is the admin page, which allows admin users to delete users and submissions.

![](./docs/screenshots/milestone-2/admin.png)

This is the submit page, which allows users to create new stories on the site.

![](./docs/screenshots/milestone-2/submit.png)

This is the investments page, which allows users to add investments to their watchlist, and buy and sell them in their virtual portfolio. They can also vote on stories from this page.

![](./docs/screenshots/milestone-2/investments.png)

# Part 3: Deployment

Link to hosted application in Heroku: https://stock-exchange-326.herokuapp.com/

# Conclusion

## Division of Labor

Kyle
* investment
* story
* error
* wrapper

Hannah D.
* login
* sign up
* search results
* submit

Hannah H.
* admin submissions
* admin users
* profile
* homepage

**We all made contributions to api.js**