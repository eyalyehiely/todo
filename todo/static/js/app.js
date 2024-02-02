
let container = document.createElement('div');

container.appendChild(document.getElementById('plus'));



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
let t = document.createElement('span');
t.textContent = 'Finish date'
finishDate.id ='finishDate';
let currentDate = new Date();
finishDate.min = currentDate.toLocaleString();

let executeBy = document.createElement('input');
executeBy.placeholder = 'Execute By';
executeBy.id = 'executeBy';

// save button
let saveButton = document.createElement('button');
saveButton.id = 'save';
saveButton.textContent = '✅' ;


// executeBy.addEventListener('click',()=>{
//     axios.post(`http://127.0.0.1:8000/api/execute_by`).then((response)=>{
//         for(user in response.users.user){
//             let option = document.createElement('option')
//             option.value = user
//         }

//     })

//     })




//appending inputs
cardDiv.appendChild(name);
cardDiv.appendChild(description);
cardDiv.appendChild(executeBy);
cardDiv.appendChild(t);
cardDiv.appendChild(finishDate);




// styling
cardDiv.style.marginTop='3vh';
cardDiv.style.width = '20vw';
cardDiv.style.height = '24vh';
cardDiv.style.marginLeft = '10vw';
cardDiv.style.border = '1px solid silver';
cardDiv.style.backgroundColor='#dddddd';
cardDiv.style.boxShadow= '5px 5px 5px 5px lightgray';
cardDiv.style.display ='flex';
cardDiv.style.flexDirection ='column';
cardDiv.style.gap = '1em';

// row styling
name.style.marginTop='1vh';
name.style.marginLeft='1vw';
name.style.marginRight='1vw';
description.style.marginLeft='1vw';
description.style.marginRight='1vw';
executeBy.style.marginLeft='1vw';
executeBy.style.marginRight='1vw';
finishDate.style.marginLeft='1vw';
finishDate.style.marginRight='1vw';
t.style.marginLeft='1vw';
saveButton.style.marginLeft='1vw';
saveButton.style.marginRight='1vw';








// save button actions
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




let tableDiv = document.createElement('div');

// get all tasks for the connecting user.
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
               
               
                
                axios.get(`http://127.0.0.1:8000/api/update/${item.id}`,
                    {   
                        name:name,
                        description:description,
                        execute_by,
                        finish_date,finishdate,
                  
                    // complete: complete,
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

   
document.body.appendChild(container);
document.body.appendChild(cardDiv); 
getTasks();