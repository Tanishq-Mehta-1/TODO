import {
  createProject,
  createProject_stored,
  createTodo,
  updateTotalProjects,
} from "./todo.js";

import { loadProjects } from "./storage.js";

let allProjects = [];
const stored_projects = loadProjects();
console.log(stored_projects);

let max_id = -1;
for (let project of stored_projects) {
  addProject_stored(project.title, project.description, project.todoList);
  max_id = Math.max(max_id, project.id);
}
updateTotalProjects(max_id + 1);
let currProj = -1;

function addProject(title, desc) {
  let proj = createProject(title, desc);
  allProjects.push(proj);

  return proj;
}

function addProject_stored(title, desc, todoList) {
  let proj = createProject_stored(title, desc, todoList);
  allProjects.push(proj);
}

function submitTodo(title, priority, description, date) {
  if (currProj == -1) throw new Error("Current Project set to -1");

  const todo = createTodo(title, priority, description, date);
  allProjects[currProj].addTodo(todo);

  return todo;
}

function changeCurr(id) {
  currProj = id;
}

export { allProjects, currProj, addProject, submitTodo, changeCurr };
