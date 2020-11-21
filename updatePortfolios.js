'use strict';
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);
const https = require('https');

const API_KEY = process.env.IEXCLOUD_API_KEY;

async function updateInvestment(ticker) {
    const investments = await db.any('SELECT * FROM UserInvestments WHERE type in (\'long\', \'short\') AND investment=${ticker}', {
        ticker: ticker,
    });
    const api_url = `https://sandbox.iexapis.com/stable/stock/${ticker}/quote/changePercent?token=${API_KEY}`;
    const request = https.request(api_url, (response) => { 
        let data = ''; 
        response.on('data', (chunk) => { 
            data = data + chunk.toString(); 
        }); 
    
        response.on('end', () => {
            // If we found the stock update it
            if (response.statusCode === 200) {
                const percentChange = JSON.parse(data); 
                console.log(ticker, percentChange);
                for (const investment of investments) {
                    // If they short it then we invert the return
                    if (investment.type === 'short') {
                        change *= -1;
                    }
                    db.none('UPDATE Users SET reputation=ROUND(cast((reputation + reputation*${change}) as numeric), 2) WHERE id=${id}', {
                        id: investment.author,
                        change: percentChange,
                    });
                }
            }
        }); 
    }) 

    request.end()
}

async function main() {
    const investments = await db.any('SELECT DISTINCT investment FROM UserInvestments');
    for (const investment of investments) {
        updateInvestment(investment.investment);
    }
}

setTimeout(main, 0);