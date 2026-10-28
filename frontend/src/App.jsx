import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UpdateModal from './components/UpdateModal'
import { TodoProvider } from './context/TodoContext'

const App = () => {

  return (
    <>
      <TodoProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/update/:id' element={<UpdateModal />} />
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </>
  )
}

export default App