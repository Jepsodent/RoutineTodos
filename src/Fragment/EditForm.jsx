import {useEffect, useState } from "react";
import Button from "../components/button/Button";
import useTodoStore from "../store/useTodoStore";
import { useShallow } from "zustand/react/shallow";

const EditForm = () => {
  const {editingTodo , cancelEdit , saveEdit} = useTodoStore(useShallow((state) => (
    {
      editingTodo : state.editingTodo,
      cancelEdit : state.cancelEdit,
      saveEdit : state.saveEdit
    }
  )));
  const {text , id } = editingTodo;


  
  const [editText, setEditText] = useState(text);
  const [error , setError] = useState("");

  useEffect(() => {
    setEditText(text);
  }, [text])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editText.trim()){
      saveEdit(id , editText.trim());
    }
    else{
        setError("Jangan di kosongin")
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-blue-100/0">
      <div className="bg-[#3D2E4F] min-w-120 min-h-60 p-8 rounded-md shadow-lg z-60 ">
        <h2 className="mb-4 text-xl text-center text-slate-200">Edit Your Task</h2>
          <form className="flex flex-col justify-between gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
              className="flex-grow w-full p-2 border border-gray-300 min-w-80 rounded-l-md text-slate-200 focus:outline-none "
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center gap-8 mt-4">
                <Button status="save" type="submit">
                Save
                </Button>
                <Button status ="cancel" onclick = {cancelEdit}>Cancel</Button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default EditForm;
