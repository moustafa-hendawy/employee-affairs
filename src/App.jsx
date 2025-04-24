import React from "react";
import Employees from './components/Employees';
import { Route, Routes } from "react-router-dom";
import Faculty from "./components/faculty/Faculty";
import Update from "./components/faculty/Update";

function App() {
  
  return (
  <Routes>
    <Route path="/employee" element={<Employees />}/>
    <Route path="/faculty" element={<Faculty />}/>
    <Route path="/faculty/update/:id" element={<Update />}/>
  </Routes>
    

    
  )
}

export default App
