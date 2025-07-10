import { useCallback, useMemo } from "react";
import Card from "../Fragment/Card";
import InputForm from "../Fragment/InputForm";
import EditForm from "../Fragment/EditForm";

import DropDown from "../components/button/CustomDropDown";
import useTodoStore from "../store/useTodoStore";
import { useShallow } from "zustand/react/shallow";

const ToDoLayout = () => {
  // using zustand
  const {todos , editingTodo , filterBy ,setFilter } = useTodoStore(useShallow((state) => 
  (
    {
    todos : state.todos, 
    editingTodo : state.editingTodo , 
    filterBy : state.filterBy,
    setFilter : state.setFilter
    }
  )
  ))

  const filterTodos = useMemo(() => {
    console.log("filterTodos dijalankan")
    return todos.filter((todo) => {
      if (filterBy === "completed") {
        return todo.completed;
      }
      if (filterBy === "remaining") {
        return !todo.completed;
      }
      return true;
    });
  } , [todos , filterBy])

  const onSelect = useCallback((value) => {
    setFilter(value);
  }, [setFilter]);
  
  

  return (
    <div className="flex flex-col items-center min-h-screen gap-4 font-mono pt-30">
      <h3 className="text-4xl font-bold text-white ">
        Routine<span className="text-[#8456d5]">Todos</span>
      </h3>
      <p className="text-base font-bold text-slate-500 ">
        My React To Do List Project!
      </p>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center min-w-180">
          <div className="w-full ">
            <InputForm />
          </div>
          <div className="flex items-center justify-between w-full px-4 ">
            {/* Ini adalah tempat untuk "Status Count" nanti */}
            <div className="flex gap-8 ml-4 text-sm text-slate-400">
              <p className="text-violet-300">all: {todos.length} </p>
              <p className="text-green-500">completed:{todos.filter((todo) => todo.completed).length}</p>
              <p className="text-amber-500">remaining:{todos.filter(todo => !todo.completed).length} </p>
            </div>
            <DropDown
              onSelect={onSelect}
              currentFilter={filterBy}
            ></DropDown>
          </div>
          <div className="w-full">
            {todos.length === 0 ? (
              <p className="mb-4 text-center text-gray-400">No task yet!</p>
            ) : (
              <ul className="py-4">
                {filterTodos.map((todo) => (
                  <li key={todo.id}>
                    <Card
                      todo={todo}
                    />
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
