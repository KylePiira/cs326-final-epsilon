async function buildWatchlist(list) {
    const watchlist = (await (await fetch(`/api/user/${window.localStorage.getItem('username')}/watchlist`)).json()).data;
    list.innerHTML = '';
    for (const ticker of watchlist) {
        li = document.createElement('li');
        li.classList.add('list-group-item');
        a = document.createElement('a');
        a.classList.add('text-primary')
        a.setAttribute('href', `/i/${ticker}`);
        a.innerText = ticker;
        li.appendChild(a);
        list.appendChild(li);
    }
}

window.addEventListener('load', async () => buildWatchlist(document.getElementById('watchlist')));

async function buildLongs(list) {
    const longs = (await (await fetch(`/api/user/${window.localStorage.getItem('username')}/long`)).json()).data;
    list.innerHTML = '';
    for (const ticker of longs) {
        li = document.createElement('li');
        li.classList.add('list-group-item');
        a = document.createElement('a');
        a.classList.add('text-success')
        a.setAttribute('href', `/i/${ticker}`);
        a.innerText = ticker;
        li.appendChild(a);
        list.appendChild(li);
    }
}

window.addEventListener('load', async () => buildLongs(document.getElementById('long')));

async function buildShorts(list) {
    const shorts = (await (await fetch(`/api/user/${window.localStorage.getItem('username')}/short`)).json()).data;
    list.innerHTML = '';
    for (const ticker of shorts) {
        li = document.createElement('li');
        li.classList.add('list-group-item');
        a = document.createElement('a');
        a.classList.add('text-danger')
        a.setAttribute('href', `/i/${ticker}`);
        a.innerText = ticker;
        li.appendChild(a);
        list.appendChild(li);
    }
}

window.addEventListener('load', async () => buildShorts(document.getElementById('short')));