const rootNode = document.getElementById('root');
const todolist = rootNode.querySelector('#todolist');
const maxItems = 10;
const minInputLength = 0;
const renderItem = (text) => {
  const newItem = document.createElement('li');
  newItem.classList.add('todolist-item');
  newItem.classList.add('dragged-item');
  newItem.draggable='true';
  newItem.innerHTML = `
    <i class="material-icons todolist-status">check_box_outline_blank</i>
    <span>${text}</span>
    <i class="material-icons todolist-delete">delete_forever</i>
  `;

  return newItem;
}

window.onload = function () {
  document.getElementById('add-new-input').onkeyup = (event) => {
    if (event.target.value.length > minInputLength) {
      document.getElementById('add').classList.remove('add-button-disabled');
    } else {
      document.getElementById('add').classList.add('add-button-disabled');
    }
  }

  document.getElementById('add').onclick = (event) => {
    if (event.currentTarget.classList.contains('add-button-disabled')) {
      return false;
    }

    const input = document.getElementById('add-new-input');
    const newItem = renderItem(input.value);

    todolist.appendChild(newItem);
    input.value = '';
    document.getElementById('add').classList.add('add-button-disabled');

    initEvents();
    checkMax();
    initDrag();
  }

  const initEvents = () => {
    const todoItems = document.querySelectorAll('.todolist-item');
    todoItems.forEach((todo) => {
      const checkbox = todo.querySelector('.todolist-status');
      const deleteIcon = todo.querySelector('.todolist-delete');

      checkbox.onclick = (event) => {
        event.currentTarget.innerHTML = 'check_box';
      }

      deleteIcon.onclick = (event) => {
        const parent = event.currentTarget.parentNode;
        parent.remove();
        checkMax();
      }
    });
  }

  const checkMax = () => {
    const todolistLength = document.querySelectorAll('.todolist-item').length;
    if (todolistLength >= maxItems) {
      const msg = document.createElement('p');
      msg.classList.add('error');
      msg.innerHTML = 'Maximum item per list are created';
      document.getElementById('add-new-input').disabled = 'true';
      document.querySelector('.todos-wrapper header').appendChild(msg);
    } else {
      document.getElementById('add-new-input').disabled = null;
      if (document.querySelector('.error')) {
        document.querySelector('.error').remove();
      }
    }
  }
}

const initDrag = () => {
  const items = document.getElementsByClassName('dragged-item')
  for(const item of items) {
    item.addEventListener('dragover', dragover);
    item.addEventListener('dragenter', dragenter);
    item.addEventListener('dragleave', dragleave);
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('drop', drop);
  }
}

let dragged = null;

const dragover = (event) => {
  event.preventDefault()
}

const dragenter = (event) => {
  event.preventDefault()
}

const dragleave = (event) => {
  event.preventDefault()
}

const dragstart = (event) => {
  dragged = event.currentTarget;
}

const drop = (event) => {
  if (event.currentTarget.classList.contains('dragged-item')) {
    const parent = event.currentTarget.parentNode;
    parent.insertBefore(dragged, event.currentTarget);
  }
}