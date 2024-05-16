const addButton = document.getElementById("add-task");
let cardId = 0;

const addCard = () => {
  const cardTitle = prompt("Введите название задачи");

  if (cardTitle) {
    const card = document.createElement("div");
    card.className = "card";
    card.draggable = true;
    card.textContent = cardTitle;
    card.id = `card-${cardId++}`;
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    document.getElementById("todo-container").appendChild(card);
  }
};

addButton.addEventListener("click", addCard);

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
