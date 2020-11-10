window.addEventListener('load', async function() {
    const watchButton = document.getElementById('watch');
    const watchlist = document.getElementById('watchlist');
    watchButton.addEventListener('click', async function() {
        if (watchButton.innerText === 'Watch') {
            watchButton.innerText = 'Watched';
            await fetch(`/api/user/${window.localStorage.getItem('username')}/watchlist`, {
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
            fetch(`/api/user/${window.localStorage.getItem('username')}/watchlist`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: investmentId,
                })
            });
        }
        buildWatchlist(watchlist);
    });

    const buyButton = document.getElementById('buy');
    const sellButton = document.getElementById('sell');
    const long = document.getElementById('long');
    const short = document.getElementById('short');
    buyButton.addEventListener('click', async function() {
        fetch(`/api/user/${window.localStorage.getItem('username')}/long`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: investmentId,
            })
        })
        fetch(`/api/user/${window.localStorage.getItem('username')}/short`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: investmentId,
            })
        })

        buildLongs(long);
        buildShorts(short);
    });

    sellButton.addEventListener('click', async function() {
        fetch(`/api/user/${window.localStorage.getItem('username')}/long`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: investmentId,
            })
        })
        fetch(`/api/user/${window.localStorage.getItem('username')}/short`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: investmentId,
            })
        })

        buildLongs(long);
        buildShorts(short);
    })
});