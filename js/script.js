function get_todos() {
    var todos = [];
    var todos_str = localStorage.getItem('todo');

    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}
function get_done(){
   var done = [];
   var done_str = localStorage.getItem('done');

   if (done_str !== null) {
      done = JSON.parse(done_str);
   }
   return done;

}

function add() {
    var task = document.getElementById('task').value;
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}
function removeDone() {
    var id = this.getAttribute('id');
    var done = get_done();
    done.splice(id, 1);
    localStorage.setItem('done', JSON.stringify(done));

    show();

    return false;
}

function markAsDone() {
    var id = this.getAttribute('id');
    var task = document.getElementById("ID_"+id).innerHTML;
    var todos = get_todos();
    var done = get_done();

    done.push(task);
    localStorage.setItem('done', JSON.stringify(done));

    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}


function show() {
    var todos = get_todos();
    var done = get_done();

    var html = '<ol>';
    for(var i=0; i<todos.length; i++) {
        html += '<li class="lista"> <span id="ID_';
        html += i +'">' + todos[i] + '</span><button class="markAsDone" id="';
        html += i  + '">done</button>' + '<button class="remove" id="';
        html += i  + '">delete</button></li>';
    }
    html += '</ol>';

    html += '<ul>';
   for( i=0; i < done.length; i++) {
        html += '<li class="listaklar">' + done[i] + '<button class="removeDone" id="';
        html += i  + '">delete</button></li>';
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
