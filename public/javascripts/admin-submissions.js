'use strict';
window.addEventListener('load', async () => {
    const response = await fetch(`/api/stories/all`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const stories = await response.json();
    const table = document.querySelector('table');
    buildTableUsers(table, stories.data);
    buildTableHead(table);
    console.log(stories.data);
    

    // create new submissions when click the submit button
    document.getElementById('submission-submit').addEventListener('click', async () => {
        const response = await (await fetch('/api/story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: document.getElementById('title-new').value,
                url: document.getElementById('url-new').value,
                investment: document.getElementById('stock').value,
            })
        })).json();
        window.location.href = "/admin/submissions";
    });
    // edit submissions action when click the save changes button
    document.getElementById('submit-edit').addEventListener('click', async () => {
        const response = await (await fetch('/api/story/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: document.getElementById('storyId').value,
                title: document.getElementById('title').value,
                url: document.getElementById('url').value,
                investment: document.getElementById('investment').value,
            })
        })).json();
        window.location.href = "/admin/submissions";
    });
})
function buildTableUsers(table,data){
    table.className ="table table-striped";
    const fields = ['title','url','score']
    
    for (let element of data){
        const row = table.insertRow();
        for (let key of fields){
            const cell = row.insertCell();
            if (key === 'url'){
                const btn = document.createElement('button');
                btn.type = "button";
                btn.className = "btn btn-link";
                btn.textContent = 'Link';
                btn.addEventListener('click', ()=> {
                    window.open(element[key]);
                });
                cell.appendChild(btn);
            }
            else { 
                const text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
        // delete button
        const cell = row.insertCell();
        const btnDelete = document.createElement('button');
        btnDelete.type = "button";
        //btn.classList.add("btn btn-success btn-sm rounded-0");
        btnDelete.className = "fa fa-trash";
        const btnEdit = document.createElement('button');
        btnEdit.type = "button";
        btnEdit.className = "fa fa-edit";
        cell.appendChild(btnDelete);
        cell.appendChild(btnEdit);
        
       
        btnDelete.addEventListener('click', async function(){
            const table = document.querySelector('table');
            const storyId = element['id'];
            await fetch(`/api/story/${storyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            table.deleteRow(btnDelete.parentNode.parentNode.rowIndex); 
        });

        // edit button
        btnEdit.setAttribute('data-toggle','modal');
        btnEdit.setAttribute('data-target','#EditSubmissionModal');
        btnEdit.addEventListener('click' , function(){
            document.getElementById('storyId').value = element ['id'];
            document.getElementById('title').value = element['title'];
            document.getElementById('url').value = element['url'];
            document.getElementById('investment').value = element['investment'];
        });
    }
}
function buildTableHead(table){
    const data  = ['Title','Link', 'Score','Action'];
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



