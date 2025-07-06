import { useEffect, useReducer } from "react";
import { initialState , todoReducer , TodoStateContext , TodoDispatchContext} from "./ToDoReducerAndContext"


export const ToDoProvider = ({children}) => {
    const [state , dispatch] = useReducer(todoReducer ,null, () => {
        const savedTodos = localStorage.getItem("data");
        if(savedTodos){
            try{
                const parsedTodos = JSON.parse(savedTodos); 
                const todos = Array.isArray(parsedTodos) ? parsedTodos : [];
                let initialId = 1;
                if(todos.length > 0){ 
                    const maxId =Math.max(...todos.map((todo) => todo.id || 0)); 
                    initialId = maxId + 1;
                }
                return{
                    todos :todos, 
                    nextId : initialId,
                    editingTodo : null,
                    filterBy : "all"
                }
            }catch(e){
                console.log("Failed to parse : ",e);
                return initialState
            }
        }
        return initialState
    });

    // untuk simpan sesuai todos nya berubah
    useEffect(()=>{
        console.log("State berubah : ", state);
    }, [state])
    useEffect(() => {
        localStorage.setItem("data" , JSON.stringify(state.todos));
        // console.log("Data dimasukkan : ",state.todos);
    } , [state.todos]);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );

}