import { useCallback, useContext } from "react";
import { TodoDispatchContext } from "../context/ToDoReducerAndContext";


export const useTodoAction = () => {
    const dispatch = useContext(TodoDispatchContext);
    const handleAddTodo = (value, nextId) => {
        dispatch({
          type: "ADD_TODO",
          payload: {
            text: value,
            id: nextId,
            completed: false,
          },
        });
      };
    
      const handleDeleteTodo = (id) => {
        dispatch({
          type: "DELETE_TODO",
          payload: id,
        });
      };
    
      const handleEditTodo = (editTodos) => {
          dispatch({
            type: "TOGGLE_EDIT_MODAL",
            payload: editTodos,
          });
      };
    
      const handleCancelEdit = () => {
        dispatch({
          type: "CANCEL_EDIT",
        });
      };
      const handleSaveEdit = (id, newText) => {
        dispatch({
          type: "SAVE_TODO",
          payload: {
            id: id,
            newText: newText,
          },
        });
      };
      const handleToggleAction = (id) => {
        dispatch({
          type:"TOGGLE_COMPLETE",
          payload: id
        })
      }

      const handleFilterAction = useCallback((text) => {
        dispatch({
          type : "FILTER",
          payload : text,
        })
      }, [dispatch])

      return{
        handleAddTodo ,handleDeleteTodo,handleEditTodo,handleCancelEdit , handleSaveEdit, handleToggleAction,handleFilterAction
      };
}