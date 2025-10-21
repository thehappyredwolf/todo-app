// It's a good practice to keep your API URL in a constant
// If it changes, you only need to update it in one place
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Separate data fetching logic from UI logic
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);

        // Always check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const todos = await response.json();
        return todos.slice(0, 10);  // Let's still work with just 10 items for now
    } catch (error) {
        console.error('Failed to fetch todos:', error);
        return [];  // Return empty array on error - this is a good practice
    }
}

// This reusable function will create a todo item element
// By making this a separate function:
// 1. We can reuse it whenever we need to create a todo item
// 2. If we need to change how todos look, we only change it here
// 3. The code is more organized and easier to maintain
function createTodoElement(todo) {
    const todoElement = document.createElement('div');
    todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    todoElement.id = `todo-${todo.id}`;  // Giving each todo a unique ID is good practice

    // Using template literals for cleaner string concatenation
    todoElement.innerHTML = `
        <span class="todo-text">${todo.title}</span>
        <span class="todo-status">${todo.completed ? '✓' : '○'}</span>
    `;

    return todoElement;
}

// Separate function to render the todo list
// This separation of concerns makes our code more maintainable
function renderTodoList(todos) {
    const todoList = document.getElementById('todoList');

    // Clear existing todos - good practice to prevent duplicates
    todoList.innerHTML = '';

    // If we have no todos, show a message
    if (todos.length === 0) {
        todoList.innerHTML = '<p>No todos found.</p>';
        return;
    }

    // Create and append each todo element
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
}

// Initialize our app
async function initializeApp() {
    const todos = await fetchTodos();
    renderTodoList(todos);
}

// Wait for the DOM to be ready before running our code
document.addEventListener('DOMContentLoaded', initializeApp);