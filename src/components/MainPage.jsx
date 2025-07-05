
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import SettingsIcon from '@mui/icons-material/Settings';
import './MainPage.css';
import Header from './Header/Header';


function MainPage() {
  // const [showSetup, setShowSetup] = useState(false);

  // const handleToggle = () => {
  //   setShowSetup(!showSetup);
  // };

  return (
    // <div className="mainPage bg-light min-vh-100 p-4">
    //   <div className="bg-white p-3 text-center rounded shadow mb-4">
    //     <h1 className="text-primary fw-bold"style={{ fontSize: '2.5rem' }}>برنامج العاملين بالكادر العام</h1>
    //   </div>

   
    //   <div className="highList d-flex flex-wrap justify-content-center gap-2 mb-4" >
    //     <button className="btn btn-danger headerButton">إدخال الرقم القومي</button>
    //     <button className="btn btn-primary headerButton">نبذة عن البرنامج</button>
    //     <button className="btn btn-primary headerButton"style={{minWidth: '150px'}}>التقارير</button>
    //     <button className="btn btn-primary headerButton">قواعد التكويد</button>
    //     <button onClick={handleToggle} className="btn btn-warning headerButton">تهيئة البرنامج</button>
    //     <button className="btn btn-primary headerButton">بيانات العاملين</button>
    //     <button className="btn btn-primary headerButton">البحث بالإســم</button>
    //   </div>

     
    //   {showSetup && (
    //     <div className="program-setup">
    //       <div className="text-center d-flex justify-content-center align-items-center gap-2 mb-3">
    //         <SettingsIcon style={{ color: '#0d6efd' }} />
    //         <h3 className="fw-bold">تهيئة البرنامج</h3>
    //       </div>

    //       <div className="container">
    //         <div className="row g-3">
        
    //           <div className="col-md-4 col-sm-6">
    //             <div className="d-flex flex-column gap-2">
    //               <Link to='/faculty' className="btn btn-outline-primary">الجهات التابع لها الموظف</Link>
    //               <Link to='/sectors' className="btn btn-outline-primary">القطاعات</Link>
    //               <Link to='/generalAd' className="btn btn-outline-primary">الادارات العامة</Link>
    //               <Link to='subAd' className="btn btn-outline-primary">الادارات الفرعية</Link>
    //               <Link to='/department' className="btn btn-outline-primary">الاقسام</Link>
    //             </div>
    //           </div>

           
    //           <div className="col-md-4 col-sm-6">
    //             <div className="d-flex flex-column gap-2">
    //               <Link to='/job-groups' className="btn btn-outline-primary">المجموعات الوظيفية</Link>
    //               <Link to='/job-subGroups' className="btn btn-outline-primary">المجموعات النوعية</Link>
    //               <Link to='/job-names' className="btn btn-outline-primary">المسميات الوظيفية</Link>
    //               <Link to='/non-existance-type' className="btn btn-outline-primary">حالات عدم الوجود في العمل</Link>
    //               <Link to='/official-in-region' className="btn btn-outline-primary">المسؤولون بالجهة</Link>
    //             </div>
    //           </div>

           
    //           <div className="col-md-4 col-sm-6">
    //             <div className="d-flex flex-column gap-2">
    //               <Link to='/educational-level' className="btn btn-outline-primary">المستوى العلمي</Link>
    //               <Link to='qualification' className="btn btn-outline-primary">المؤهل الدراسي</Link>
    //               <Link to='/military-state-type' className="btn btn-outline-primary">الموقف من التجنيد</Link>
    //               <Link to='/vacation-type' className="btn btn-outline-primary">الاجازات</Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="main-page">
        <Header />
    </div>
  );
}

export default MainPage;

