/* <div class="row submission">
    <div class="col-1 pl-0 pr-0">
        <div class="votes">
            <div class="upvote"></div>
            <p class="mt-2 mb-2 badge badge-light">5</p>
            <div class="downvote"></div>
        </div>
    </div>
    <div class="col-11 pl-0">
        <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</h5>
        <span class="badge badge-secondary">example.com</span>
        <span>submitted 10 minutes ago by frank</span>
    </div>
</div> */


function buildSubmission(sub) {
    // Submission
    const submission = document.createElement('div');
    submission.classList.add('row');
    submission.classList.add('submission');
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
    // Title/Headline
    const title = document.createElement('a');
    title.setAttribute('href', sub.url);
    title.classList.add('card-title');
    title.classList.add('h5');
    // Break
    const br = document.createElement('br');
    // Domain name
    const domain = document.createElement('span');
    domain.classList.add('badge');
    domain.classList.add('badge-secondary');
    // Age
    const age = document.createElement('span');
    // Username
    const username = document.createElement('a');
    fetch(`/api/user/${sub.author}`)
        .then((res) => res.json())
        .then((author) => {
            username.setAttribute('href', `/user?id=${author.data.id}`);
            username.innerText = author.data.username;
        });
    // Investmnet Description
    const investmentDesc = document.createElement('span');
    // Investment
    const investment = document.createElement('a');
    investment.setAttribute('href', `/investment?id=${sub.investment}`);
    // Comment Description
    const commentDesc = document.createElement('span');
    // Comments
    const comments = document.createElement('a');
    comments.setAttribute('href', `/story?id=${sub.id}`);

    // Put it all together
    // The columns
    submission.appendChild(leftColumn);
    submission.appendChild(rightColumn);

    // Left column
    leftColumn.appendChild(votes)
    votes.appendChild(upvote);
    votes.appendChild(voteCount);
    votes.appendChild(downvote);

    // Right column
    rightColumn.appendChild(title);
    rightColumn.appendChild(br);
    rightColumn.appendChild(domain);
    rightColumn.appendChild(age);
    rightColumn.appendChild(username);
    rightColumn.appendChild(investmentDesc);
    rightColumn.appendChild(investment);
    rightColumn.appendChild(commentDesc);
    rightColumn.appendChild(comments);

    // Fill in the contents
    title.innerText = sub.title;
    domain.innerText = new URL(sub.url).hostname;
    voteCount.innerText = sub.votes;
    age.innerText = ' submitted on ' + new Date(sub.created).toLocaleDateString("en-US") + ' by ';
    investmentDesc.innerText = ' in ';
    investment.innerText = sub.investment;
    commentDesc.innerText = ', it has ';
    comments.innerText = sub.replies + ' comments';

    // Make everything interactive
    upvote.addEventListener('click', async () => {
        const error = (await (await fetch(`/api/story/${sub.id}/upvote`, {
            method: 'POST',
        })).json()).error;
        if (!error) {
            voteCount.innerText = Number(voteCount.innerText) + 1;
        }
        const balance = document.getElementById('balance');
        if (balance) {
            buildBalance(balance);
        }
    })

    downvote.addEventListener('click', async () => {
        const error = (await (await fetch(`/api/story/${sub.id}/downvote`, {
            method: 'POST',
        })).json()).error;
        if (!error) {
            voteCount.innerText = Number(voteCount.innerText) - 1;
        }
        const balance = document.getElementById('balance');
        if (balance) {
            buildBalance(balance);
        }
    })

    return submission;
}