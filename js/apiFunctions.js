export const apiHost = 'https://todo-api.coderslab.pl';
export const apiKey = '04ec235a-4af9-45a0-ab7b-583bfa93431b';

export function apiListTasks() {
    return fetch(`${apiHost}/api/tasks`,
        {
            headers: {Authorization: apiKey}
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Connection with api/tasks failed')
            }
        })
        .then(data => {
            return data;
        }).catch(error => {
            console.log(error);
        });
}

export function apiListOperationsForTask(taskId) {
    return fetch(`${apiHost}/api/tasks/${taskId}/operations`, {
        headers: {Authorization: apiKey}
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Connection with api/tasks/.../operations failed');
            }
        }).catch(error => {
            console.log(error);
        });
}


export function apiCreateTask(title, description) {
    return fetch(`${apiHost}/api/tasks`, {
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json' // Ustawienie typu danych na json, bez tego wywala kod 400
        },
        body: JSON.stringify({title: title, description: description, status: 'open'}),
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/tasks failed');
        }
    }).catch(error => {
        console.log(error);
    });
}

export function apiCreateOperation(description, taskId) {
    return fetch(`${apiHost}/api/tasks/${taskId}/operations`, {
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: description, timeSpent: 0}),
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Connection with api/tasks/${taskId}/operations failed`);
        }
    }).catch(error => {
        console.log(error);
    });
}

export function apiDeleteTask(taskId) {
    return fetch(`${apiHost}/api/tasks/${taskId}`, {
        headers: {Authorization: apiKey},
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/tasks failed');
        }
    }).catch(error => {
        console.log(error);
    });
}

export function apiDeleteOperation(operationId) {
    return fetch(`${apiHost}/api/operations/${operationId}`, {
        headers: {Authorization: apiKey},
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/operations failed');
        }
    }).catch(error => {
        console.log(error)
    })
}

export function apiUpdateOperation(operationId, description, timeSpent) {
    return fetch(`${apiHost}/api/operations/${operationId}`, {
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: description, timeSpent: timeSpent}),
        method: 'PUT'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/operations failed');
        }
    }).catch(error => {
        console.log(error);
    });
}

export function apiUpdateTask(taskId, title, description, status) {
    return fetch(`${apiHost}/api/tasks/${taskId}`, {
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, description: description, status: status}),
        method: 'PUT'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/tasks failed');
        }
    }).catch(error => {
        console.log(error);
    });
}