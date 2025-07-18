import React from "react";
import "./App.css";
// import Employees from "./components/Employees";
import { Route, Routes } from "react-router-dom";
import Faculty from "./components/faculty/Faculty";
// import Update from "./components/faculty/Update";\
import MainPage from "./components/MainPage";
import JobGroups from "./components/JobGroups";
// import JobSubGroups from './components/JobSubGroups';
// import JobGroups from "./JobGroups";
import JobSubGroups from "./components/JobSubGroups";
import JobNames from "./components/JobNames";
import Department from "./components/department/Department";
import GeneralAd from "./components/generalAd/GeneralAd";
import SubAd from "./components/subAd/SubAd";
import NonExistanceType from "./components/NonExistanceType";
import OfficialInTheRegion from "./components/OfficialInTheRegion";
import Qualification from "./components/Qualification";
import MilitaryStateType from "./components/MilitaryStateType";
import "bootstrap/dist/css/bootstrap.min.css";
import VacationType from "./components/vacations/VacationType";
import DetailsOfEmployees from "./components/InformationOfEmployees/DetailsOfEmployees";
import AddEmployee from "./components/InformationOfEmployees/AddEmployee";
import DetailsOfEmployee from "./components/InformationOfEmployees/DetailsOfEmployees/Details/DetailsOfEmployee";
import Sectors from "./components/sectors/Sectors";
import FintialDegrees from "./components/fintialDegrees/FincialDegrees";
import EducationalLevel from "./components/EducationalLevel";
import Certificate from "./components/Certificate";
import Search from "./components/Search/index";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div>
      <MainPage />
      {/* <Route path="/" element={<SignIn />}/> */}

      <Routes>
        {/* <Route path="/employee" element={<Employees />}/> */}
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/job-groups" element={<JobGroups />} />
        <Route
          path="/job-groups/:jobGroupsId/job-sub-groups"
          element={<JobSubGroups />}
        />
        <Route
          path="/job-groups/job-sub-groups/:jobSubGroupsId/job-names"
          element={<JobNames />}
        />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/sectors/:sectorId/generalAd" element={<GeneralAd />} />
        <Route
          path="/sectors/generalAd/:generalAdId/subAd"
          element={<SubAd />}
        />
        <Route
          path="/sectors/generalAd/subAd/:subAdId/department"
          element={<Department />}
        />
        <Route path="/non-existance-type" element={<NonExistanceType />} />
        <Route path="/official-in-region" element={<OfficialInTheRegion />} />
        <Route path="/fintial-degrees" element={<FintialDegrees />} />
        <Route path="/military-state-type" element={<MilitaryStateType />} />
        <Route path="/qualification" element={<Qualification />} />
        <Route path="/vacation-type" element={<VacationType />} />
        <Route path="/educational-level" element={<EducationalLevel />} />
        <Route
          path="/educational-level/:educationalLevelId/certificate"
          element={<Certificate />}
        />
        <Route path="/details-of-employees" element={<DetailsOfEmployees />} />
        <Route path="/details-of-employee" element={<Search />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<AddEmployee />} />
        <Route path="/details/:nationalId" element={<DetailsOfEmployee />} />
      </Routes>
    </div>

    //   ) */}
    // <div>
    //   <MainPage />
    //   <Routes>
    //     {/* <Route path="/" element={<MainPage />} /> */}
    //     <Route path="/employee" element={<Employees />} />
    //     <Route path="/faculty" element={<Faculty />} />
    //     {/* <Route path="/faculty/update/:id" element={<Update />}/> */}
    //     <Route path="/job-groups" element={<JobGroups />} />
    //     <Route path="/job-subGroups" element={<JobSubGroups />} />
    //     <Route path="/job-names" element={<JobNames />} />
    //     <Route path="/sectors" element={<Sectors />} />
    //     <Route path="/department" element={<Department />} />
    //     <Route path="/generalAd" element={<GeneralAd />} />
    //     <Route path="/subAd" element={<SubAd />} />
    //     <Route path="/non-existance-type" element={<NonExistanceType />} />
    //     <Route path="/official-in-region" element={<OfficialInTheRegion />} />
    //     {/* <Route path="/vacation" element={<Vacation />}/> */}
    //     <Route path="/military-state-type" element={<MilitaryStateType />} />
    //     <Route path="/qualification" element={<Qualification />} />
    //     <Route path="/vacation-type" element={<VacationType />} />
    //     <Route path="/details-of-employees" element={<DetailsOfEmployees />} />
    //     <Route path="/add-employee" element={<AddEmployee />} />
    //     <Route path="/details/:nationalId" element={<DetailsOfEmployee />} />
    //     {/* <Route path="/military-state" element={<MilitaryState />} /> */}
    //   </Routes>
    // </div>
  );
}

export default App;
