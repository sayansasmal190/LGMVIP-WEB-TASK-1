
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const filterButtons = document.querySelectorAll('.filter-button');
let tasks = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

todoInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const task = todoInput.value;
    if (task) {
      addTask(task);
      todoInput.value = '';
    }
  }
});

function addTask(task) {
  const taskObj = {
    id: Date.now(),
    task: task,
    completed: false,
    priority: 'normal'
  };

  tasks.push(taskObj);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks.forEach(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  saveTasks();
  renderTasks();
}

function changePriority(id, priority) {
  tasks.forEach(task => {
    if (task.id === id) {
      task.priority = priority;
    }
  });
  saveTasks();
  renderTasks();
}

function editTask(id, newTask) {
  tasks.forEach(task => {
    if (task.id === id) {
      task.task = newTask;
    }
  });
  saveTasks();
  renderTasks();
}

function sortTasks() {
  tasks.sort((a, b) => {
    if (a.priority === b.priority) {
      return a.id - b.id;
    } else if (a.priority === 'high') {
      return -1;
    } else {
      return 1;
    }
  });
  renderTasks();
}

function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach(task => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      toggleTask(task.id);
    });

    const label = document.createElement('label');
    label.textContent = task.task;
    if (task.completed) {
      label.style.textDecoration = 'line-through';
    }

    const prioritySpan = document.createElement('span');
    prioritySpan.classList.add('priority');
    prioritySpan.textContent = `Priority: ${task.priority}`;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      const newTask = prompt('Enter new task:', task.task);
      if (newTask && newTask.trim() !== '') {
        editTask(task.id, newTask);
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteTask(task.id);
    });

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(prioritySpan);
    todoItem.appendChild(actionsDiv);

    todoList.appendChild(todoItem);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    const filter = button.getAttribute('data-filter');
    filterTasks(filter);
  });
});

function filterTasks(filter) {
  let filteredTasks = [];

  switch (filter) {
    case 'active':
      filteredTasks = tasks.filter(task => !task.completed);
      break;
    case 'completed':
      filteredTasks = tasks.filter(task => task.completed);
      break;
    default:
      filteredTasks = tasks;
  }

  renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
  todoList.innerHTML = '';

  filteredTasks.forEach(task => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      toggleTask(task.id);
    });

    const label = document.createElement('label');
    label.textContent = task.task;
    if (task.completed) {
      label.style.textDecoration = 'line-through';
    }

    const prioritySpan = document.createElement('span');
    prioritySpan.classList.add('priority');
    prioritySpan.textContent = `Priority: ${task.priority}`;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      const newTask = prompt('Enter new task:', task.task);
      if (newTask && newTask.trim() !== '') {
        editTask(task.id, newTask);
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteTask(task.id);
    });

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(prioritySpan);
    todoItem.appendChild(actionsDiv);

    todoList.appendChild(todoItem);
  });
}
  