window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get('q')) {
        alert('No search query');
    }
    document.title = `${urlParams.get('q')} - Stock Exchange`;
    const results = (await (await fetch(`/api/search?q=${urlParams.get('q')}`)).json()).data;
    for (const sub of results) {
        const submission = buildSubmission(sub);
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        listItem.appendChild(submission);
        document.getElementById('stories').appendChild(listItem);
    }
})