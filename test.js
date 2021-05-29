
let addButton = document.querySelector('#liveToastBtn');  
let ul = document.querySelector('#list');
let task = document.getElementById('task')




addButton.addEventListener('click', function () {
    let value = task.value
    addItemToList(value)
    addItemToLocalStorage(value)
    resetInput()
    if(value) {
        $(".success").toast("show");
    }

})

function resetInput() {
    task.value = ''  
}

function addItemToLocalStorage(addedTodoItemText) {
    if(addedTodoItemText){
        let taskLists = JSON.parse(localStorage.getItem('tasks'))
        if(!taskLists){
            // ılk defa gıren kullanıcısın 
            taskLists = []
        }  
        taskLists.push(addedTodoItemText)   
        localStorage.setItem('tasks', JSON.stringify(taskLists)) 
    }
}

function deleteItemToLocalStorage (deleteItem) {
    let taskLists = JSON.parse(localStorage.getItem('tasks'))
    taskLists.forEach((item, index) => {

        if(deleteItem == item ){
            taskLists.splice(index,1)
        }
       
    });
    localStorage.setItem('tasks', JSON.stringify(taskLists)) 
   
}

function addItemToList(addedTodoItemText){

   if(addedTodoItemText){

        const newLi = document.createElement('li') 
        newLi.addEventListener('click',function(event){
            // if(newLi.className === "checked"){
            //     newLi.className = ""

            // }else {
            //     newLi.className = "checked"
            // }
                
            $(this).toggleClass('checked')   
                 
         });

        newLi.innerHTML = addedTodoItemText
        ul.append(newLi)
        const deleteSpan = document.createElement('span')
        deleteSpan.className = 'close remove' 
        deleteSpan.innerHTML = 'x' 
        deleteSpan.addEventListener('click',function(event){

            deleteSpan.parentNode.remove(deleteSpan)
            let deleteItem = this.parentElement.innerText
            this.parentElement.innerText = ''
            deleteItem = deleteItem.slice(0, deleteItem.length-1)
            console.log(deleteItem)
            // $(this).parent().remove()
            deleteItemToLocalStorage(deleteItem)
        });
        

        document.querySelector('ul li:last-child').append(deleteSpan)
   }
   else {

    $(".error").toast("show");
   }
}


// sayfa ılk yüklendığınde daha önceden local storage'a kayıt edılen elemanlar var mı bak
let savedItems = JSON.parse(localStorage.getItem('tasks'))

if(savedItems) {
    // kayıtlı elemanlar var bunları lısteye ekle
    savedItems.forEach(element => {
        addItemToList(element)
    });
}

