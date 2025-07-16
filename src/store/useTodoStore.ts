import { create } from "zustand";
import { TodoStore , TodosObject } from "@/types/todo";



const useTodoStore = create<TodoStore>((set) => ({
    // initial storage
    todos: [],
    nextId : 1,
    editingTodo : null , 
    filterBy : "all",
    // action
    loadInitialData : () => {
        const savedData = localStorage.getItem("data");
        let parsedData  = [];
        let initialNextId = 1;
        if(savedData){
            try{
                const tempParsed = JSON.parse(savedData);
                if(Array.isArray(tempParsed)){
                    parsedData = tempParsed;
                }
            }catch(e){
                console.log("Unexpected Error ", e);
            }
        }
        if(parsedData.length > 0) {
            const maxId = Math.max(...parsedData.map((todo) => todo.id || 0));
            initialNextId = maxId + 1;
        }

        set({    
                todos : parsedData,
                nextId : initialNextId,
            }
        )
    },

    addTodo : (text) => set((state) =>{
        const newTodos:TodosObject = {
            text,
            id : state.nextId,
            completed : false
        }
        return{
            ...state ,
            todos : [...state.todos , newTodos ],
            nextId : state.nextId + 1
        }
    }),
    deleteTodo : (id) => set((state) => {
        return{
            ...state,
            todos : state.todos.filter((todo) => todo.id !== id)
        }
    }),
    editTodo : (editTodos) => set((state) =>{
        return{
            ...state, 
            editingTodo : editTodos
        }
    }),
    cancelEdit : () => set((state) => {
        return{
            ...state,
            editingTodo : null
        }
    }),
    saveEdit : (id , newText) => set((state) => {
        return{
            ...state,
            todos: state.todos.map((todo) => todo.id === id ? {...todo ,text : newText} : todo),
            editingTodo : null
        }
    }),
    toggleAction : (id) => set((state) => {
        return{
            ...state,
            todos : state.todos.map((todo) => todo.id === id ? {...todo , completed : !todo.completed} : todo)
        }
    }),
    setFilter : (value) => set((state) => {
        return{
            ...state,
            filterBy : value
        }
    }),

}));

useTodoStore.getState().loadInitialData();

type SubscribeListen = (state:TodoStore) => void
type SubscribeSelector = (state:TodoStore) => void

(useTodoStore.subscribe as (listener: SubscribeListen, selector?: SubscribeSelector) => () => void)(
    (currentState: TodoStore) => 
    {
        localStorage.setItem("data", JSON.stringify(currentState.todos))
        console.log("Data berubah (todos)");
    },
        (state: TodoStore) => state.todos
);


export default useTodoStore;