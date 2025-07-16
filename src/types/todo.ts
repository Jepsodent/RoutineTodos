
export type TodosObject = {
    text: string;
    id : number;
    completed : boolean;
}

export type FilterOptions = "all" | "completed" | "remaining";

export type TodoStoreState = {
    todos: Array<TodosObject>;
    nextId: number;
    editingTodo: TodosObject | null; 
    filterBy: FilterOptions; 
}

export interface TodoStore extends TodoStoreState {
    loadInitialData: () => void;
    addTodo: (text: string) => void;
    deleteTodo: (id: number) => void;
    editTodo: (todoObject: TodosObject) => void; 
    cancelEdit: () => void;
    saveEdit: (id: number, newText: string) => void;
    toggleAction: (id: number) => void;
    setFilter: (value: FilterOptions) => void;
}

