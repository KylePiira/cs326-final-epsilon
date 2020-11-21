'use strict';
window.addEventListener('load', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const investmentId = urlParams.get('id');
    const userId = (await (await fetch(`/api/userId`, {credentials: 'same-origin'})).json()).data.id;

    const watchButton = document.getElementById('watch');
    const watchlist = document.getElementById('watchlist');

    // Check if investment is already in watchlist
    if ((await (await fetch(`/api/user/${userId}/watchlist`)).json()).data.includes(investmentId)) {
        watchButton.innerText = 'Unwatch';
    } else {
        watchButton.innerText = 'Watch';
    }

    watchButton.addEventListener('click', async function() {
        if (watchButton.innerText === 'Watch') {
            watchButton.innerText = 'Unwatch';
            await fetch(`/api/user/${userId}/watchlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: investmentId,
                })
            });
        } else {
            watchButton.innerText = 'Watch';
            await fetch(`/api/user/${userId}/watchlist`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: investmentId,
                })
            });
        }
        // eslint-disable-next-line no-undef
        buildWatchlist(watchlist);
    });

    const buyButton = document.getElementById('buy');
    const sellButton = document.getElementById('sell');
    const long = document.getElementById('long');
    const short = document.getElementById('short');

    buyButton.addEventListener('click', async function() {
        await fetch(`/api/user/${userId}/long`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: investmentId,
            })
        });

        // eslint-disable-next-line no-undef
        buildLongs(long);
        // eslint-disable-next-line no-undef
        buildShorts(short);
    });

    sellButton.addEventListener('click', async function() {
        await fetch(`/api/user/${userId}/short`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: investmentId,
            })
        });

        // eslint-disable-next-line no-undef
        buildLongs(long);
        // eslint-disable-next-line no-undef
        buildShorts(short);
    })
});