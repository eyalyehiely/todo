
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
})

// deleteButton.addEventListener('click',()=>{
//     axios.get(`http://127.0.0.1:8000/delete?id={{user.id}}`).then((response)=>{
        
//     })
// //     <form action="/delete" method="GET" id='deleteForm'>
// //     <input type="hidden" name="id" value="{{contact.id}}">
// // </form>
// })






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

let description = document.createElement('input');
description.placeholder = 'Description';
description.id = 'description'

let givenDate = document.createElement('input');
givenDate.placeholder = 'Date';
givenDate.type = 'date';
givenDate.id ='givenDate'

let finishDate = document.createElement('input');
finishDate.type='date';
finishDate.placeholder = 'Finish Date';
finishDate.id ='finishDate'

let givenBy = document.createElement('input');
givenBy.placeholder = 'Given by';
givenBy.id ='givenBy'

let complete = document.createElement('input');
complete.id= 'complete';
complete.type='checkbox';
complete.value = '1';


complete.placeholder = 'Complete';

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
        date: document.getElementById('givenDate').value,
        finishDate: document.getElementById('finishDate').value,
        givenBy: document.getElementById('givenBy').value,
        complete: document.getElementById('complete').value,
        updateAt: document.getElementById('updatedAt').value,
    })
   
    })
   
function getTasks() {
    axios.get('http://127.0.0.1:8000/api/read').then((response) => {
        if(response.data.tasks==[]){
            document.getElementById('tasks').innerHTML = 'No Tasks for this user';
        }
        else{
        const table = `
            <table>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Finish Date</th>
                    <th>Given By</th>
                    <th>Complete</th>
                    <th>Updated At</th>
                </tr>
                ${response.data.tasks.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.description}</td>
                        <td>${item.finish_date}</td>
                        <td>${item.given_by}</td>
                        <td>${item.complete}</td>
                        <td>${item.updated_at}</td>
                    </tr>
                `)}
            </table>`;
        document.getElementById('tasks').innerHTML = table;
    }
})
    .catch((error) => {
        document.getElementById('tasks').innerHTML = 'Error fetching tasks. Please try again.';
    });

}

    getTasks();
    



//appending buttons
card1.appendChild(saveButton);
card1.appendChild(taskDiv);
cardDiv.appendChild(card1);
}






document.body.appendChild(container);
document.body.appendChild(cardDiv);







