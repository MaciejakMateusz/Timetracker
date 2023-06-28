/** ----- IMPORTS ----- **/

import {apiCreateOperation, apiCreateTask} from './apiFunctions.js';
import {renderOperation, renderTask} from './renderingFunctions.js';

/** ----- EVENT LISTENERS ----- **/

const taskAddingForm = document.querySelector('.js-task-adding-form');
const taskTitleInput = taskAddingForm.children[0].firstElementChild;
const addTaskButton = taskAddingForm.lastElementChild;
addTaskButton.disabled = true;

taskTitleInput.addEventListener('input', function () {
    const errorMessage = taskAddingForm.querySelector('#error-message');
    const shortTitleError = taskAddingForm.querySelector('#short-title');

    if(taskTitleInput.value.length >= 5) {
        if (shortTitleError) {
            shortTitleError.remove();
        }
    }

    if (taskTitleInput.value === '') {
        addTaskButton.disabled = true;
        if (shortTitleError) {
            shortTitleError.remove();
        }
        if (!errorMessage) {
            const error = document.createElement('span');
            error.id = 'error-message';
            error.innerText = "Task must contain a title";
            error.style.color = 'red';
            error.style.fontSize = '0.9rem'
            taskAddingForm.firstElementChild.appendChild(error);
        }
    } else {
        addTaskButton.disabled = false;
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});

taskAddingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formElements = e.currentTarget.children;

    const title = formElements[0].firstElementChild.value;
    const description = formElements[1].firstElementChild.value;

    if (Object.is(title, "")) {
        return;
    }

    const shortTitle = taskAddingForm.querySelector('#short-title');
    if (title.length < 5) {
        if (!shortTitle) {
            const error = document.createElement('span');
            error.id = 'short-title';
            error.innerText = "Title must be at least 5 characters long";
            error.style.color = 'red';
            error.style.fontSize = '0.9rem'
            taskAddingForm.firstElementChild.appendChild(error);
            return;
        }
    }

    if (!(title.length < 5)) {
        apiCreateTask(title, description)
            .then(function (task) {
                renderTask(task.data.id, title, description, task.data.status);
            });
        e.currentTarget.reset();
        addTaskButton.disabled = true;
        if (shortTitle) {
            shortTitle.remove();
        }
    }
});

export function operationListenerOnInput(descriptionInput, addOperationForm, addOperationBtn) {
    descriptionInput.addEventListener('input', function () {
        const errorMessage = addOperationForm.querySelector('#operation-error-message');
        const shortDescriptionError = addOperationForm.querySelector('#short-description');

        if (descriptionInput.value.length >= 5) {
            if (shortDescriptionError) {
                shortDescriptionError.remove();
            }
        }

        if (descriptionInput.value === '') {
            addOperationBtn.disabled = true;
            if (shortDescriptionError) {
                shortDescriptionError.remove();
            }
            if (!errorMessage) {
                const error = document.createElement('span');
                error.innerText = 'Operation must contain a description';
                error.style.color = 'red';
                error.style.fontSize = '0.9rem';
                error.id = 'operation-error-message';
                addOperationForm.appendChild(error);
            }
        } else {
            addOperationBtn.disabled = false;
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    });
}

export function operationListenerOnSubmit(addOperationForm, taskId, ul, status, addOperationBtn) {
    addOperationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formElements = e.currentTarget.elements;
        const description = formElements[0].value;

        if (Object.is(description, '')) {
            return;
        }

        const shortDescriptionError = addOperationForm.querySelector('#short-description');
        if (description.length < 5) {
            if (!shortDescriptionError) {
                const error = document.createElement('span');
                error.id = 'short-description';
                error.innerText = "Title must be at least 5 characters long";
                error.style.color = 'red';
                error.style.fontSize = '0.9rem'
                addOperationForm.appendChild(error);
                return;
            }
        }

        if (!(description.length < 5)) {
            apiCreateOperation(description, taskId).then(function (operation) {
                renderOperation(ul, status, operation.data.id, description, 0)
            });
            e.currentTarget.reset();
            addOperationBtn.disabled = true;
            if (shortDescriptionError) {
                shortDescriptionError.remove();
            }
        }
    });
}