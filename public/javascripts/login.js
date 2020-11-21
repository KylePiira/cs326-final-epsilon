'use strict';
window.addEventListener('load', async function() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    document.getElementById('login').addEventListener('click', async function() {
        window.localStorage.setItem('username', username.value);
        window.localStorage.setItem('password', password.value);
        window.location.href = '/u/' + username.value;
    });
});