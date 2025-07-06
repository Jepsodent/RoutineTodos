import { useEffect, useRef, useState } from "react";

const DropDown = ({ options, onSelect, currentFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isOpen]);

  const handleOptionClick = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option.value === currentFilter)?.label ||
          "Select Filter"}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
        className="absolute z-10 mt-2 transition-all duration-200 origin-top-right transform scale-y-100 divide-y rounded-lg shadow-lg opacity-100 w-44 bg-slate-700 divide-slate-600"        >
          <ul
            class="py-2 text-sm text-slate-200"
            aria-labelledby="dropdownDividerButton"
          >
            {options.map((option) => (
                <li key={option.value}>
                <a 
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleOptionClick(option.value); }}
                    className="block px-4 py-2 transition-colors duration-150 hover:bg-slate-600 hover:text-white"
                >
                    {option.label}
                </a>
            </li>
        ))}
    </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
