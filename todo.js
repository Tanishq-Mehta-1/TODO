// import {compareAsc, format} from "date-fns";

let total_todos = 0;
function createTodo(title, priority, description, dueDate) {
  let id = ++total_todos;
  return { title, priority, description, dueDate, id };
}

let total_projects = 0;
function createProject(title, description) {
  let id = ++total_projects;
  let todoList = [];

  const addTodo = (todo) => {
    todoList.push(todo);
  };
  const removeTodo = (ID) => {
    const toRemove = todoList.findIndex((todo) => todo.id == ID);
    console.log("Removed the todo with title: " + todoList[toRemove]);
    todoList.splice(toRemove, 1);
  };

  return { title, description, todoList, addTodo, removeTodo, id };
}

function createProject_stored(title, description, todoList) {
  let id = ++total_projects;

  const addTodo = (todo) => {
    todoList.push(todo);
  };

  const removeTodo = (ID) => {
    const toRemove = todoList.findIndex((todo) => todo.id == ID);
    console.log("Removed the todo with title: " + todoList[toRemove]);
    todoList.splice(toRemove, 1);
  };

  return { title, description, todoList, addTodo, removeTodo, id };
}

function updateTotalProjects(stored_projects){
  total_projects = stored_projects;
}

export { createTodo, createProject, createProject_stored, updateTotalProjects };
