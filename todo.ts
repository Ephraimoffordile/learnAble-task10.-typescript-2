interface TodoItem {
    id: number;//identifys each to do task
    text: string;//explains each to do task
    completed: boolean; // shows if each task is completed or not
    dueDate?: Date;
}

class TodoList {
    private items: TodoItem[] = []; // a private array to store a the todoitem
    private nextId: number = 1;// a private number to create a unique id for a new item

    add(text: string, dueDate?: Date): void {
        const newItem: TodoItem = {
            id: this.nextId++,
            text: text,
            completed: false,
            dueDate: dueDate,
        };

        this.items.push(newItem);
        console.log(`Added: ${newItem.text}`);
    }

    listTodos(): TodoItem[] {
        return this.items;
    }

    completeTodo(id: number): void {
        const todo = this.findTodoById(id);

        if (todo) {
            todo.completed = true;
            console.log(`Completed: ${todo.text}`);
        } else {
            console.log(`Todo item with ID ${id} not found.`);
        }
    }

    removeTodo(id: number): void {
        const index = this.findTodoIndexById(id);
        if (index !== -1) {
            const removedTodo = this.items.splice(index, 1)[0];
            console.log(`Removed: ${removedTodo.text}`);
        } else {
            console.log(`Todo item with ID ${id} not found.`);
        }
    }

    filterTodos(completed: boolean): TodoItem[] {
        return this.items.filter(todo => todo.completed === completed);
    }

    updateTodoTask(id: number, newTask: string): void {
        const todo = this.findTodoById(id);
        if (todo) {
            todo.text = newTask;
            console.log(`Updated task ${id} to: ${newTask}`);
        } else {
            console.log(`Todo item with ID ${id} not found.`);
        }
    }

    clearCompletedTodos(): void {
        this.items = this.items.filter(todo => !todo.completed);
        console.log("Cleared completed todos.");
    }

    private findTodoById(id: number): TodoItem | undefined {
        return this.items.find(todo => todo.id === id);
    }

    private findTodoIndexById(id: number): number {
        return this.items.findIndex(todo => todo.id === id);
    }
}

// Example usage
const todoList = new TodoList();
todoList.add("Go to work", new Date("2025-03-01")); // Corrected date format
todoList.add("do your Task");
todoList.add("Read a new chapter", new Date("2025-03-01")); // Corrected date format
todoList.add("sleep by 10pm");

console.log("All Todos:", todoList.listTodos());
todoList.completeTodo(2);

console.log("completed Todos:", todoList.filterTodos(true));

todoList.updateTodoTask(3, "Read a new chapter of the bible");

todoList.removeTodo(1);
console.log("remaining Todos:", todoList.listTodos());

todoList.clearCompletedTodos();
console.log("Remaining Todos after clearing:", todoList.listTodos());