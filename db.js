const pgp = require('pg-promise')();
const minicrypt = require('./miniCrypt.js');
const db = pgp(process.env.DATABASE_URL || 'postgres://waojpihrrmzibf:5cc79d3afc002bb0bf6ce2914f0b444774764784d99dc7555cf2e19faea05838@ec2-34-237-236-32.compute-1.amazonaws.com:5432/ddi8pfkuf4vocj?ssl=True');
module.exports.db = db;
const mc = new minicrypt();
/*
Users
*/
module.exports.user = {}
// Create User
module.exports.user.create = async function(user) {
    try {
        return (await db.one('INSERT INTO Users (username, password) VALUES (${username}, ${password}) RETURNING id', {
            username: user.username,
            password: mc.hash(user.password).join(':'),
        })).id;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Read User
module.exports.user.read = async function(user) {
    let metadata = {}
    try {
        if (user.id) {
            metadata = await db.one('SELECT * FROM Users WHERE id=${id}', {
                id: user.id
            });
        } else {
            metadata = await db.one('SELECT * FROM Users WHERE username=${username}', {
                username: user.username,
            })
        }
        // Do not return the password
        delete metadata.password;
        return metadata;
    } catch (error) {
        console.error(error);
        return false;
    }    
}
// Update User
module.exports.user.update = async function(user) {
    try {
        db.none('UPDATE Users SET username=${username}, password=${password} WHERE id=${id}', {
            id: user.id,
            username: user.username,
            password: mc.hash(user.password).join(':'),
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Delete User
module.exports.user.delete = async function(user) {
    try {
        db.none('DELETE FROM Users WHERE id=${id}', {
            id: user.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Exists User
module.exports.user.exists = async function(user) {
    try {
        if (user.id) {
            return Number((await db.one('SELECT COUNT(*) FROM Users WHERE id=${id}', {
                id: user.id
            })).count) > 0;
        } else if (user.username) {
            return Number((await db.one('SELECT COUNT(*) FROM Users WHERE username=${username}', {
                username: user.username
            })).count) > 0;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Validate User
module.exports.user.validate = async function(user) {
    try {
        let metadata = {};
        if (user.id) {
            metadata = await db.one('SELECT * FROM Users WHERE id=${id}', {
                id: user.id
            });
        } else {
            metadata = await db.one('SELECT * FROM Users WHERE username=${username}', {
                username: user.username,
            })
        }
        const salt = metadata.password.split(':')[0];
        const hash = metadata.password.split(':')[1];
        if (mc.check(user.password, salt, hash)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }  
}
// Retrieve a list of submissions by a user
module.exports.user.submissions = async function(user) {
    try {
        return await db.any('SELECT * FROM Submissions WHERE author=${id} ORDER BY created DESC', {
            id: user.id
        })
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Retrieve a list of comments by a user
module.exports.user.comments = async function(user) {
    try {
        return await db.any('SELECT * FROM Comments WHERE author=${id} ORDER BY created DESC', {
            id: user.id
        })
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Retrive a list of symbols in a user's watchlist
module.exports.user.watchlist = async function(user) {
    try {
        const tickers = []
        const results = await db.any('SELECT investment FROM UserInvestments WHERE author=${user} AND type=\'watchlist\'', {
            user: user.id
        })
        for (const ticker of results) {
            tickers.push(ticker.investment);
        }
        return tickers;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Retrive a list of symbols that a user is long
module.exports.user.long = async function(user) {
    try {
        const tickers = []
        const results = await db.any('SELECT investment FROM UserInvestments WHERE author=${user} AND type=\'long\'', {
            user: user.id
        })
        for (const ticker of results) {
            tickers.push(ticker.investment);
        }
        return tickers;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Retrive a list of symbols that a user is short
module.exports.user.short = async function(user) {
    try {
        const tickers = []
        const results = await db.any('SELECT investment FROM UserInvestments WHERE author=${user} AND type=\'short\'', {
            user: user.id
        })
        for (const ticker of results) {
            tickers.push(ticker.investment);
        }
        return tickers;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/*
Submissions
*/
module.exports.submission = {}
// Create Submission
module.exports.submission.create = async function(submission) {
    try {
        return (await db.one('INSERT INTO Submissions (author, title, url, investment) VALUES (${author}, ${title}, ${url}, ${investment}) RETURNING id', {
            author: submission.author,
            title: submission.title,
            url: submission.url,
            investment: submission.investment,
        })).id;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Read Submission
module.exports.submission.read = async function(submission) {
    try {
        return await db.one('SELECT * FROM Submissions WHERE id=${id}', {
            id: submission.id
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Update Submission
module.exports.submission.update = async function(submission) {
    try {
        db.none('UPDATE Submissions SET title=${title}, url=${url}, investment=${investment} WHERE id=${id}', {
            id: submission.id,
            title: submission.title,
            url: submission.url,
            investment: submission.investment,
        })
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Delete Submission
module.exports.submission.delete = async function(submission) {
    try {
        db.none('DELETE FROM Submissions WHERE id=${id}', {
            id: submission.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Exists Submission
module.exports.submission.exists = async function(submission) {
    try {
        return Number((await db.one('SELECT COUNT(*) FROM Submissions WHERE id=${id}', {
            id: submission.id
        })).count) > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Increment Replies
module.exports.submission.reply = async function(submission) {
    try {
        db.none('UPDATE Submissions SET replies=replies + 1 WHERE id=${id}', {
            id: submission.id
        })
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Upvote Submission
module.exports.submission.upvote = async function(submission) {
    try {
        db.none('UPDATE Submissions SET votes=votes + 1 WHERE id=${id}', {
            id: submission.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Downvote Submission
module.exports.submission.downvote = async function(submission) {
    try {
        db.none('UPDATE Submissions SET votes=votes - 1 WHERE id=${id}', {
            id: submission.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Retrieve comments for Subission
module.exports.submission.comments = async function(submission) {
    try {
        return await db.any('SELECT * FROM Comments WHERE parent=${id}', {
            id: submission.id
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}

/*
Submissions
*/
module.exports.submission = {}
// Create Submission
module.exports.submission.create = async function(submission) {
    try {
        return (await db.one('INSERT INTO Submissions (author, title, url, investment) VALUES (${author}, ${title}, ${url}, ${investment}) RETURNING id', {
            author: submission.author,
            title: submission.title,
            url: submission.url,
            investment: submission.investment,
        })).id;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Read Submission
module.exports.submission.read = async function(submission) {
    try {
        return await db.one('SELECT * FROM Submissions WHERE id=${id}', {
            id: submission.id
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Update Submission
module.exports.submission.update = async function(submission) {
    try {
        db.none('UPDATE Submissions SET title=${title}, url=${url}, investment=${investment} WHERE id=${id}', {
            id: submission.id,
            title: submission.title,
            url: submission.url,
            investment: submission.investment,
        })
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Delete Submission
module.exports.submission.delete = async function(submission) {
    try {
        db.none('DELETE FROM Submissions WHERE id=${id}', {
            id: submission.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Exists Submission
module.exports.submission.exists = async function(submission) {
    try {
        return Number((await db.one('SELECT COUNT(*) FROM Submissions WHERE id=${id}', {
            id: submission.id
        })).count) > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Increment Replies
module.exports.submission.reply = async function(submission) {
    try {
        db.none('UPDATE Submissions SET replies=replies + 1 WHERE id=${id}', {
            id: submission.id
        })
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Upvote Submission
module.exports.submission.upvote = async function(submission) {
    try {
        db.none('UPDATE Submissions SET votes=votes + 1 WHERE id=${id}', {
            id: submission.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Downvote Submission
module.exports.submission.downvote = async function(submission) {
    try {
        db.none('UPDATE Submissions SET votes=votes - 1 WHERE id=${id}', {
            id: submission.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Retrieve comments for Subission
module.exports.submission.comments = async function(submission) {
    try {
        return await db.any('SELECT * FROM Comments WHERE parent=${id}', {
            id: submission.id
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}

/*
Comments
*/
module.exports.comment = {}
// Create Comment
module.exports.comment.create = async function(comment) {
    try {
        return (await db.one('INSERT INTO Comments (author, parent, body) VALUES (${author}, ${parent}, ${body}) RETURNING id', {
            author: comment.author,
            parent: comment.parent,
            body: comment.body,
        })).id;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Read Comment
module.exports.comment.read = async function(comment) {
    try {
        return await db.one('SELECT * FROM Comments WHERE id=${id}', {
            id: comment.id
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Update Comment
module.exports.comment.update = async function(comment) {
    try {
        db.none('UPDATE Comments SET body=${body} WHERE id=${id}', {
            id: comment.id,
            body: comment.body,
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Delete Comment
module.exports.comment.delete = async function(comment) {
    try {
        db.none('DELETE FROM Comments WHERE id=${id}', {
            id: comment.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Exists Comment
module.exports.comment.exists = async function(comment) {
    try {
        return Number((await db.one('SELECT COUNT(*) FROM Comments WHERE id=${id}', {
            id: comment.id
        })).count) > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Increment Replies
module.exports.comment.reply = async function(comment) {
    try {
        db.none('UPDATE Comments SET replies=replies + 1 WHERE id=${id}', {
            id: comment.id
        })
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Upvote Comment
module.exports.comment.upvote = async function(comment) {
    try {
        db.none('UPDATE Comments SET votes=votes + 1 WHERE id=${id}', {
            id: comment.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Downvote Comment
module.exports.comment.downvote = async function(comment) {
    try {
        db.none('UPDATE Comments SET votes=votes - 1 WHERE id=${id}', {
            id: comment.id
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Retrieve comments for Comments
module.exports.comment.comments = async function(comment) {
    try {
        return await db.any('SELECT * FROM Comments WHERE parent=${id}', {
            id: comment.id
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}

/*
Investments
*/
module.exports.investment = {}
// Create Investment Relationship
module.exports.investment.create = async function(author, ticker, type) {
    try {
        db.none('INSERT INTO UserInvestments (author, investment, type) VALUES (${author}, ${ticker}, ${type})', {
            author: author,
            ticker: ticker,
            type: type,
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Delete Investment Relationship
module.exports.investment.delete = async function(author, ticker, type) {
    try {
        db.none('DELETE FROM UserInvestments WHERE author=${author} AND investment=${investment} AND type=${type}', {
            author: author,
            investment: ticker,
            type: type,
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Follow an Investment
module.exports.investment.watch = async function(author, ticker) {
    try {
        return module.exports.investment.create(author, ticker, 'watchlist');
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Unfollow an Investment
module.exports.investment.unwatch = async function(author, ticker) {
    try {
        return module.exports.investment.delete(author, ticker, 'watchlist');
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Buy an Investment
module.exports.investment.buy = async function(author, ticker) {
    try {
        if (Number((await db.one('SELECT COUNT(*) FROM UserInvestments WHERE author=${author} AND investment=${ticker} AND type=\'short\'', {
            author: author,
            ticker: ticker,
        })).count) > 0) {
            return module.exports.investment.delete(author, ticker, 'short');
        } else if (Number((await db.one('SELECT COUNT(*) FROM UserInvestments WHERE author=${author} AND investment=${ticker} AND type=\'long\'', {
            author: author,
            ticker: ticker,
        })).count) === 0) {
            return module.exports.investment.create(author, ticker, 'long');
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
    
}

// Sell an Investment
module.exports.investment.sell = async function(author, ticker) {
    try {
        if (Number((await db.one('SELECT COUNT(*) FROM UserInvestments WHERE author=${author} AND investment=${ticker} AND type=\'long\'', {
            author: author,
            ticker: ticker,
        })).count) > 0) {
            return module.exports.investment.delete(author, ticker, 'long');
        } else if (Number((await db.one('SELECT COUNT(*) FROM UserInvestments WHERE author=${author} AND investment=${ticker} AND type=\'short\'', {
            author: author,
            ticker: ticker,
        })).count) === 0) {
            return module.exports.investment.create(author, ticker, 'short');
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Retrieve a list of submissions for an investment
module.exports.investment.submissions = async function(ticker) {
    if (ticker === 'all') {
        try {
            return await db.any('SELECT * FROM Submissions');
        } catch (error) {
            console.error(error);
            return false;
        }
    } else {
        try {
            return await db.any('SELECT * FROM Submissions WHERE investment=${investment}', {
                investment: ticker
            })
        } catch (error) {
            console.error(error);
            return false;
        }
    }
     
}

/*
Search Engine
*/
module.exports.search = {}

// Search submissions
module.exports.search.submissions = async function(query) {
    try {
        return await db.any('SELECT * FROM Submissions WHERE title ILIKE ${query}', {
            query: `%${query}%`
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}