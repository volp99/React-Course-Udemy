class Todo {
    id: string;
    text: string

    // inizializzo id e text ed li assegno al constructor
    constructor(todoText: string) {
        this.text = todoText;
        this.id = new Date().toISOString();
    }
}

export default Todo;