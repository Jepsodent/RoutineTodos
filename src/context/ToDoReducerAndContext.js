import { createContext } from "react";


export const initialState = {
    todos : [],
    nextId : 1,
    editingTodo: null,
}


export const todoReducer = (state , action) => {

    switch(action.type)
    {
        case "ADD_TODO":
            return {
                ...state ,
                todos : [...state.todos , action.payload],
                nextId : state.nextId + 1
            };
        case "DELETE_TODO" :
            return{
                ...state , 
                todos : state.todos.filter((todo) => todo.id !== action.payload )
            };
        case "TOGGLE_EDIT_MODAL" :
            // kirim payload object todos yg bakal di edit
            return{
                ...state,
                editingTodo : action.payload
            };
        case "SAVE_TODO":
            // kirim object id dan newTextValue
            return {
              ...state,
              todos: state.todos.map((todo) =>
                todo.id === action.payload.id
                  ? { ...todo, text: action.payload.newText }
                  : todo
              ),
              editingTodo : null
            };
        case "CANCEL_EDIT" :
            return{
                ...state,
                editingTodo : null
            };
        case "SET_INITIAL_VALUE":
            // action nya nanti {todos : array  , nextId : nomor_id}
            return{
                ...state,
                todos : action.payload.todos,
                nextId : action.payload.nextId,
            };
        default:
            return state;
    }
}

export const TodoStateContext = createContext(initialState);
export const TodoDispatchContext = createContext(null);