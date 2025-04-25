import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import facultySlice  from './components/redux/Reducers.jsx'

export const store = configureStore({
  reducer: {
      faculty: facultySlice
  },
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
