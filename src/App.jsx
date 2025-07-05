import { ToDoProvider } from "./context/ToDoContext";
import DashBoard from "./pages/dashboard";

function App() {
  return (
    <> 
    <ToDoProvider>      
      <DashBoard></DashBoard>
    </ToDoProvider>
    </>
  )
}

export default App
