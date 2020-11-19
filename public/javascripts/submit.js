window.addEventListener('load', () => {
    document.getElementById('submit').addEventListener('click', async () => {
        const response = await (await fetch('/api/story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                url: document.getElementById('url').value,
                investment: document.getElementById('stock').value,
            })
        })).json();
        window.location.href = `/story?id=${response.data.id}`;
    });
});