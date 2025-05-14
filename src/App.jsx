import React from "react";
import './App.css'
import Employees from './components/Employees';
import { Route, Routes } from "react-router-dom";
import Faculty from "./components/faculty/Faculty";
import Update from "./components/faculty/Update";
import MainPage from "./components/MainPage";
import JobGroups from "./JobGroups";
import Jobs from './components/Jobs';
import JobNames from "./components/JobNames";
import Sectors from "./components/Sectors";
import Department from "./components/Department";
import GeneralAd from "./components/GeneralAd";
import SubAd from "./components/SubAd";
import NonExistanceType from "./components/NonExistanceType";
import EducationalLevel from "./components/EducationalLevel";
import Vacation from "./components/Vacation";
import Qualification from "./components/Qualification";
import MilitaryStateType from "./components/MilitaryStateType";

function App() {
  
  return (
<div>

<Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/employee" element={<Employees />}/>
    <Route path="/faculty" element={<Faculty />}/>
    <Route path="/faculty/update/:id" element={<Update />}/>
    <Route path="/job-groups" element={<JobGroups />}/>
    <Route path="/jobs" element={<Jobs />}/>
    <Route path="/job-names" element={<JobNames />}/>
    <Route path="/sectors" element={<Sectors />}/>
    <Route path="/department" element={<Department />}/>
    <Route path="/generalAd" element={<GeneralAd />}/>
    <Route path="/subAd" element={<SubAd />}/>
    <Route path="/non-existance-type" element={<NonExistanceType />}/>
    <Route path="/educational-level" element={<EducationalLevel />}/>
    <Route path="/vacation" element={<Vacation />}/>
    <Route path="/military-state-type" element={<MilitaryStateType />}/>
    <Route path="/qualification" element={<Qualification />}/>
  </Routes>
</div>
    

    
  )
}

export default App
