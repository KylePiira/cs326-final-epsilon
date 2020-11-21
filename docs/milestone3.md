# Part 1: Database Implementation

## User Table

| Column     | Data Type | Description                                                                   |
| ---------- | --------- | ----------------------------------------------------------------------------- |
| id         | UUID      | The globally unique ID for a user                                             |
| username   | TEXT      | The globally unique username for a user                                       |
| password   | TEXT      | This field stores both the salt and hash of a user's password, like salt:hash |
| reputation | DOUBLE    | The user's reputation on the site                                             |
| created    | TIMESTAMP | When the user created their account                                           |
| is_admin   | BOOLEAN   | Whether the user is an admin                                                  |
| is_deleted | BOOLEAN   | Whether the user has been deleted                                             |

```sql
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE,
    password TEXT,
    reputation DOUBLE PRECISION DEFAULT 100,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    is_admin BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE
);
```

## Comments Table

| Column     | Data Type | Description                                                                          |
| ---------- | --------- | ------------------------------------------------------------------------------------ |
| id         | UUID      | The globally unique ID for a comment                                                 |
| author     | UUID      | The ID of the creator of the comment                                                 |
| parent     | UUID      | The ID of either the submission or a comment which the current comment is a reply to |
| body       | TEXT      | The content of the comment                                                           |
| created    | TIMESTAMP | When the comment was created                                                         |
| votes      | INTEGER   | The net amount of upvotes and downvotes                                              |
| replies    | INTEGER   | The number of direct child comments                                                  |
| is_deleted | BOOLEAN   | Whether the comment has been deleted                                                 |

```sql
CREATE TABLE Comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author UUID,
    parent UUID,
    body TEXT,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    votes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);
```

## Submissions Table

| Column     | Data Type | Description                                       |
| ---------- | --------- | ------------------------------------------------- |
| id         | UUID      | The globally unique ID for a submission           |
| author     | UUID      | The ID of the creator of the submission           |
| title      | TEXT      | The headline for the story                        |
| url        | TEXT      | The url to an external news article about a story |
| investment | TEXT      | The ticker symbol of an investment                |
| created    | TIMESTAMP | When the submission was created                   |
| votes      | INTEGER   | The net amount of upvotes and downvotes           |
| replies    | INTEGER   | The number of direct child comments               |
| is_deleted | BOOLEAN   | Whether the submission has been deleted           |

```sql
CREATE TABLE Submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author UUID,
    title TEXT,
    url TEXT,
    investment TEXT,
    created TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    votes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE
);
```

## User Investments Table

| Column     | Data Type | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| author     | UUID      | The user who is associated with the investment |
| investment | TEXT      | The ticker symbol of an investment             |
| type       | TEXT      | One of watchlist, long, or short               |

```sql
CREATE TABLE UserInvestments (
    author UUID,
    investment TEXT,
    type TEXT
);
```

# Division of Labor

## Kyle

* Database
  
  * User Investments
  
  * Search

* API
  
  * Story
  
  * Stories
  
  * Comment
  
  * Search

* Public JS
  
  * listing.js
  
  * story.js
  
  * investment.js

* Python templating engine

## Hannah H.

* Admin

* Database
  
  * User

* Public JS
  
  * comment.js
  
  * profile.js
  
  * submission.js
  
  * submit.js
  
  * sidebar.js

* Server-side
  
  * gui.js
  
  * miniCrypt.js

## Hannah D.

* Database
  
  * Submission
  
  * Comments

* API
  
  * User
  
  * Users

* Passport

* Deleting Comments

* Removed Nunjucks