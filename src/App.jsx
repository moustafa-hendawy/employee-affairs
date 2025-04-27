import React from "react";
import Employees from './components/Employees';
import { Link, Route, Routes } from "react-router-dom";
import Faculty from "./components/faculty/Faculty";
import Update from "./components/faculty/Update";
import MainPage from "./components/MainPage";

function App() {
  
  return (
<div>

<Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/employee" element={<Employees />}/>
    <Route path="/faculty" element={<Faculty />}/>
    <Route path="/faculty/update/:id" element={<Update />}/>
  </Routes>
</div>
    

    
  )
}

export default App
