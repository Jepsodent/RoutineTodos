import { useContext } from "react";
import Card from "../Fragment/Card";
import InputForm from "../Fragment/InputForm";
import EditForm from "../Fragment/EditForm";

import { TodoStateContext } from "../context/ToDoReducerAndContext";
import { useTodoAction } from "../hooks/todoAction";

const ToDoLayout = () => {
  const state = useContext(TodoStateContext);
  const { handleDeleteTodo, handleEditTodo } = useTodoAction();
  const { todos, editingTodo } = state;

  const onEditClick = (id) => {
    const findEditTodo = todos.find((todo) => todo.id === id);
    if (findEditTodo) {
      handleEditTodo(findEditTodo);
    }
  };

  const onDeleteClick = (id) => {
    handleDeleteTodo(id);
  };

  return (
    <div className="flex flex-col min-h-screen  items-center gap-4 pt-30 font-mono">
      <h3 className="text-4xl font-bold text-white  ">Routine<span className="text-[#8456d5]">Todos</span></h3>
      <p className="text-base font-bold text-slate-500  ">
        My React To Do List Project!
      </p>
      <div className="w-full flex justify-center items-center">
        <div className="min-w-180  flex flex-col items-center">
          <div className="w-full">
            <InputForm />
          </div>
          <div className="w-full">
            {todos.length === 0 ? (
              <p className="text-center text-gray-400 mb-4">No task yet!</p>
            ) : (
              <ul className="py-4">
                {todos.map((todo) => (
                  <li key={todo.id}>
                    <Card
                      onEditClick={() => onEditClick(todo.id)}
                      onDeleteClick={() => onDeleteClick(todo.id)}
                    >
                      {todo.text}
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* open modal untuk edit */}
        {editingTodo && <EditForm></EditForm>}
      </div>
    </div>
  );
};

export default ToDoLayout;
