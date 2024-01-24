// delete button
let deleteButton = document.createElement('button');
deleteButton.id = 'delete';
deleteButton.textContent =  '🗑️';


// edit button
let editButton = document.createElement('button');
editButton.id = 'edit';
editButton.textContent = '📝' ;



card1.appendChild(deleteButton);
card1.appendChild(editButton)





deleteButton.addEventListener('click',()=>{
    axios.post('/api/delete',{
        action:'delete'
   
        
    })
})







document.body.appendChild(cardDiv);
document.body.appendChild(card);




function taskCard(){
let card = document.createElement('div');
let content = document.createElement('div');

content.style.marginTop='10px';
content.style.marginLeft='10px';
content.style.gap = '2vh';
card.style.width = '40vw';
card.style.height = '30vh';
card.style.border = '1px solid silver';
card.style.backgroundColor='ghostwhite';

}