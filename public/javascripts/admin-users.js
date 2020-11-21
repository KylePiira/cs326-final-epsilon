'use strict';
window.addEventListener('load', async () => {
    const response = await fetch(`/api/users/all`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const users = await response.json();
    const table = document.querySelector('table');
    buildTableUsers(table, users.data);
    buildTableHead(table);
    console.log(users.data);
    
    document.getElementById('submit-edit').addEventListener('click', async () => {
        const response = await (await fetch('/api/user/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                is_admin: document.getElementById('is_admin').value,
            })
        })).json();
        window.location.href = "/admin/users";
    });
})
function buildTableUsers(table,data){
    table.className ="table table-striped";
    
    for (let element of data){
        const row = table.insertRow();
        for (let key in element){
            if (key !== 'is_deleted'){
                const cell = row.insertCell();
                console.log(key);
                const text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
        // delete button
        const cell = row.insertCell();
        cell.className = "btn-group";
        
        const btnDelete = document.createElement('button');
        btnDelete.type = "button";
        //btnDelete.classList.add("btn btn-success btn-sm rounded-0");
        btnDelete.className = "fa fa-trash";
        
        // edit button
        const btnEdit = document.createElement('button');
        btnEdit.type = "button";
        btnEdit.className = "fa fa-edit";
        cell.appendChild(btnDelete);
        cell.appendChild(btnEdit);
        
        btnDelete.addEventListener('click', async function(){
            const table = document.querySelector('table');
            const userId = element['id'];
            await fetch(`/api/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            table.deleteRow(btnDelete.parentNode.parentNode.rowIndex); 
        });

        //data-toggle="modal" data-target="#addUserModal"
        btnEdit.setAttribute('data-toggle','modal');
        btnEdit.setAttribute('data-target','#EditUserModal');
        btnEdit.addEventListener('click' , function(){
            document.getElementById('username').value = element['username'];
            document.getElementById('is_admin').value = element['is_admin'];
        });
    }
}
function buildTableHead(table){
    const data  = ['User ID','Username', 'Reputation','Date created','Admin','Action'];
    const thead = table.createTHead();
    thead.className = "thead-light";
    const row = thead.insertRow();
    for (let key of data) {
        const th = document.createElement("th");
        const text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
