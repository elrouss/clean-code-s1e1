const formAddTasksElement = document.querySelector(".form_type_add");

const taskListIncompleteElement = document.querySelector(
  ".task-list_type_incomplete"
);
const taskListCompletedElement = document.querySelector(
  ".task-list_type_completed"
);

const bindTaskEvents = function (listItemElement, checkBoxEventHandler) {
  const checkBox = listItemElement.querySelector(".task__checkbox");
  const editButton = listItemElement.querySelector(".task__edit-button");
  const deleteButton = listItemElement.querySelector(".task__delete-button");

  checkBox.onchange = checkBoxEventHandler;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};

const completeTask = function () {
  const listItemElement = this.closest(".task-list__item");
  const labelElement = listItemElement.querySelector(".task__label");

  labelElement.classList.add("task__label_line-through");
  taskListCompletedElement.append(listItemElement);

  bindTaskEvents(listItemElement, incompleteTask);
};

const incompleteTask = function () {
  const listItemElement = this.closest(".task-list__item");
  const labelElement = listItemElement.querySelector(".task__label");

  labelElement.classList.remove("task__label_line-through");
  taskListIncompleteElement.append(listItemElement);

  bindTaskEvents(listItemElement, completeTask);
};

const createNewTaskElement = function (value) {
  const listItemElement = document.createElement("li");
  const taskElement = document.createElement("div");
  const taskWrapperElement = document.createElement("div");
  const checkBoxElement = document.createElement("input");
  const labelElement = document.createElement("label");
  const editInputElement = document.createElement("input");
  const editButtonELement = document.createElement("button");
  const deleteButtonElement = document.createElement("button");
  const deleteButtonImgElement = document.createElement("img");

  listItemElement.className = "task-list__item";
  taskElement.className = "task task_edit-mode_off";
  taskWrapperElement.className = "task__wrapper";
  checkBoxElement.className = "task__checkbox";
  labelElement.className = "task__label";
  editInputElement.className = "task__input";
  editButtonELement.className = "button task__edit-button";
  deleteButtonElement.className = "button task__delete-button";
  deleteButtonImgElement.className = "task__delete-button-img";

  checkBoxElement.type = "checkbox";
  editButtonELement.textContent = "Edit";
  deleteButtonImgElement.src = "./remove.svg";
  deleteButtonImgElement.alt = "Icon for deleting a task";
  labelElement.textContent = value;

  deleteButtonElement.append(deleteButtonImgElement);
  taskWrapperElement.append(checkBoxElement, labelElement, editInputElement);
  taskElement.append(
    taskWrapperElement,
    editButtonELement,
    deleteButtonElement
  );

  listItemElement.append(taskElement);
  bindTaskEvents(listItemElement, completeTask);

  return listItemElement;
};

const addTask = function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const inputValue = formData.get("task");

  if (!inputValue) {
    return;
  }

  const listItemElement = createNewTaskElement(inputValue);

  taskListIncompleteElement.append(listItemElement);

  this.reset();
};

const editTask = function () {
  const taskElement = this.closest(".task");

  const editInputElement = taskElement.querySelector(".task__input");
  const labelElement = taskElement.querySelector(".task__label");
  const editButtonElement = taskElement.querySelector(".task__edit-button");

  if (taskElement.classList.contains("task_edit-mode_on")) {
    labelElement.textContent = editInputElement.value;
    editButtonElement.textContent = "Edit";
  } else {
    editInputElement.value = labelElement.textContent;
    editButtonElement.textContent = "Save";
  }

  taskElement.classList.toggle("task_edit-mode_on");
};

const deleteTask = function () {
  const listItemElement = this.closest(".task-list__item");
  const listElement = listItemElement.parentNode;

  listElement.removeChild(listItemElement);
};

Array.from(taskListIncompleteElement.children).forEach((element) =>
  bindTaskEvents(element, completeTask)
);

Array.from(taskListCompletedElement.children).forEach((element) =>
  bindTaskEvents(element, incompleteTask)
);

formAddTasksElement.addEventListener("submit", addTask);
