import { useContext, useState } from "react";
import Input from "../components/Input";
import Button from "../components/button/Button";
import { TodoStateContext } from "../context/ToDoReducerAndContext";
import { useTodoAction } from "../hooks/todoAction";

const InputForm = () => {
  const state = useContext(TodoStateContext);
  const { handleAddTodo } = useTodoAction();
  const { nextId } = state;

  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleText = (e) => {
    setValue(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setError("Tidak boleh kosong!");
    } else {
      handleAddTodo(value, nextId);
      console.log(value);
      setError("");
      setValue("");
    }
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="flex gap-4 my-4">
        <Input value={value} handleText={handleText} error={error} />
        <Button status="add" type="submit">
          <div className="flex items-center justify-center gap-3 text-base">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add
          </div>
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default InputForm;
