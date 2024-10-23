import { BrowserRouter,Routes,Route } from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import { TaskProvider } from './Context/taskContext'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'

function App() {


  return (
    <>
  
    <BrowserRouter>
    <TaskProvider> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddTask/>}/>
        <Route path="/edit/:taskId" element={<EditTask/>}/>
      </Routes>
      </TaskProvider>
    </BrowserRouter>
    </>
  )
}

export default App
