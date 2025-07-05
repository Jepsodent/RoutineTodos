import { useContext, useEffect, useState } from "react";
import Button from "../components/button/Button";
import { TodoStateContext } from "../context/ToDoReducerAndContext";
import { useTodoAction } from "../hooks/todoAction";

const EditForm = () => {
  const state = useContext(TodoStateContext);
  const {text , id} = state.editingTodo;
  const {handleCancelEdit , handleSaveEdit} = useTodoAction();

  const [editText, setEditText] = useState(text);
  const [error , setError] = useState("");

  useEffect(() => {
    setEditText(text);
  }, [text])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editText.trim()){
      handleSaveEdit(id , editText.trim());
    }
    else{
        setError("Jangan di kosongin")
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-blue-100/0">
      <div className="bg-[#3D2E4F] min-w-120 min-h-60 p-8 rounded-md shadow-lg z-60 ">
        <h2 className="text-center text-xl mb-4 text-slate-200">Edit Your Task</h2>
          <form className="flex justify-between gap-4 flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
              className="border border-gray-300 p-2 w-full min-w-80 flex-grow rounded-l-md text-slate-200 
              focus:outline-none
              "
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center gap-8 mt-4">
                <Button status="save" type="submit">
                Save
                </Button>
                <Button status ="cancel" onclick = {handleCancelEdit}>Cancel</Button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default EditForm;
