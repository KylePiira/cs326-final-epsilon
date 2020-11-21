'use strict';
window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const investmentId = urlParams.get('id') || 'trending';

    if (investmentId !== 'trending') {
        document.title = `${investmentId} - Stock Exchange`;
    }
    const stories = (await (await fetch(`/api/stories/${investmentId}`)).json()).data;
    for (const sub of stories) {
        // eslint-disable-next-line no-undef
        const submission = buildSubmission(sub);
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        listItem.appendChild(submission);
        document.getElementById('stories').appendChild(listItem);
    }
})