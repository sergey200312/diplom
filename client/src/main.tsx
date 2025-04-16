
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.tsx'
import { createStore } from '../store/createStore.ts'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')!).render(

  <Provider store={createStore}>
    <App />
  </Provider>
)
