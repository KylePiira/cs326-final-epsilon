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
    
})

function buildTableUsers(table,data){
    table.className ="table table-striped";
    const fields = ['username','date','email']
    for (let element of data){
        const row = table.insertRow();
        for (let key of fields){
            const cell = row.insertCell();
            const text = document.createTextNode(element[key]);
            cell.appendChild(text);
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
    const data  = ['Username','Date created', 'Email','Action'];
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