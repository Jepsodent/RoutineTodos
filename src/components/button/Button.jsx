import classNames from "classnames";


const Button = (props) => {
  const { status, onclick = () => {}, type = "button" ,  children } = props;
  const baseClasses = " px-4 py-2 rounded-l text-white text-center text-sm fond-semibold shadow-md hover:scale-105 transition-colors duration-200";
  let typeClasses = "";
  if (status === 'add') {
    typeClasses += 'bg-indigo-600 hover:bg-indigo-700';
  } else if (status === 'edit') {
    // typeClasses += 'bg-blue-500 hover:bg-blue-600';
    typeClasses += 'bg-transparent'
  } else if (status === 'delete' ) {
    typeClasses += 'bg-transparent '
  } else if(status === 'save'){
    typeClasses += 'bg-[#9a73dd] hover:bg-[#8456d5]'
  }else if(status === 'cancel'){
    typeClasses += 'bg-red-500 hover:bg-red-600'
  }
  else {
    // Default jika 'type' tidak cocok dengan kondisi di atas
    typeClasses += 'bg-gray-500 hover:bg-gray-600';
  }
  const buttonClasses = classNames(
    baseClasses, 
    typeClasses
  )

  return (
    <button className={`${buttonClasses}`} onClick={onclick} type={type}>
      {children}
    </button>
  );
};

export default Button;
