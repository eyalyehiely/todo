const pageDiv = document.createElement('div');

function exit(){
    window.location.href= '/login/'
    history.replaceState(null, null, 'url_of_your_page_here');
}
const plusButton = document.createElement('button');
plusButton.disabled =false;
plusButton.textContent = 'Add Task➕';
plusButton.id = 'plusButton';
plusButton.addEventListener('click',()=>{
    createCard()
    plusButton.disabled =true;
    // cardDiv.style.display = 'block'
})

const cardDiv = document.createElement('div');
cardDiv.id = 'cardDiv';

function createCard(){
    // creating new card

    const name = document.createElement('input');
    name.placeholder = 'Name';
    name.id = 'name'
    name.type = 'string'

    const description = document.createElement('input');
    description.placeholder = 'Description';
    description.id = 'description'


    const finishDate = document.createElement('input');
    finishDate.type='date';
    const t = document.createElement('span');
    t.textContent = 'Finish date';
    finishDate.id ='finishDate';
    const currentDate = new Date();
    finishDate.min = currentDate.toLocaleString();
    

    const executeBy = document.createElement('select');
    executeBy.id = 'executeBy';
    executeBy.addEventListener('click', () => {
        axios.post(`/api/execute_by`)
            .then((response) => {
                const users = response.data.users;
    
               
                executeBy.innerHTML = '';
    
                const defaultOption = document.createElement('option');
                defaultOption.text = 'Choose a user';
                defaultOption.value = '';
                executeBy.appendChild(defaultOption);
    
               
                users.forEach((user) => {
                   
                    const option = document.createElement('option');
                    option.text = user.user;
                    option.value = user.user;  
                    executeBy.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Error fetching data:',error);
            });
    });
    
    

    // save button
    const saveButton = document.createElement('button');
    saveButton.id = 'save';
    saveButton.textContent = '✅' ;

    const exitButton = document.createElement('button');
    exitButton.id = 'exit';
    exitButton.textContent = '🔙' ;
    exitButton.addEventListener('click',()=>{
    cardDiv.style.display ='none';
    // cardDiv.style.position = 'absolute';
    // cardDiv.style.visibility = 'hidden';


    plusButton.disabled = false;

    })







    //appending inputs
    cardDiv.appendChild(name);
    cardDiv.appendChild(description);
    cardDiv.appendChild(executeBy);
    cardDiv.appendChild(t);
    cardDiv.appendChild(finishDate);
    // cardDiv.appendChild(plusButton);
    cardDiv.appendChild(exitButton);
    cardDiv.appendChild(saveButton);




    // styling
    cardDiv.style.marginTop='3vh';
    cardDiv.style.width = '20vw';
    cardDiv.style.height = '35vh';
    cardDiv.style.marginLeft = '10vw';
    cardDiv.style.border = '1px solid silver';
    cardDiv.style.backgroundColor='#dddddd';
    cardDiv.style.borderRadius='4px';
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
    exitButton.style.marginLeft='1vw';
    exitButton.style.marginRight='1vw';








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
        
    
    
}

//# -------------------------------------------------------------------------------------#
const editDiv = document.createElement('div');
editDiv.id = 'editDiv';

function editTask(itemId){
    // creating new card

    const name = document.createElement('input');
    name.placeholder = 'Name';
    name.id = 'name';
    name.type = 'string';

    const description = document.createElement('input');
    description.placeholder = 'Description';
    description.id = 'description';


    const finishDate = document.createElement('input');
    finishDate.type='date';
    const t = document.createElement('span');
    t.textContent = 'Finish date';
    finishDate.id ='finishDate';
    const currentDate = new Date();
    finishDate.min = currentDate.toLocaleString();

    const executeBy = document.createElement('select');
    executeBy.id = 'executeBy';
    executeBy.addEventListener('click', () => {
        axios.post(`/api/execute_by`)
            .then((response) => {
                const users = response.data.users;
    
               
                executeBy.innerHTML = '';
    
                const defaultOption = document.createElement('option');
                defaultOption.text = 'Choose a user';
                defaultOption.value = '';
                executeBy.appendChild(defaultOption);
    
               
                users.forEach((user) => {
                   
                    const option = document.createElement('option');
                    option.text = user.user;
                    option.value = user.user;  
                    executeBy.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Error fetching data:',error);
            });
        })

    const status = document.createElement('select');
    status.placeholder = 'Status';
    status.id = 'status';
    status.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Choose status';
    defaultOption.value = '';
    status.appendChild(defaultOption);
    const option1 = document.createElement('option');
    option1.text = 'Done';
    option1.value = 'done';  
    status.appendChild(option1);
    const option2 = document.createElement('option');
    option2.text = 'Not done';
    option2.value = 'not done';  
    status.appendChild(option2);




    const returnButton = document.createElement('button');
    returnButton.id = 'return';
    returnButton.textContent = '🔙' ;
    returnButton.addEventListener('click',()=>{
        editDiv.style.display ='none';
        plusButton.disabled = false;
    })




    // edit button
    const editButton = document.createElement('button');
    editButton.id = 'edit';
    editButton.textContent = '✅' ;
    editButton.addEventListener('click', () => {
        axios.post(`/api/update/${itemId}/`, {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            finishDate: document.getElementById('finishDate').value,  
            executeBy:document.getElementById('executeBy').value,  
            status:document.getElementById('status').value,  
      
        }).then(() =>{
            location.reload()
            window.alert("Task updated");
            editDiv.style.display='none';
        })
        .catch((error)  => {
            document.getElementById('create').innerHTML = 'Error transpassing tasks. Please try again.';
            console.log('Error transpassing tasks',error)
        })
       
        
    }) 
        editDiv.appendChild(editButton);


    //appending inputs
    editDiv.appendChild(name);
    editDiv.appendChild(description);
    editDiv.appendChild(executeBy);
    editDiv.appendChild(t);
    editDiv.appendChild(finishDate);
    editDiv.appendChild(status);
    editDiv.appendChild(editButton);
    editDiv.appendChild(returnButton);




    // styling
    editDiv.style.marginTop='3vh';
    editDiv.style.width = '20vw';
    editDiv.style.height = '38vh';
    editDiv.style.marginLeft = '20vw';
    editDiv.style.border = '1px solid silver';
    editDiv.style.borderRadius = '4px';
    editDiv.style.backgroundColor='#dddddd';
    editDiv.style.display ='flex';
    editDiv.style.flexDirection ='column';
    editDiv.style.gap = '1em';

    //  row styling
    name.style.marginTop='1vh';
    name.style.marginLeft='1vw';
    name.style.marginRight='1vw';
    description.style.marginLeft='1vw';
    description.style.marginRight='1vw';
    executeBy.style.marginLeft='1vw';
    executeBy.style.marginRight='1vw';
    finishDate.style.marginLeft='1vw';
    finishDate.style.marginRight='1vw';
    status.style.marginLeft='1vw';
    status.style.marginRight='1vw';
    t.style.marginLeft='1vw';
    editButton.style.marginLeft='1vw';
    editButton.style.marginRight='1vw';
   returnButton.style.marginLeft='1vw';
   returnButton.style.marginRight='1vw';





    
}












let tableDiv = document.createElement('div');

// get all tasks for the connecting user.
function getTasks() {
    axios.get('/api/read').then((response) => {
        if(response.data.tasks.length==0){
            document.getElementById('tasks').innerHTML = 'No Tasks for this user';
        }
        else{
            
            const table = `
                <table>
                    <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Given Date</th>
                        <th>Finish Date</th>
                        <th>Given By</th>
                        <th>Execute By</th>
                        <th>Complete</th>
                        <th>Updated At</th>
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
                   let answer=  window.prompt("Are you sure you want to delete this task?",'No')
                    if (answer.toLowerCase() == 'yes'){
                    axios.get(`/api/delete/${item.id}`).then(()=>{
                        window.alert("Task deleted")
                        getTasks()
                    })
                }
                
                else{
                    window.alert("Task didn't delete")

                }
                    })
                    
            
                })    
            
       
                
            response.data.tasks.forEach(item => {        
            document.getElementById(`${item.id}editButton`).addEventListener('click',()=>{
                    editTask(item.id)
            
                    })
                })
        }
            });
                
        document.getElementById('tasks').appendChild(tableDiv);
   
    ;
}





function search() {
    const input = document.getElementById('search').value;
    axios.post(`/api/search/${input}`).then((response) => {
        const matchingItems = response.data.tasks;

        if (matchingItems.length > 0) {
            const items = matchingItems.map(item => `
            <table>
                <tr>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Given Date</th>
                    <th>Finish Date</th>
                    <th>Given By</th>
                    <th>Execute By</th>
                    <th>Complete</th>
                    <th>Updated At</th>
                    <th>Delete</th>
                    <th>Edit</th>
                <tr>

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
                </tr>`
                
            ).join(''); 

            document.getElementById('tasks').style.display = 'none';
            document.getElementById('output').innerHTML = items;
            

        } else {
            window.alert('No results found.');
            window.location.href= '/'
        }
    }).catch((error) => {
        console.error('Error fetching data', error);
    });
}

        

   


document.body.appendChild(plusButton); 
document.body.appendChild(cardDiv); 
document.body.appendChild(editDiv); 



getTasks();