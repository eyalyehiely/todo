
// plus button
let container = document.createElement('div');
let plusButton = document.createElement('button');
plusButton.id = 'plus';
plusButton.textContent = '➕'

container.appendChild(document.getElementById('hello'));
container.appendChild(plusButton);

// add cards functions
plusButton.addEventListener('click',()=>{
    createCard();
    plusButton.disabled=true;
})



let cardDiv = document.createElement('div');
cardDiv.style.display = 'flex';
cardDiv.style.flexDirection = 'row'
cardDiv.style.gap = '3vw';

function createCard(){
    // creating new card
let card1 = document.createElement('div');
let taskDiv = document.createElement('div');

taskDiv.style.marginTop='10px';
taskDiv.style.marginLeft='10px';
taskDiv.style.gap = '2vh';

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

let givenBy = document.createElement('input');
givenBy.placeholder = 'Given by';
givenBy.id ='givenBy'






let updatedAt = document.createElement('input');
updatedAt.placeholder = 'Updated_at';
updatedAt.id ='updatedAt';
updatedAt.type = 'date';


//appending inputs
taskDiv.appendChild(name);
taskDiv.appendChild(description);
taskDiv.appendChild(givenDate);
taskDiv.appendChild(finishDate);
taskDiv.appendChild(givenBy);
taskDiv.appendChild(complete);
taskDiv.appendChild(updatedAt);

// styling
card1.style.width = '40vw';
card1.style.height = '30vh';
card1.style.border = '1px solid silver';
card1.style.backgroundColor='ghostwhite';



// save button
let saveButton = document.createElement('button');
saveButton.id = 'save';
saveButton.textContent = '✅' ;




saveButton.addEventListener('click', () => {
    axios.post('/api/create', {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        finishDate: document.getElementById('finishDate').value,       
    })
    .catch((error)  => {
    document.getElementById('create').innerHTML = 'Error transpassing tasks. Please try again.';
    })

    window.alert("Task added");
    
}) 
    card1.appendChild(saveButton);
    card1.appendChild(taskDiv);
    cardDiv.appendChild(card1);
    
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
                        <th>Complete</th>
                        <th>Updated At</th>
                        <th>Share With</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                    ${response.data.tasks.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.description}</td>
                            <td>${item.given_date}</td>
                            <td>${item.finish_date}</td>
                            <td>${item.given_by}</td>
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
        }
                
            response.data.tasks.forEach(item => {        
            document.getElementById(`${item.id}editButton`).addEventListener('click',()=>{
                let name1 = window.prompt('Insert new name');
                name1.id = 'name1';
                let description1 = window.prompt('Insert new description');
                description1.id = 'description1';
                
                axios.get(`http://127.0.0.1:8000/api/update/${item.id}`),
                    {
                    name:name1,
                    description:description1,
                    // date: givenDate,
                    // finishDate: finishDate,
                    // givenBy: givenBy,
                    // complete: complete,
                    // updateAt: updatedAt,
                    }
                  
                        window.alert("Task updated")
                    
                    })
                })
            
            });
                
        document.getElementById('tasks').appendChild(tableDiv);
   
    ;
}
   
   



getTasks();
    

