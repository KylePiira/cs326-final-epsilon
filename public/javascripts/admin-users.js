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
    
    for (let element of data){
        const row = table.insertRow();
        for (let key in element){
            const cell = row.insertCell();
            console.log(key);
            const text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
        // delete button
        const cell = row.insertCell();
        cell.className = "btn-group";
        
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
            const userId = element['id'];
            await fetch(`/api/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            table.deleteRow(btnDelete.parentNode.parentNode.rowIndex); 
        });

        


        
    }
}
function buildTableHead(table){
    const data  = ['User ID','Username', 'Reputation','Date created','Admin','Power','Action'];
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
