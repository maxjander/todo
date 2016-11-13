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

function markAsDone() {
    var id = this.getAttribute('id');
    var done = get_done();
    done.push(id, 1);
    localStorage.setItem('done', JSON.stringify(done));

    show();

    return false;
}


function show() {
    var todos = get_todos();
    var done = get_done();

    var html = '<ol>';
    for(var i=0; i<todos.length; i++) {
        html += '<li class="lista">' + todos[i] + '<button class="markAsDone" id="' + i  + '">done</button>' + '<button class="remove" id="' + i  + '">Delete</button></li>';
    }
    html += '</ol>';

    html += '<ol>';
   for( i=0; i < done.length; i++) {
        html += '<li class="lista">' + done[i] + '<button class="remove" id="' + i  + '">Delete</button></li>';
   }
    html += '</ol>';
    document.getElementById('todos').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    var buttons2 = document.getElementsByClassName('markAsDone');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    }
    for (i = 0; i < markAsDone.length; i++) {
      buttons2[i].addEventListener('click', markAsDone);
  }
}

document.getElementById('add').addEventListener('click', add);
show();
