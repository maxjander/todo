var todos = getTodos('todo'); // + "Strukturera upp din Todo-list";
var done = getTodos('done'); // + "Här nedanför står de uppgifter du slutfört!" ;
var id, newid;

function getTodos(input) {
    var todos_str = localStorage.getItem(input);
    if (input === 'todo'){
        if (todos_str !== null) {
         todos = JSON.parse(todos_str);
     } else {   todos = [];
                todos.push("Strukturera upp din Todo-list"); }
        return todos;
    } else if (input === 'done') {
        //done = ["Här nedanför står de uppgifter du slutfört!",];
            if (todos_str !== null) {
             done = JSON.parse(todos_str);
            }else { done = [];
            done.push("Här nedanför står de uppgifter du slutfört!"); }
        return done;
    }
}

function setItem(task, array){
      localStorage.setItem(task, JSON.stringify(array));
}

function prio(){
    id = parseInt(this.getAttribute('id'));
    var thisClass = this.getAttribute('class');
    if (thisClass === 'prio'){
        newid = parseInt(id - 1);
    } else if (thisClass === 'prioDown'){
        newid = parseInt(id + 1);
    }
    todos[id] = [todos[newid], todos[newid]=todos[id]][0];
    setItem('todo', todos);
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
    id = parseInt(this.getAttribute('id'));
    thisClass = this.getAttribute('class');
    if (thisClass === 'remove'){
        todos.splice(id, 1);
        setItem('todo', todos);
    } else if (thisClass === 'removeDone'){
        done.splice(id, 1);
        setItem('done', done);
    }
    show();
}

function markAsDone() {
    id = this.getAttribute('id');
    var task = document.getElementById("ID_"+id).innerHTML;
    done.push(task);
    setItem('done', done);
    todos.splice(id, 1);
    setItem('todo', todos);
    show();
}

function show() {
    todos = getTodos('todo');
    done = getTodos('done');
    var html = '<ol>';

    for(var i=0; i< todos.length; i++) {
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
    buttons5[i].addEventListener('click', prio);
    }
    for (i = 0; i < done.length; i++) {
      buttons3[i].addEventListener('click', remove);
     }
}
document.getElementById('add').addEventListener('click', add);
show();
