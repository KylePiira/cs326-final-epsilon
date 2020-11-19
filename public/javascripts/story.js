window.addEventListener('load', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('id');
    // Insert the story
    const story = (await (await fetch(`/api/story/${storyId}`)).json()).data;
    document.getElementById('story').appendChild(buildSubmission(story));
    document.title = `${story.title} - Stock Exchange`;
    // Insert the comments
    const comments = (await (await fetch(`/api/story/${storyId}/comments`)).json()).data;
    comments.sort((a, b) => a.score - b.score);
    for (const comm of comments) {
        const commentElement = buildComment(comm);
        document.getElementById('comments').appendChild(commentElement);
    }

    // Top level comment box
    document.getElementById('comment-submit').addEventListener('click', async function() {
        const replyCommentId = (await (await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: document.getElementById('comment-box').value,
                parent: storyId,
            })
        })).json()).data.id;
        const replyComment = (await (await fetch(`/api/comment/${replyCommentId}`)).json()).data
        document.getElementById('comments').insertBefore(
            buildComment(replyComment), 
            document.getElementById('comments').firstChild
        );
        document.getElementById('comment-box').value = '';
    })
})