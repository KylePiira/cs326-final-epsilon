window.addEventListener('load', async () => {
    // Do the submissions
    const submissions = (await (await fetch(`/api/user/${userId}/submissions`)).json()).data;
    for (const sub of submissions) {
        const submission = buildSubmission(sub);
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        listItem.appendChild(submission);
        document.getElementById('submission-list').appendChild(listItem);
    }
    // Do the comments
    const comments = (await (await fetch(`/api/user/${userId}/comments`)).json()).data;
    for (const comm of comments) {
        const comment = buildComment(comm);
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        listItem.appendChild(comment);
        document.getElementById('comment-list').appendChild(listItem);
    }
    // Do the portfolio
    const profile = (await (await fetch(`/api/user/${userId}`)).json()).data;
    for (const ticker of profile.portfolio.long) {
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        const link = document.createElement('a');
        link.classList.add('text-success');
        link.innerText = ticker;
        link.setAttribute('href', `/i/${ticker}`);
        listItem.appendChild(link);
        document.getElementById('long-list').appendChild(listItem);
    }

    for (const ticker of profile.portfolio.short) {
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        const link = document.createElement('a');
        link.classList.add('text-danger');
        link.innerText = ticker;
        link.setAttribute('href', `/i/${ticker}`);
        listItem.appendChild(link);
        document.getElementById('short-list').appendChild(listItem);
    }
    
    document.getElementById('username').innerText = profile.username;
    document.title = `${profile.username}'s Profile - Stock Exchange`;
})