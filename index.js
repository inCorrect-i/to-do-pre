// Создаем константу для первоначальных задач
const initialItems = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

let items = []; // Текущие задачи будем хранить здесь

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const tsksSaved = localStorage.getItem("tasks");

    if (tsksSaved !== null) {
        return JSON.parse(tsksSaved);
    }
    else {
        return initialItems; // Используем константу вместо переменной
    }
}

function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");
    textElement.textContent = item;

    deleteButton.addEventListener("click", function() {
        clone.remove();                 
        items = getTasksFromDOM();    
        saveTasks(items);                 
    });
  
    duplicateButton.addEventListener("click", function() {
        const itemName = textElement.textContent;           
        const newItem = createItem(itemName);               
        listElement.prepend(newItem);                       
        items = getTasksFromDOM();                         
        saveTasks(items);                                  
    });  

    editButton.addEventListener("click", function() {
        textElement.contentEditable = true;
        textElement.focus();
    });

    textElement.addEventListener("blur", function() {
        textElement.contentEditable = false;
        items = getTasksFromDOM();
        saveTasks(items);
    });

    return clone;
}

function getTasksFromDOM() {
    const elemsNames = document.querySelectorAll(".to-do__item-text");
    const tasks = [];
    elemsNames.forEach(function(element) {
        tasks.push(element.textContent);
    });
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Инициализация
items = loadTasks();
items.forEach(function(item) {
    const elemT = createItem(item);
    listElement.append(elemT);
});

formElement.addEventListener("submit", function(evt) {
    evt.preventDefault();
    const newTaskText = inputElement.value.trim();
    if (newTaskText === "") {
        return;
    }
    const newTaskElement = createItem(newTaskText);
    listElement.prepend(newTaskElement);
    items = getTasksFromDOM(); 
    saveTasks(items);
    formElement.reset();
});