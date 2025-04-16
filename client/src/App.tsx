
import { ToastContainer } from 'react-toastify'
import './App.css'
import { AppRoutes } from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'


function App() {


  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
