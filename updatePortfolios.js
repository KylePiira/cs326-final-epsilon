const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);

async function updateUser(userId) {
    const investments = await db.any('SELECT * FROM UserInvestments WHERE type in (\'long\', \'short\')');
    for (const investment of investments) {
        
    }
}