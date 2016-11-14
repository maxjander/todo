function getTodos() {
    var todos = ["Strukturera upp din Todo-list",];
    var todos_str = localStorage.getItem('todo');

    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
   // todos.push("Strukturera upp din Todo-list");
    return todos;
}
function getDone(){
   var done = [];
   var done_str = localStorage.getItem('done');

   if (done_str !== null) {
      done = JSON.parse(done_str);
   }
   return done;

}

function prio(addsub) {
   var prio = addsub;
   var id = this.getAttribute('id');
   var newid;
   var todos = getTodos();

   if (prio === 'sub'){
      // prioritera ner uppgift

   }
   else if (prio === 'add') {
      //prioritera upp uppgift

   }
   else {
      console.log("Något gick fel"); // glöm ej att ta bort
      return false;
   }
   todos.shift(id, 1);
   localStorage.setItem('todo', JSON.stringify(todos));

}

function add() {
    var task = document.getElementById('task').value;
    var todos = getTodos();

    if (task.length === 0 ){
      alert("Du måste skriva in något du skall göra, ifall du inte har något att göra så är denna sida onödig för dig");
      } else {
            todos.push(task);
            localStorage.setItem('todo', JSON.stringify(todos));
            show();
            return false;
         }
}

function remove() {
var id = this.getAttribute('id');
var todos = getTodos();
   todos.splice(id, 1);
   localStorage.setItem('todo', JSON.stringify(todos));

    show();
    return false;
}

function removeDone() {
    var id = this.getAttribute('id');
    var done = getDone();
    done.splice(id, 1);
    localStorage.setItem('done', JSON.stringify(done));

    show();
    return false;
}

function markAsDone() {
    var id = this.getAttribute('id');
    var task = document.getElementById("ID_"+id).innerHTML;
    var todos = getTodos();
    var done = getDone();

    done.push(task);
    localStorage.setItem('done', JSON.stringify(done));

    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();
    return false;
}


function show() {
    var todos = getTodos();
    var done = getDone();

    var html = '<ol>';
    for(var i=0; i<todos.length; i++) {
        html += '<li class="lista"> <span id="ID_';
        html += i +'">' + todos[i] + '</span><button class="markAsDone" id="';
        html += i  + '"><img src="gfx/check.png" width="10"></button> ' + '<button class="remove" id="';
        html += i  + '"> <img src="gfx/close.png" width="10"></button></li>';
    }
    html += '</ol>';

    html += '<ul>';
   for( i=0; i < done.length; i++) {
        html += '<li class="listaklar">' + done[i] + '<button class="removeDone" id="';
        html += i  + '"><img src="gfx/close.png" width="10"></button></li>';
   }
    html += '</ul>';
    document.getElementById('todos').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    var buttons2 = document.getElementsByClassName('markAsDone');
    var buttons3 = document.getElementsByClassName('removeDone');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
        buttons2[i].addEventListener('click', markAsDone);
    }
    for (i = 0; i < done.length; i++) {
      buttons3[i].addEventListener('click', removeDone);
  }
}

document.getElementById('add').addEventListener('click', add);
show();
