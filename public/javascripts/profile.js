'use strict';
window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    // Do the submissions
    const submissions = (await (await fetch(`/api/user/${userId}/submissions`)).json()).data;
    for (const sub of submissions) {
        // eslint-disable-next-line no-undef
        const submission = buildSubmission(sub);
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        listItem.appendChild(submission);
        document.getElementById('submission-list').appendChild(listItem);
    }
    // Do the comments
    const comments = (await (await fetch(`/api/user/${userId}/comments`)).json()).data;
    for (const comm of comments) {
        // eslint-disable-next-line no-undef
        const comment = buildComment(comm);
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        listItem.appendChild(comment);
        document.getElementById('comment-list').appendChild(listItem);
    }
    // Do the portfolio
    const long = (await (await fetch(`/api/user/${userId}/long`)).json()).data;
    for (const ticker of long) {
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        const link = document.createElement('a');
        link.classList.add('text-success');
        link.innerText = ticker;
        link.setAttribute('href', `/investment?id=${ticker}`);
        listItem.appendChild(link);
        document.getElementById('long-profile').appendChild(listItem);
    }

    const short = (await (await fetch(`/api/user/${userId}/short`)).json()).data;
    for (const ticker of short) {
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        const link = document.createElement('a');
        link.classList.add('text-danger');
        link.innerText = ticker;
        link.setAttribute('href', `/investment?id=${ticker}`);
        listItem.appendChild(link);
        document.getElementById('short-profile').appendChild(listItem);
    }
    
    const profile = (await (await fetch(`/api/user/${userId}`)).json()).data;
    document.getElementById('username').innerText = profile.username;
    document.title = `${profile.username}'s Profile - Stock Exchange`;
})