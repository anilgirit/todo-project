// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners(){  //tüm event Listenerlar
    form.addEventListener("submit" , addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click" , deleteTodo);
    filter.addEventListener("keydown",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if (confirm("Tümünü Dilmek İstediğinize Emin Misiniz?")){
        //Arayünden todoları temizleme  
       // todoList.innerHTML = ""; yavaş metod

       while(todoList.firstElementChild != null){
        todoList.removeChild(todoList.firstElementChild);
       }
       localStorage.removeItem("todos");

    }
    
    



}


function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)=== -1){ //bulunamaması durumu

            listItem.setAttribute("style" , "display : none !important");
        }else{                               //Bulunması Durumu
            
            listItem.setAttribute("style" , "display : block");
        }
    });


}


function deleteTodo (e){ 

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("danger" , "Todo Başarıyla Silindi")
    }

}


function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // Arrayden değeri silebiliriz.
        }

    });

    localStorage.setItem("todos",JSON.stringify(todos));

}


function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);


    })

}


function addTodo(e){
    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        
        showAlert("danger","lütfen bir todo girin");
    }else{

        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success","Todo Başarılı Bir Şekikde Eklendi")
    }

    
   
    

    e.preventDefault()
}


function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}


function addTodoToStorage (newTodo){
    
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos" , JSON.stringify(todos));

}


function showAlert(type,message){

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // SETTİMEOUT METODU

    window.setTimeout(function(){
        alert.remove();
    },1000);
}


function addTodoToUI(newTodo){ //aldığı string değeri ui ye ekleyecek
      

        //List item oluşturma
        const listItem = document.createElement("li");
        //Link oluşturma
        const link = document.createElement("a");
        link.href = "#";
        link.className = "delete-item";
        link.innerHTML = "<i class = 'fa fa-remove'></i>"
        
        listItem.className = "list-group-item d-flex justify-content-between";

        //text node ekleme

        listItem.appendChild(document.createTextNode(newTodo));
        listItem.appendChild(link);

        //Todolist e List item ı ekleme

        todoList.appendChild(listItem);

        todoInput.value = "";


}

