const Input = (props) => {
  const { value, handleText } = props;
  return (
    <div className="w-full">
      <input
        type="text"
        onChange={handleText}
        value={value}
        className="border border-slate-600 py-2 px-4 bg-[#191d26] w-full min-w-80 flex-grow rounded-l text-white 
        focus:outline-none
        focus:border-transparent
        focus:ring-4
        focus:ring-violet-800
        focus:ring-offset-0
        "
        // className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
        placeholder="Add task..."
      />
    </div>
  );
};

export default Input;
