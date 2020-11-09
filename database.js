import sqlite3 from 'sqlite3';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';

sqlite3.verbose();
const db = new sqlite3.Database('../database.db');

/*
Stories
*/

/*
create_story: creates a new story in the database
Params:
    - title: str
    - url: str
    - investment: str
    - author: User<id, username, password>
*/
export function create_story(title, url, investment, author) {
    db.run('INSERT INTO stories (id, title, url, author, investment, created) VALUES ($id, $title, $url, $author, $investment, $created);', {
        $id: uuidv4(),
        $title: title,
        $url: url,
        $author: author.id,
        $investment: investment,
        $created: Math.floor(Date.now() / 1000),
    })
}

/*
delete_story: deletes a story with given ID
Params:
    - id: uuid
*/
export function delete_story(id) {
    db.run('UPDATE stories SET deleted = 1 WHERE id = "$id";', {$id: id});
}

/*
edit_story: modifies the title, url, investment of story
Params:
    - id: uuid of story to modify
    - title: new title
    - url: new url
    - investment: new investment
    - author: User<id>
*/
export function edit_story(id, title, url, investment) {
    db.run('UPDATE stories SET title = "$title", url = "$url", investment = "$investment" WHERE id = "$id";', {
        $title: title,
        $url: url,
        $investment: investment,
        $id: id,
    });
}

/*
global_top_stories
*/
export function global_top_stories(page) {
    db.all('SELECT * FROM stories ORDER BY score OFFSET $page LIMIT 10', {
        $page: page,
    })
}

/*
vote_story: increase the score of a story by a given amount
Params:
    - id: uuid of story to vote on
    - amount: Number to add to the score
*/
export function vote_story(id, amount) {
    db.get('SELECT created FROM stories WHERE id = "$id";', {
        $id: id,
    }, (err, row) {
        db.run('UPDATE stories SET votes = votes + $amount, score = ((votes + $amount) / $age) WHERE id = "$id";', {
            $amount: amount,
            $id: id,
            $age: Math.floor(Date.now() / 1000) - row.created,
        });
    })  
}

// Helper to upvote
export function upvote_story(id, amount) {
    vote_story(id, amount);
}

// Helper to downvote
export function downvote_story(id) {
    vote_story(id, -amount);
}

/*
Comments
*/

/*
create_comment: creates a new commnet in the database
Params:
    - body: str
    - parent: Story<id> or Comment<id>
    - type: 0 = story, 1 = comment
    - author: User<id>
*/
export function create_comment(body, parent, type, author) {
    db.run('INSERT INTO comments (id, body, author, parent, type, created) VALUES ($id, $body, $author, $parent, $type, $created);', {
        $id: uuidv4(),
        $body: body,
        $author: author.id,
        $parent: parent,
        $type: type,
        $created: Math.floor(Date.now() / 1000),
    })
}

/*
delete_comment: deletes a comment with given ID
Params:
    - id: uuid
*/
export function delete_comment(id) {
    db.run('UPDATE comments SET deleted = 1 WHERE id = "$id";', {$id: id});
}

/*
edit_comment: modifies the title, url, investment, and author of story
Params:
    - id: uuid of story to modify
    - body: str
*/
export function edit_comment(id, body) {
    db.run('UPDATE stories SET body = "$body" WHERE id = "$id";', {
        $body: body,
        $id: id,
    });
}

/*
vote_comment: increase the score of a story by a given amount
Params:
    - id: uuid of story to vote on
    - amount: Number to add to the score
*/
export function vote_comment(id, amount) {
    db.get('SELECT created FROM comments WHERE id = "$id";', {
        $id: id,
    }, (err, row) {
        db.run('UPDATE comments SET votes = votes + $amount, score = ((votes + $amount) / $age) WHERE id = "$id";', {
            $amount: amount,
            $id: id,
            $age: Math.floor(Date.now() / 1000) - row.created,
        });
    })  
}
// Helper to upvote
export function upvote_comment(id, amount) {
    vote_comment(id, amount);
}

// Helper to downvote
export function downvote_comment(id) {
    vote_comment(id, -amount);
}

/*
Users
*/
const saltRounds = 10;

/*
create_user: create a new user account
Params:
    - username: str
    - password: str
*/
export function create_user(username, password) {
    db.get('SELECT username FROM users WHERE username = "$username"', {
        username: username
    }, (err, row) => {
        if (row) {
            throw 'Username already exists';
        } else {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    db.run('INSERT INTO users (id, username, password, reputation, power, created) VALUES ($id, $username, $password, $reputation, $power, $created);', {
                        $id: uuidv4(),
                        $username: username,
                        $password: hash,
                        $reputation: 100,
                        $power: 1,
                        $created: Math.floor(Date.now() / 1000),
                    })
                });
            });
        }
    })
}


/*
change_password_user: change a users password
Params:
    - id: uuid
    - password: str
*/
export function change_password_user(id, password) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db.run('UPDATE users SET password = "$password" WHERE id = "$id";', {
                $password: hash,
                $id: id,
            })
        });
    });
}

/*
delete_user: deletes a user with given ID
Params:
    - id: uuid
*/
export function delete_user(id) {
    db.run('UPDATE users SET deleted = 1 WHERE id = "$id";', {$id: id});
}