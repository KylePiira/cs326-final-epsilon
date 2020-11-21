'use strict';
window.addEventListener('load', async function() {
    const response = (await (await fetch(`/api/userId`, {credentials: 'same-origin'})).json());
    if (response.error) {
        document.getElementById('account-nav-link').classList.add('d-none');
    } else {
        const userId = response.data.id;
        document.getElementById('profile-nav-link').setAttribute('href', `/user?id=${userId}`);
        const profile = (await (await fetch(`/api/user/${userId}`)).json()).data;
        if (profile.is_admin) {
            document.getElementById('admin-nav-link').classList.remove('d-none');
        }
    }
});