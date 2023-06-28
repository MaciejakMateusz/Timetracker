/** ----- IMPORTS ----- **/

import {
    apiListOperationsForTask,
    apiDeleteTask,
    apiDeleteOperation,
    apiUpdateTask,
    apiUpdateOperation,
    apiListTasks
} from './apiFunctions.js';

import {
    formatTime
} from './utilityFunctions.js';

import {
    operationListenerOnInput,
    operationListenerOnSubmit
} from './eventListeners.js'

/** ----- RENDERING TASKS ----- **/

apiListTasks().then(function (tasksList) {
    tasksList.data.forEach(function (task) {
        renderTask(task.id, task.title, task.description, task.status)
    });
});

export function renderTask(taskId, title, description, status) {

    const mainSection = document.querySelector('#app');

    const section = document.createElement('section');
    section.className = 'card mt-5 shadow-sm';

    const mainDiv = document.createElement('div');
    mainDiv.className = 'card-header d-flex justify-content-between align-items-center';

    const titleDiv = document.createElement('div');
    const h5 = document.createElement('h5');
    h5.innerText = title;
    const h6 = document.createElement('h6');
    h6.innerText = description;
    h6.className = 'card-subtitle text-muted';

    titleDiv.appendChild(h5);
    titleDiv.appendChild(h6);

    mainDiv.appendChild(titleDiv);

    const buttonDiv = document.createElement('div');

    if (Object.is(status, 'open')) {

        const finishButton = document.createElement('button');
        finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
        finishButton.innerText = 'Finish';
        buttonDiv.appendChild(finishButton);

        finishButton.addEventListener('click', function () {
            apiUpdateTask(taskId, title, description, 'closed')
                .then(function () {
                    const openTaskElements = section.querySelectorAll('.js-task-open-only');
                    openTaskElements.forEach(function (element) {
                        element.parentElement.removeChild(element);
                    });
                });
        });
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn-sm ml-2';
    deleteButton.innerText = 'Delete';
    buttonDiv.appendChild(deleteButton);

    deleteButton.addEventListener('click', function () {
        apiDeleteTask(taskId).then(function () {
            section.remove();
        });
    })

    mainDiv.appendChild(buttonDiv);
    section.appendChild(mainDiv);

    const ul = document.createElement('ul');
    ul.className = 'list-group list-group-flush';

    apiListOperationsForTask(taskId).then(function (operationsList) {
        operationsList.data.forEach(function (operation) {
            renderOperation(ul, status, operation.id, operation.description, operation.timeSpent);
        });
    });

    section.appendChild(ul);

    if (Object.is(status, 'open')) {

        const formDiv = document.createElement('div');
        formDiv.className = 'card-body js-task-open-only';

        const addOperationForm = document.createElement('form');
        const inputsDiv = document.createElement('div');
        inputsDiv.className = 'input-group';
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Operation description';
        descriptionInput.className = 'form-control';
        descriptionInput.id = 'description-input';
        inputsDiv.appendChild(descriptionInput);

        const addOperationBtnDiv = document.createElement('div');
        addOperationBtnDiv.className = 'input-group-append';

        const addOperationBtn = document.createElement('button');
        addOperationBtn.className = 'btn btn-info';
        addOperationBtn.innerText = 'Add';
        addOperationBtn.disabled = true;

        addOperationBtnDiv.appendChild(addOperationBtn);
        inputsDiv.appendChild(addOperationBtnDiv);

        addOperationForm.appendChild(inputsDiv);
        formDiv.appendChild(addOperationForm);

        operationListenerOnInput(descriptionInput, addOperationForm, addOperationBtn);
        operationListenerOnSubmit(addOperationForm, taskId, ul, status, addOperationBtn);
        section.appendChild(formDiv);
    }
    mainSection.appendChild(section);
}

/** ----- RENDERING OPERATIONS ----- **/

export function renderOperation(ul, status, operationID, operationDescription, timeSpent) {

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = operationDescription;

    const badgeSpan = document.createElement('span');
    badgeSpan.className = 'badge badge-success badge-pill ml-2';
    badgeSpan.innerText = formatTime(timeSpent);

    descriptionDiv.appendChild(badgeSpan);
    li.appendChild(descriptionDiv);

    const buttonDiv = document.createElement('div');
    const button15m = document.createElement('button');
    const button1h = document.createElement('button');
    const buttonDelete = document.createElement('button');

    if (Object.is(status, 'open')) {

        button15m.className = 'btn btn-outline-success btn-sm mr-2 js-task-open-only';
        button15m.innerText = '+15m';
        button1h.className = 'btn btn-outline-success btn-sm mr-2 js-task-open-only';
        button1h.innerText = '+1h';
        buttonDelete.className = 'btn btn-outline-danger btn-sm js-task-open-only';
        buttonDelete.innerText = 'Delete';

        buttonDiv.appendChild(button15m);
        buttonDiv.appendChild(button1h);
        buttonDiv.appendChild(buttonDelete);

        button15m.addEventListener('click', function () {
            apiUpdateOperation(operationID, operationDescription, timeSpent += 15)
                .then(function (operation) {
                    badgeSpan.innerText = formatTime(operation.data.timeSpent);
                });
        });

        button1h.addEventListener('click', function () {
            apiUpdateOperation(operationID, operationDescription, timeSpent += 60)
                .then(function (operation) {
                    badgeSpan.innerText = formatTime(operation.data.timeSpent);
                });
        });

        buttonDelete.addEventListener('click', function () {
            apiDeleteOperation(operationID).then(function () {
                li.remove();
            });
        });

        li.appendChild(buttonDiv);

    }

    ul.appendChild(li);

}