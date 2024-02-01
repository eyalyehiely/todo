
// plus button
let container = document.createElement('div');
let plusButton = document.createElement('button');
plusButton.id = 'plus';
plusButton.textContent = 'Create a new task ➕'

container.appendChild(document.getElementById('plus'));
container.appendChild(plusButton);

// add cards functions
plusButton.addEventListener('click',()=>{
    createCard();
    plusButton.disabled=true;
})



let cardDiv = document.createElement('div');

function createCard(){
    // creating new card

let name = document.createElement('input');
name.placeholder = 'Name';
name.id = 'name'
name.type = 'string'

let description = document.createElement('input');
description.placeholder = 'Description';
description.id = 'description'


let finishDate = document.createElement('input');
finishDate.type='date';
finishDate.placeholder = 'Finish Date';
finishDate.id ='finishDate'


let executeBy = document.createElement('input');
executeBy.placeholder = 'Execute By';
executeBy.id = 'executeBy';


//appending inputs
cardDiv.appendChild(name);
cardDiv.appendChild(description);
cardDiv.appendChild(executeBy);
cardDiv.appendChild(finishDate);




// styling
cardDiv.style.width = '40vw';
cardDiv.style.height = '30vh';
cardDiv.style.border = '1px solid silver';
cardDiv.style.backgroundColor='ghostwhite';



// save button
let saveButton = document.createElement('button');
saveButton.id = 'save';
saveButton.textContent = '✅' ;




saveButton.addEventListener('click', () => {
    axios.post('/api/create', {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        finishDate: document.getElementById('finishDate').value,  
        executeBy:document.getElementById('executeBy').value,  
  
    }).then(() =>{
        location.reload()
        window.alert("Task added");
        plusButton.disabled = false;
        card1.style.display='none';
    })
    .catch((error)  => {
    document.getElementById('create').innerHTML = 'Error transpassing tasks. Please try again.';
    })
   
    
}) 
    cardDiv.appendChild(saveButton);
    
    
}

document.body.appendChild(container);
document.body.appendChild(cardDiv);


let tableDiv = document.createElement('div');

function getTasks() {
    axios.get('http://127.0.0.1:8000/api/read').then((response) => {
        if(response.data.tasks.length==0){
            document.getElementById('tasks').innerHTML = 'No Tasks for this user';
        }
        else{
            
            const table = `
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Given Date</th>
                        <th>Finish Date</th>
                        <th>Given By</th>
                        <th>Execute By</th>
                        <th>Complete</th>
                        <th>Updated At</th>
                        <th>Share With</th>
                        <th>Delete</th>
                        <th>Edit Status</th>
                    </tr>
                    ${response.data.tasks.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.description}</td>
                            <td>${item.given_date}</td>
                            <td>${item.finish_date}</td>
                            <td>${item.given_by}</td>
                            <td>${item.execute_by}</td>
                            <td>${item.complete}</td>
                            <td>${item.updated_at}</td>
                            <td>👥</td>
                            <td><button id="${item.id}" name='deleteButton'>🗑️</button></td>
                            <td><button id="${item.id}editButton" name="editButton">📝</button></td>
                        </tr>
                    `)}
                </table>`;
            tableDiv.innerHTML = table;
            document.getElementById('tasks').appendChild(tableDiv);
         
            tableDiv.innerHTML = table

            response.data.tasks.forEach(item => {
                document.getElementById(item.id).addEventListener('click', () => {
                    axios.get(`http://127.0.0.1:8000/api/delete/${item.id}`).then(()=>{
                        window.alert("Task deleted")
                        getTasks()
                    })
                    
            
                })    
            }) 
       
                
            response.data.tasks.forEach(item => {        
            document.getElementById(`${item.id}editButton`).addEventListener('click',()=>{
                let complete = window.prompt('Insert task status');
                
                axios.get(`http://127.0.0.1:8000/api/update/${item.id}`,
                    {
                  
                    complete: complete,
                    })
                        window.alert("Task updated")
                        getTasks()
                    })
                })
        }
            });
                
        document.getElementById('tasks').appendChild(tableDiv);
   
    ;
}

   
   



getTasks();
    

