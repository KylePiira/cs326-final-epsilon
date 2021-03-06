'use strict';
/* <div class="comment row mt-3">
    <div class="col-1 pl-0 pr-0">
        <div class="votes">
            <div class="upvote"></div>
            <p class="mt-2 mb-2 badge badge-light">1</p>
            <div class="downvote"></div>
        </div>
    </div>
    <div class="col-11 pl-0">
        <span><a href="#">john</a> - <i>1 minutes ago</i></span>
        <p>Sit ipsam fugit nulla nihil ratione aut aut. Voluptatem harum nemo alias nam deleniti excepturi. Quaerat corporis enim ipsum vel fuga quo. In assumenda vel nesciunt eius voluptatem eum. </p>
        <span class="btn btn-sm btn-primary">reply</span>
    </div>
</div> */

function buildComment(comm) {
    // Create all the elements
    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.classList.add('row');
    comment.classList.add('mt-3');
    // Left column
    const leftColumn = document.createElement('div');
    leftColumn.classList.add('col-1');
    leftColumn.classList.add('pl-0');
    leftColumn.classList.add('pr-0');
    // Votes
    const votes = document.createElement('div');
    votes.classList.add('votes');
    // Upvote
    const upvote = document.createElement('div');
    upvote.classList.add('upvote');
    // Downvote
    const downvote = document.createElement('div');
    downvote.classList.add('downvote');
    // Vote count
    const voteCount = document.createElement('p');
    voteCount.classList.add('mt-2');
    voteCount.classList.add('mb-2');
    voteCount.classList.add('badge');
    voteCount.classList.add('badge-light');
    // Right column
    const rightColumn = document.createElement('div');
    rightColumn.classList.add('col-11');
    rightColumn.classList.add('pl-0');
    // Username/Timestamp
    const metadata = document.createElement('span');
    // Username
    const username = document.createElement('a');
    // Timestamp
    const age = document.createElement('i');
    // Comment contents
    const body = document.createElement('p');
    // Button to reply
    const replyButton = document.createElement('span');
    replyButton.classList.add('btn');
    replyButton.classList.add('btn-sm');
    replyButton.classList.add('btn-primary');
    // Button to show replies
    const showRepliesButton = document.createElement('span');
    showRepliesButton.classList.add('btn');
    showRepliesButton.classList.add('btn-sm');
    showRepliesButton.classList.add('btn-white');
    // Button to delete
    const deleteButton = document.createElement('span');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-sm');
    deleteButton.classList.add('btn-white');
    deleteButton.classList.add('d-none');
    // Form to type the reply
    const replyForm = document.createElement('form');
    replyForm.classList.add('d-none');
    // Text box to type the reply
    const replyTextarea = document.createElement('textarea');
    replyTextarea.setAttribute('placeholder', 'Remember to be civil...');
    replyTextarea.classList.add('form-control');
    replyTextarea.classList.add('mt-1');
    // Button to submit the comment
    const replySubmitButton = document.createElement('span');
    replySubmitButton.classList.add('btn');
    replySubmitButton.classList.add('btn-sm');
    replySubmitButton.classList.add('btn-primary');
    replySubmitButton.classList.add('mt-1');
    // Replies area
    const replies = document.createElement('div');
    replies.classList.add('d-none');

    // Put it all together
    // Metadata
    metadata.appendChild(username);
    metadata.appendChild(age);

    // Reply form
    replyForm.appendChild(replyTextarea);
    replyForm.appendChild(replySubmitButton);

    // The columns
    comment.appendChild(leftColumn);
    comment.appendChild(rightColumn);

    // Left column
    leftColumn.appendChild(votes)
    votes.appendChild(upvote);
    votes.appendChild(voteCount);
    votes.appendChild(downvote);

    // Right column
    rightColumn.appendChild(metadata);
    rightColumn.appendChild(body);
    rightColumn.appendChild(replyButton);
    rightColumn.appendChild(showRepliesButton);
    if (comm.replies === 0) {
        showRepliesButton.classList.add('d-none');
    }
    rightColumn.appendChild(deleteButton);
    rightColumn.appendChild(replyForm);
    rightColumn.appendChild(replies);

    // Fill in the contents
    voteCount.innerText = comm.votes;
    // username.innerText = comm.author.username;
    body.innerText = comm.body;
    replyButton.innerText = 'reply';
    showRepliesButton.innerText = `show ${comm.replies} replies`;
    deleteButton.innerText = 'delete';
    replySubmitButton.innerText = 'reply';
    age.innerText = ' - ' + new Date(comm.created).toLocaleDateString("en-US");

    // Get the author information
    fetch(`/api/user/${comm.author}`)
        .then((res) => res.json())
        .then(async (author) => {
            username.setAttribute('href', `/user?id=${author.data.id}`);
            username.innerText = author.data.username;
            const userId = (await (await fetch(`/api/userId`, {credentials: 'same-origin'})).json()).data.id;
            if (author.data.id === userId) {
                deleteButton.classList.remove('d-none');
            }
        });

    // Make everything interactive
    replyButton.addEventListener('click', () => {
        if (replyButton.innerText === 'reply') {
            replyButton.innerText = 'cancel';
            replyForm.classList.remove('d-none');
        } else {
            replyButton.innerText = 'reply';
            replyForm.classList.add('d-none');
        }
    });

    showRepliesButton.addEventListener('click', async () => {
        if (showRepliesButton.innerText === `show ${comm.replies} replies`) {
            replies.innerHTML = '';
            const response = (await (await fetch(`/api/comment/${comm.id}/comments`)).json()).data;
            for (let i = 0; i < response.length; i++) {
                replies.appendChild(buildComment(response[i]));
            }
            replies.classList.remove('d-none');
            showRepliesButton.innerText = 'hide replies';
        } else {
            replies.classList.add('d-none');
            showRepliesButton.innerText = `show ${comm.replies} replies`;
            replies.innerHTML = '';
        }
    });

    deleteButton.addEventListener('click', async () => {
        fetch(`/api/comment/${comm.id}`, {
            method: 'DELETE'
        });
        comment.remove();
    });

    replySubmitButton.addEventListener('click', async () => {
        replyForm.classList.add('d-none');
        const replyCommentId = (await (await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: replyTextarea.value,
                parent: comm.id,
            })
        })).json()).data.id;
        const replyComment = (await (await fetch(`/api/comment/${replyCommentId}`)).json()).data
        replies.insertBefore(
            // eslint-disable-next-line no-unused-vars
            buildComment(replyComment), 
            replies.firstChild
        );
        comm.replies++;
        if (showRepliesButton.innerText !== 'hide replies') {
            showRepliesButton.innerText = `show ${comm.replies} replies`;
        }
        showRepliesButton.classList.remove('d-none');
        replyTextarea.value = '';
        replyButton.innerText = 'reply';
    });

    upvote.addEventListener('click', async () => {
        const error = (await (await fetch(`/api/comment/${comm.id}/upvote`, {
            method: 'POST',
        })).json()).error;
        if (!error) {
            voteCount.innerText = Number(voteCount.innerText) + 1;
        }
        const balance = document.getElementById('balance');
        if (balance) {
            // eslint-disable-next-line no-undef
            buildBalance(balance);
        }
    });

    downvote.addEventListener('click', async () => {
        const error = (await (await fetch(`/api/comment/${comm.id}/downvote`, {
            method: 'POST',
        })).json()).error;
        if (!error) {
            voteCount.innerText = Number(voteCount.innerText) - 1;
        }
        const balance = document.getElementById('balance');
        if (balance) {
            // eslint-disable-next-line no-undef
            buildBalance(balance);
        }
    });

    return comment;
}