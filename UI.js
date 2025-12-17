import {
  allProjects,
  currProj,
  addProject,
  submitTodo,
  changeCurr,
} from "./controller.js";

import { saveProjects } from "./storage.js";

(function () {
  const add_btn = document.querySelector(".add-project");
  add_btn.addEventListener("click", () => {
    const modal = document.querySelector("#project-modal");
    modal.showModal();
  });
})();

const card_container = document.querySelector(".card-container");
const dialog = document.querySelector("#project-modal");

dialog.addEventListener("close", (e) => {
  if (dialog.returnValue === "confirm") {
    const form = document.querySelector("form");
    const formData = new FormData(form);

    const title = formData.get("Title");
    const desc = formData.get("Description");

    const project = addProject(title, desc);
    addProject_card(project);
    saveProjects(allProjects);
  }
});

const todo_dialog = document.querySelector("#todo-modal");
todo_dialog.addEventListener("close", () => {
  if (todo_dialog.returnValue === "confirm") {
    const form = document.querySelector("#todo-modal form");
    const formData = new FormData(form);

    const title = formData.get("Title");
    const desc = formData.get("Description");
    const priority = formData.get("Priority");

    let todo = submitTodo(title, priority, desc, "10");
    const proj_id = allProjects[currProj].id;

    const todo_container = document.querySelector(".todo-holder-" + proj_id);
    addTodo_card(todo, todo_container);

    saveProjects(allProjects);
  }
});

//render all saved projects first
(function () {
  for (const project of allProjects) {
    addProject_card(project);
  }
})();

function addProject_card(project) {
  let card = document.createElement("div");
  card.classList.add("project-card");
  card.classList.add("project-" + project.id);

  let div = document.createElement("div");
  div.classList.add("project-card_row1");

  let title = document.createElement("h4");
  title.textContent = project.title;

  let desc = document.createElement("p");
  desc.textContent = project.description;

  let btn = document.createElement("button");
  btn.textContent = "+";

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    changeCurr(project.id - 1);
    console.log(currProj);

    const modal = document.querySelector("#todo-modal");
    modal.showModal();
  });

  div.appendChild(title);
  div.appendChild(desc);

  //add all the todos to this card
  let todo_holder = document.createElement("div");
  todo_holder.classList.add("todo-holder-" + project.id);
  todo_holder.classList.add("todo-holder");

  let list = project.todoList;
  for (let todo of list) {
    addTodo_card(todo, todo_holder);
  }

  card.appendChild(div);
  card.appendChild(todo_holder);
  card.appendChild(btn);

  card.addEventListener("click", () => {
    todo_holder.classList.toggle("expanded");
    card.classList.toggle("expanded");
    btn.classList.toggle("expanded");
  });

  card_container.appendChild(card);
}

function addTodo_card(todo, todo_holder) {
  let card = document.createElement("div");
  card.classList.add("todo-card");
  card.classList.add("todo-" + todo.id);

  let title = document.createElement("h5");
  title.textContent = todo.title;

  let desc = document.createElement("p");
  desc.textContent = todo.description;

  let priority = document.createElement("p");
  priority.textContent = todo.priority;

  card.appendChild(title);
  card.appendChild(priority);
  card.appendChild(desc);

  //
  console.log(todo);
  todo_holder.appendChild(card);
}
