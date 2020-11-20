window.addEventListener('load', async () => {
    const response = await fetch(`/api/stories/all`);
    if (!response.ok) {
        console.log(response.error);
        return;
    }
    const users = await response.json();
    const table = document.querySelector('table');
    buildTableUsers(table, users.data);
    buildTableHead(table);
    console.log(users.data);
    document.getElementById('submission-submit').addEventListener('click', async () => {
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
        const btn = document.createElement('button');
        btn.type = "button";
        //btn.classList.add("btn btn-success btn-sm rounded-0");
        btn.className = "fa fa-trash";
        cell.appendChild(btn);
       
        btn.addEventListener('click', async function(){
            const table = document.querySelector('table');
            const storyId = element['id'];
            await fetch(`/api/story/${storyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            table.deleteRow(btn.parentNode.parentNode.rowIndex); 
        });
        // edit button
        
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



