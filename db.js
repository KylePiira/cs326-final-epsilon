const pgp = require('pg-promise')();
const minicrypt = require('./miniCrypt.js');
const db = pgp(process.env.DATABASE_URL);
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
