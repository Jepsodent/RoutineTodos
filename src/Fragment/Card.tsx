import { memo} from "react";
import Button from "../components/button/Button";
import useTodoStore from "../store/useTodoStore";
import { useShallow } from "zustand/react/shallow";
import { TodosObject } from "@/types/todo";

type CardProps = {
  todo: TodosObject;
}


const Card = (props: CardProps) => {
  
  const {editTodo , deleteTodo , toggleAction } = useTodoStore(useShallow((state) => 
    (
      {
        editTodo : state.editTodo,
        deleteTodo : state.deleteTodo,
        toggleAction : state.toggleAction    
      }
    )));
  
  const { todo } = props;
  console.log("Card render for id : ",todo.id);
  
  const onEditClick = () => {
    editTodo(todo);
  }
  
  const onDeleteClick = () => {
    deleteTodo(todo.id) 
  }
  
  const onCompleteClick = () => {
    toggleAction(todo.id);
  }
  return (
    <div className="flex items-center justify-between p-2 m-4  bg-[#393E6F] rounded-md font-medium text-md hover:bg-[#3D2E4F]">
      <input type="checkbox"
        checked = {todo.completed}
        onChange={onCompleteClick}
        className="w-6 h-4 "
      />
      <div className={`w-full mx-8 text-slate-200  ${todo.completed && `line-through text-slate-400`}`}>{todo.text}</div>
      <Button status="edit" onclick={onEditClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="transition-colors duration-200 size-5 text-slate-400 hover:text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </Button>
      <Button status="delete" onclick={onDeleteClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="transition-colors duration-200 size-5 text-slate-400 hover:text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </Button>
    </div>
  );
};

export default memo(Card);
