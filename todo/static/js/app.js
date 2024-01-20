
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

let description = document.createElement('input');
description.placeholder = 'Description';

let givenDate = document.createElement('input');
givenDate.placeholder = 'Date';

let finishDate = document.createElement('input');
finishDate.placeholder = 'Finish Date';

let givenBy = document.createElement('input');
givenBy.placeholder = 'Given by';

let complete = document.createElement('input');

complete.placeholder = 'Complete';

let updatedAt = document.createElement('time');
updatedAt.placeholder = 'Updated_at';
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



// delete button
let deleteButton = document.createElement('button');
deleteButton.id = 'delete';
deleteButton.textContent =  '🗑️';


// edit button
let editButton = document.createElement('button');
editButton.id = 'edit';
editButton.textContent = '📝' ;

// save button
let saveButton = document.createElement('button');
saveButton.id = 'save';
saveButton.textContent = '✅' ;

//appending buttons
card1.appendChild(deleteButton);
card1.appendChild(editButton)
card1.appendChild(saveButton);
card1.appendChild(taskDiv);
cardDiv.appendChild(card1);
}

// saveButton.addEventListener('click',()=>{

// })


let data = document.getElementById('data')
document.body.appendChild(data);
document.body.appendChild(container);
document.body.appendChild(cardDiv);



