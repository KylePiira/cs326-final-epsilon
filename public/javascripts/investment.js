window.addEventListener('load', async function() {
    const watchButton = document.getElementById('watch');
    watchButton.addEventListener('click', async function() {
        if (watchButton.innerText === 'Watch') {
            watchButton.innerText = 'Watched';
            const watchlist = await (await fetch('/api/user/' + window.localStorage.getItem('username') + '/watchlist')).json().data;
            watchlist.push(investmentId);
            fetch('/api/user/' + window.localStorage.getItem('username') + '/watchlist', {
                method: 'POST',
                data: JSON.stringify(watchlist)
            });
        } else {
            watchButton.innerText = 'Watch';
        }
    });
});