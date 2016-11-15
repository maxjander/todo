
var todos = ["Strukturera upp din Todo-list",];
var done = ["Här nedanför står de uppgifter du slutfört!",];
var id, newid;

function getTodos() {
    var todos_str = localStorage.getItem('todo');

    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
   // todos.push("Strukturera upp din Todo-list");
    return todos;
}
function getDone(){
   var done_str = localStorage.getItem('done');
   if (done_str !== null) {
      done = JSON.parse(done_str);
   }
   return done;

}

function setItem(task, array){
      localStorage.setItem(task, JSON.stringify(array));
}

function prio(){
        id = parseInt(this.getAttribute('id'));
        newid = parseInt(id - 1);
        todos[id] = [todos[newid], todos[newid]=todos[id]][0];
        setItem('todo', todos);
        show();
}

function prioDown(){
    id = parseInt(this.getAttribute('id'));
    newid = parseInt(id + 1);
    todos[id] = [todos[newid], todos[newid]=todos[id]][0];
    setItem('todo', todos);
    console.log(newid, id, todos);
    show();
}

function add() {
    var task = document.getElementById('task').value;

    if (task.length === 0 ){
      alert("Du måste skriva in något du skall göra, ifall du inte har något att göra så är denna sida onödig för dig");
    }
    else {
        todos.push(task);
        setItem('todo', todos);
        show();
        }
     }

function remove() {
var id = this.getAttribute('id');
   todos.splice(id, 1);
   setItem('todo', todos);

    show();
}

function removeDone() {
    var id = this.getAttribute('id');
    done.splice(id, 1);
    setItem('done', done);
    show();
    return false;
}

function markAsDone() {
    var id = this.getAttribute('id');
    var task = document.getElementById("ID_"+id).innerHTML;
    done.push(task);
    setItem('done', done);

    todos.splice(id, 1);
    setItem('todo', todos);

    show();
}


function show() {
    todos = getTodos();
    done = getDone();
    var html = '<ol>';

    for(var i=0; i<todos.length; i++) {
        html += '<li class="lista"> <span id="ID_';
        html += i +'">' + todos[i] + '</span>';
        html += '<img src="gfx/check.png" class="markAsDone" id="' + i  + '">';
        html+= ' <img src="gfx/close.png" class="remove" id="' + i  + '">';
        if (i > 0){
        html += '<img class="prio"id="';
        html += i +'" src=gfx/upp.png>';
            }
        if (i < todos.length - 1){
        html += '<img class="prioDown"id="' + i +'" src="gfx/ner.png">';
            }
        html += '</li>';
        }
    html += '</ol>';
    html += '<ul>';
   for( i=0; i < done.length; i++) {
        html += '<li class="listaklar">' + done[i] + '<img src="gfx/close.png" class="removeDone" id="';
        html += i  + '"></li>';
   }
   html += '</ul>';
   document.getElementById('todos').innerHTML = html;
   console.log(todos.length);
   console.log(buttons3);


    var buttons = document.getElementsByClassName('remove');
    var buttons2 = document.getElementsByClassName('markAsDone');
    var buttons3 = document.getElementsByClassName('removeDone');
    var buttons4 = document.getElementsByClassName('prio');
    var buttons5 = document.getElementsByClassName('prioDown');

    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
        buttons2[i].addEventListener('click', markAsDone);
    }
    for (i = 0; i < buttons.length - 1; i++) {
    buttons4[i].addEventListener('click', prio);
    buttons5[i].addEventListener('click', prioDown);
    }
    for (i = 0; i < done.length; i++) {
      buttons3[i].addEventListener('click', removeDone);
  }
}
document.getElementById('add').addEventListener('click', add);
var test = document.getElementById('task').addEventListener('keydown', 13, add);
console.log(test);
show();
