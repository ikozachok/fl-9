const rootNode = document.getElementById('root');
const todolist = rootNode.querySelector('#todolist');
const minInputLength = 0;

const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
// const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
//     todo: [],
//     completed: []
// }

let todos = [];

let index = todos.length + 1;

const getItem = (id) => {
    return todos.find((item) => item.id === id);
}

const addItem = (text) => {
    todos.push(
        {
            id: 'todo-' + index++,
            text,
            complited: false
        }
    );

    sortList();
}

const removeItem = (id) => {
    todos = todos.filter((item) => item.id !== id);
}

const compliteItem = (id) => {
    todos = todos.map((item) => {
        if (item.id === id) {
            return {
                    id: item.id,
                    text: item.text,
                    complited: true
                }
        }

        return item;
    });
}

const updateItem = (id, text) => {
    todos = todos.map((item) => {
        if (item.id === id) {
            return {
                    id: item.id,
                    text: text,
                    complited: item.complited
                }
        }

        return item;
    });
}

const sortList = () => {
    todos = todos.sort((a, b) => a.complited > b.complited);
}

const renderItem = (todo) => {
    const newItem = document.createElement('li');

    newItem.dataset.id = todo.id
    newItem.classList.add('todolist-item');
    if (todo.complited) {
        newItem.classList.add('checked');
        newItem.innerHTML += '<img class="todolist-status" src="assets/img/done-s.png">';
        newItem.innerHTML += `<a href="#">${todo.text}</a>`;
    } else {
        newItem.innerHTML += '<img class="todolist-status" src="assets/img/todo-s.png">';
        newItem.innerHTML += `<a href="#/modify/${todo.id}">${todo.text}</a>`;
    }
    newItem.innerHTML += '<img class="todolist-delete" src="assets/img/remove-s.jpg">';

    return newItem;
}

const renderList = (todos) => {
    todolist.innerHTML = '';
    if (todos && todos.length) {
        todos.forEach((item) => {
            const newItem = renderItem(item);
            todolist.appendChild(newItem);
        });
    } else {
        todolist.innerHTML = 'TODO is empty';
    }

    initEvents();
}

document.getElementById('add-new-input').onkeyup = (event) => {
    if (event.target.value.length > minInputLength) {
        document.getElementById('save').classList.remove('save-input-disabled');
    } else {
        document.getElementById('save').classList.add('save-input-disabled');
    }
}

document.getElementById('save').onclick = (event) => {
    if (event.currentTarget.classList.contains('save-input-disabled')) {
        return false;
    }

    const input = document.getElementById('add-new-input');

    location.hash = '';
    addItem(input.value);
    renderList(todos);

    input.value = '';
    document.getElementById('save').classList.add('save-input-disabled');
}

const initEvents = () => {
    const todoItems = document.querySelectorAll('.todolist-item');
    todoItems.forEach((todo) => {
        const checkbox = todo.querySelector('.todolist-status');
        const deleteIcon = todo.querySelector('.todolist-delete');

        checkbox.onclick = (event) => {
            const parent = event.currentTarget.parentNode;
            compliteItem(parent.dataset.id);
            sortList();
            renderList(todos);
        }

        deleteIcon.onclick = (event) => {
            const parent = event.currentTarget.parentNode;
            removeItem(parent.dataset.id);
            renderList(todos);
        }
    });
}

const buttonAdd = document.querySelector('#add');
const buttonCancel = document.querySelectorAll('.cancel-input');

buttonAdd.onclick = function(event) {
    location.hash = '#/add';
}

buttonCancel.forEach((item) => {
    item.onclick = function(event) {
        location.hash = '';
    }
});

const buttonSave = document.querySelector('#save');

const hashHandler = () => {
    const minusOne = -1;
    page1.style.display = 'none';
    page2.style.display = 'none';
    page3.style.display = 'none';

    if (location.hash === '#/add') {
        page2.style.display = 'block';
    } else if (location.hash.indexOf('#/modify') > minusOne) {
        const id = location.hash.replace('#/modify/', '');
        const input = document.getElementById('change-input');
        const todo = getItem(id);
        input.value = todo.text;

        document.querySelector('.update-input').onclick = (event) => {
            updateItem(id, input.value);
            location.hash = '';
            renderList(todos);
        }
        page3.style.display = 'block';
    } else {
        page1.style.display = 'block';
    }
}

renderList(todos);
hashHandler();

window.onhashchange = hashHandler;
