var data = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : {
      todo: [],
      completed: []
    };

var removeSVG =
  '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="fill" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" > <path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z" ></path> </svg>';
var completeSVG =
  '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="fill" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" > <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" ></path> </svg>';

renderToDoList();
//User clicked on add button
//If there is some text on the input then add it
document.getElementById("item").addEventListener("keydown", function(e) {
  var value = document.getElementById("item").value;
  if (value && e.code === "Enter") {
    addItem(value);
  }
});
document.getElementById("add").addEventListener("click", function() {
  var value = document.getElementById("item").value;
  if (value) {
    addItem(value);
  }
});

function addItem(value) {
  data.todo.push(value);
  addItemTodo(value);
  document.getElementById("item").value = "";
}

function renderToDoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemTodo(value, false);
  }
  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemTodo(value, true);
  }
}

function dataObjectUpdated() {
  // console.log(JSON.stringify(data));
  localStorage.setItem("todoList", JSON.stringify(data));
}

function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  parent.removeChild(item);
  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(item.innerText), 1);
  } else {
    data.completed.splice(data.todo.indexOf(item.innerText), 1);
  }
  dataObjectUpdated();
}

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var target =
    id === "todo"
      ? document.getElementById("completed")
      : document.getElementById("todo");

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(item.innerText), 1);
    data.completed.push(item.innerText);
  } else {
    data.completed.splice(data.todo.indexOf(item.innerText), 1);
    data.todo.push(item.innerText);
  }
  dataObjectUpdated();
}

function addItemTodo(text, completed) {
  var list = completed
    ? document.getElementById("completed")
    : document.getElementById("todo");
  var item = document.createElement("li");
  item.innerText = text;

  var buttons = document.createElement("div");
  buttons.classList.add("buttons");

  var remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = removeSVG;

  remove.addEventListener("click", removeItem);

  var complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = completeSVG;

  complete.addEventListener("click", completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);
  list.insertBefore(item, list.childNodes[0]);
  dataObjectUpdated();
}
