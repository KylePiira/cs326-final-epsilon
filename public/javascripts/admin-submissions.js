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
                btn.textContent = element[key];
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
        btn.setAttribute('onclick', 'removeRow(this)'); 
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

function removeRow(btn) {
    const table = document.querySelector('table');
    table.deleteRow(btn.parentNode.parentNode.rowIndex); 
}


