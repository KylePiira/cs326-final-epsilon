window.addEventListener('load', async () => {
    if (investmentId !== 'all') {
        document.title = `${investmentId} - Stock Exchange`;
    }
    const stories = (await (await fetch(`/api/stories/${investmentId}`)).json()).data;
    for (const sub of stories) {
        const submission = buildSubmission(sub);
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item');
        listItem.appendChild(submission);
        document.getElementById('stories').appendChild(listItem);
    }
})