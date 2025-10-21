async function exploreTodoData() {
    try {
        // Fetch todos from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await response.json();

        // Let's look at all our data in the console
        console.log('All todos:', todos);

        // Let's look at just one todo to understand its structure
        console.log('Example of a single todo:', todos[0]);

        // Let's see how many todos we got
        console.log('Number of todos:', todos.length);

        // What properties does each todo have?
        const sampleTodo = todos[0];
        console.log('Properties in a todo:', Object.keys(sampleTodo));

        // Let's see some statistics
        const completedTodos = todos.filter(todo => todo.completed).length;
        console.log('Number of completed todos:', completedTodos);
        console.log('Number of incomplete todos:', todos.length - completedTodos);

        // Display first few todos in a simple format
        displaySimpleTodoList(todos.slice(0, 10));

    } catch (error) {
        console.error('Failed to fetch todos:', error);
    }
}

function displaySimpleTodoList(todos) {
    const root = document.getElementById('root');
    root.innerHTML = '<h2>First 10 Todos:</h2>';

    todos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.textContent = `• ${todo.title} (${todo.completed ? 'Completed' : 'Pending'})`;
        root.appendChild(todoElement);
    });
}

// Run our exploration
exploreTodoData();