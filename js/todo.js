const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');
const toDoLi = document.getElementsByClassName('js-toDoLi'),
  toDoSpan = document.getElementsByClassName('js-span');

const TODO_LIST = 'toDo';
const NONE = 'none';
const DECO = 'line-through';
const COM = 'COMPLETE';
const INCOM = 'INCOMPLETE';

let toDo = [];
const loadDeco = localStorage.getItem(TODO_LIST);
let parseDeco = JSON.parse(loadDeco);

function comToDo(event){
  const btn = event.target;
  const li = event.target.parentNode;
  const id = li.id;
  const num = id - 1;
  const span = li.querySelector('span');
  let newDeco = parseDeco[num];
  if(newDeco.deco === NONE){
    newDeco.deco = DECO;
    newDeco.com = INCOM;
    btn.innerText = newDeco.com;
    span.style.textDecoration = newDeco.deco;
    parseDeco.splice(num,1,newDeco);
    localStorage.setItem(TODO_LIST,JSON.stringify(parseDeco));
    saveLiDeco();
  }else if(newDeco.deco === DECO){
    newDeco.deco = NONE;
    newDeco.com = COM;
    btn.innerText = newDeco.com;
    span.style.textDecoration = newDeco.deco;
    parseDeco.splice(num,1,newDeco);
    localStorage.setItem(TODO_LIST,JSON.stringify(parseDeco));
    saveLiDeco();
  }
}


function delToDo(event){
  const li = event.target.parentNode;
  const id = li.id;
  const num = id-1;
  toDoList.removeChild(li);
  parseDeco.splice(num,1);
  saveLiDeco();
}

function saveLiDeco(){
  localStorage.setItem(TODO_LIST,JSON.stringify(parseDeco));
}

function saveToDos(){
  localStorage.setItem(TODO_LIST, JSON.stringify(toDo));
}

function paintLiDeco(){
  Array.from(toDoLi).forEach(i =>{
    const id = i.id;
    const num = id-1;
    const span = i.querySelector("span");
    const com = i.querySelector(".js-com")
    const loadDeco = localStorage.getItem(TODO_LIST);
    const parseDeco = JSON.parse(loadDeco);
    const newDeco = parseDeco[num];
    span.style.textDecoration = newDeco.deco;
    com.innerText = newDeco.com;
  });
}

function paintToDo(text){
  const li = document.createElement('li');
  const comBtn = document.createElement('a');
  const delBtn = document.createElement('a');
  li.classList.add('js-toDoLi');
  comBtn.innerText = "COMPLETE";
  comBtn.classList.add('js-com');
  comBtn.addEventListener("click",comToDo);
  delBtn.innerText = "DELETE";
  delBtn.addEventListener("click",delToDo);
  const span = document.createElement('span');
  span.classList.add('js-span');
  const br = document.createElement('br');
  const newID = toDo.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.id = newID;
  li.appendChild(delBtn);
  li.appendChild(comBtn);
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id : newID,
    deco: NONE,
    com : COM
  };
  toDo.push(toDoObj);
  saveToDos();
  saveLiDeco();
}


function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const load = localStorage.getItem(TODO_LIST);
  if(load !== null){
    const parsed = JSON.parse(load);
    parsed.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  }
  paintLiDeco();
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
