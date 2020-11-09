window.addEventListener('load', async function() {
    const watchButton = document.getElementById('watch');
    watchButton.addEventListener('click', async function() {
        if (watchButton.innerText === 'Watch') {
            watchButton.innerText = 'Watched';
            const watchlist = await (await fetch(`/api/user/${window.localStorage.getItem('username')}/watchlist`)).json();
            watchlist.data.push(investmentId);
            fetch(`/api/user/${window.localStorage.getItem('username')}/watchlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(watchlist.data)
            });
        } else {
            watchButton.innerText = 'Watch';
            const watchlist = await (await fetch(`/api/user/${window.localStorage.getItem('username')}/watchlist`)).json();
            watchlist.data.push(investmentId);
            fetch(`/api/user/${window.localStorage.getItem('username')}/watchlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(watchlist.data)
            });
        }
    });
});