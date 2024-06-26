//const addButton = document.getElementById("add-task");
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-task");
  addButtons.forEach((addButton, index) => {
    addButton.addEventListener("click", addCard);
    addButton.id = `btn-${index}`;
    console.log(`${addButton.id}`);
  });
});
let cardId = 0;
let obj = {};

function addCard(e) {
  const parentContainer = e.target.closest(".column");
  let inputElement = parentContainer.querySelector(".text");
  const cardTitle = inputElement.value;

  if (cardTitle) {
    const card = document.createElement("div");
    card.className = "card";
    card.draggable = true;
    card.textContent = cardTitle;
    card.id = `card-${cardId++}`;
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    console.log(`${e.target.id}`);
    parentContainer.appendChild(card);
    inputElement.value = "";
    obj[cardId] = cardTitle;
  }
}
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", search);

function search() {
  let details = document.getElementById("details");
  let inputValue = document.getElementById("inputValue");
  const task = inputValue.value;
  console.log("task", task);
  console.log(obj);
  const tasks = Object.values(obj).filter((value) => value.includes(task));
  console.log("tasks", tasks);
  tasks.forEach((task) => {
    const resultDiv = document.createElement("div");
    resultDiv.className = "resultDiv";
    resultDiv.textContent = task;
    details.appendChild(resultDiv);
    inputValue.value = "";
  });
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}

function dragEnd(e) {
  e.target.classList.remove("hide");
}

const columns = document.querySelectorAll(".card-container");

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", drop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("hovered");
}

function dragLeave() {
  this.classList.remove("hovered");
}

function drop(e) {
  e.preventDefault();
  this.classList.remove("hovered");
  const cardId = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(cardId);
  e.target.appendChild(card);
}
// const addCard = () => {
//   const cardTitle = prompt("Введите название задачи");

//   if (cardTitle) {
//     const card = document.createElement("div");
//     card.className = "card";
//     card.draggable = true;
//     card.textContent = cardTitle;
//     card.id = `card-${cardId++}`;
//     card.addEventListener("dragstart", dragStart);
//     card.addEventListener("dragend", dragEnd);
//     document.getElementById("todo-container").appendChild(card);
//   }
// };

//addButton.addEventListener("click", addCard);
