import React from "react";
import "./App.css";
import Employees from "./components/Employees";
import { Route, Routes } from "react-router-dom";
import Faculty from "./components/faculty/Faculty";
// import Update from "./components/faculty/Update";\
import MainPage from "./components/MainPage";
import JobGroups from "./components/JobGroups";
// import JobSubGroups from './components/JobSubGroups';
// import JobGroups from "./JobGroups";
import JobSubGroups from "./components/JobSubGroups";
import JobNames from "./components/JobNames";
import Department from "./components/Department";
import GeneralAd from "./components/GeneralAd";
import SubAd from "./components/SubAd";
import NonExistanceType from "./components/NonExistanceType";
import OfficialInTheRegion from "./components/OfficialInTheRegion";
import Vacation from "./components/Vacation";
import Qualification from "./components/Qualification";
import MilitaryStateType from "./components/MilitaryStateType";
import "bootstrap/dist/css/bootstrap.min.css";
import VacationType from "./components/VacationType";
import DetailsOfEmployees from "./components/InformationOfEmployees/DetailsOfEmployees";
import AddEmployee from "./components/InformationOfEmployees/AddEmployee";
import DetailsOfEmployee from "./components/InformationOfEmployees/DetailsOfEmployees/Details/DetailsOfEmployee";
import Header from "./components/Header/Header";
import Sectors from './components/sectors/Sectors'


function App() {
  return (
// {/* <div>
//     <MainPage />
// <Routes>
//     {/* <Route path="/" element={<MainPage />} /> */}
//     <Route path="/employee" element={<Employees />}/>
//     <Route path="/faculty" element={<Faculty />}/>
//     {/* <Route path="/faculty/update/:id" element={<Update />}/> */}
//     <Route path="/job-groups" element={<JobGroups />}/>
//     <Route path="/job-subGroups/group-id/:id/group-code/:groupCode" element={<JobSubGroups />}/>
//     <Route path="/job-names/subGroupID/:id" element={<JobNames />}/>
//     <Route path="/sectors" element={<Sectors />}/>
//     <Route path="/generalAd/sector-id/:id" element={<GeneralAd />}/>
//     <Route path="/subAd/generalAd-id/:id" element={<SubAd />}/>
//     <Route path="/department/subAd-id/:id" element={<Department />}/>
//     <Route path="/non-existance-type" element={<NonExistanceType />}/>
//     <Route path="/official-in-region" element={<OfficialInTheRegion />}/>
//     {/* <Route path="/vacation" element={<Vacation />}/> */}
//     <Route path="/military-state-type" element={<MilitaryStateType />}/>
//     <Route path="/qualification" element={<Qualification />}/>
//     <Route path="/vacation-type" element={<VacationType />}/>
//   </Routes>
// </div>
    

    
//   ) */}
    <div>
      <MainPage />
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/employee" element={<Employees />} />
        <Route path="/faculty" element={<Faculty />} />
        {/* <Route path="/faculty/update/:id" element={<Update />}/> */}
        <Route path="/job-groups" element={<JobGroups />} />
        <Route path="/job-subGroups" element={<JobSubGroups />} />
        <Route path="/job-names" element={<JobNames />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/department" element={<Department />} />
        <Route path="/generalAd" element={<GeneralAd />} />
        <Route path="/subAd" element={<SubAd />} />
        <Route path="/non-existance-type" element={<NonExistanceType />} />
        <Route path="/official-in-region" element={<OfficialInTheRegion />} />
        {/* <Route path="/vacation" element={<Vacation />}/> */}
        <Route path="/military-state-type" element={<MilitaryStateType />} />
        <Route path="/qualification" element={<Qualification />} />
        <Route path="/vacation-type" element={<VacationType />} />
        <Route path="/details-of-employees" element={<DetailsOfEmployees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/details/:nationalId" element={<DetailsOfEmployee />} />
        {/* <Route path="/military-state" element={<MilitaryState />} /> */}
      </Routes>
    </div>
  );
}

export default App;
