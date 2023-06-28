export const apiHost = '';
export const apiKey = '';

export function apiListTasks() {
    return fetch(`${apiHost}/api/tasks`,
        {
            headers: {Authorization: apiKey}
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Connection with api/tasks failed')
            }
        })
        .then(function (data) {
            return data;
        }).catch(function (error) {
            console.log(error);
        });
}

export function apiListOperationsForTask(taskId) {
    return fetch(`${apiHost}/api/tasks/${taskId}/operations`, {
        headers: {Authorization: apiKey}
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Connection with api/tasks/.../operations failed');
            }
        }).catch(function (error) {
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
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/tasks failed');
        }
    }).catch(function (error) {
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
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Connection with api/tasks/${taskId}/operations failed`);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

export function apiDeleteTask(taskId) {
    return fetch(`${apiHost}/api/tasks/${taskId}`, {
        headers: {Authorization: apiKey},
        method: 'DELETE'
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/tasks failed');
        }
    }).catch(function (error) {
        console.log(error);
    });
}

export function apiDeleteOperation(operationId) {
    return fetch(`${apiHost}/api/operations/${operationId}`, {
        headers: {Authorization: apiKey},
        method: 'DELETE'
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/operations failed');
        }
    }).catch(function (error) {
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
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/operations failed');
        }
    }).catch(function (error) {
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
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Connection with api/tasks failed');
        }
    }).catch(function (error) {
        console.log(error);
    });
}