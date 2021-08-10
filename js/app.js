console.log('Welcome to Notes App')

showItem();



// If user adds a note, add it to the local Storage

let addBtn = document.getElementById('addbtn')
addBtn.addEventListener('click', function () {
  let addTxt = document.getElementById('addTxt')
  let notes = JSON.parse(localStorage.getItem('notes'));
  let notesObj=[{}] ;
  
  if (notes === null) {
    
    notesObj.push(addTxt.value)
    
  } else {
    notesObj = notes;
    notesObj.push(addTxt.value)
  }

  localStorage.setItem('notes', JSON.stringify(notesObj))
  addTxt.value = ''
  showItem();
})

function showItem() {
  let notes = localStorage.getItem('notes')
  console.log(JSON.parse(notes))
  if(notes!== null){
  let notesObj = JSON.parse(notes);
  
  let html = ''
  notesObj.forEach((element, index) => {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button id=${index} onclick="deleteItem(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`
  })

  let addNote = document.getElementById('notes')
  addNote.innerHTML = html;
}
  
else if(notes === null) {
    let addNote = document.getElementById('notes')
    let sft = `<h3>Enter notes to display here</h3>`;
    addNote.innerHTML=sft;
}
  
}

function deleteItem(id){
    console.log(`I am deleting note ${id}`)
    let notes = localStorage.getItem('notes');
    let notesObj = JSON.parse(notes);
    let newNoteObj=[];
    for(index in notesObj){
        if(index!==id) {
            newNoteObj.push(notesObj[index])

        }
    }
    localStorage.setItem('notes', JSON.stringify(newNoteObj))
    showItem();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    let input = search.value.toLowerCase();
    
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        console.log(cardTxt)
        console.log(cardTxt.includes(input))
       if(cardTxt.includes(input)){
           element.style.display = "block";
       }
       else {
           element.style.display = "none"
       }

    })
})

/* Further features to be added
1. Timestamp
2. Add Title
3. Mark as important(Bookmark)
4. Add subnotes below every note
5. Edit a particular note
*/