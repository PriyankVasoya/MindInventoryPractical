import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import TaskData from './TaskData';
import EditTask from './EditTask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
          <ToastContainer />

      <Routes>
       <Route path='/' element={<TaskData/>}/>
       <Route path='/edit-task' element={<EditTask/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
