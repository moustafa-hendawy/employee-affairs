
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import './MainPage.css';
// import SettingsIcon from '@mui/icons-material/Settings';


// function MainPage() {
//   const [showSetup, setShowSetup] = useState(false);

// const handleToggle = () => {
//   setShowSetup(!showSetup);
// }

//   return (
//    <div className='mainPage'>
//     <h1 className="d-flex align-items-center justify-content-center gap-2" style={{backgroundColor: '#f0f4f8', height: '70px'}}>برنامج العاملين بالكادر العام</h1>
//           <div className="linksNav d-flex align-items-center justify-content-center gap-2" style={{borderRadius: '5px'}}>
//                 <button type="button" className="btn btn-danger">إدخال الرقم القومي</button>
//                 <button type="button" className="btn btn-primary">نبذة عن البرنامج</button>
//                 <button type="button" className="btn btn-secondary">التقارير</button>
//                 <button type="button" className="btn btn-success">قواعد التكويد</button>
//                 <button onClick={handleToggle} type="button" className="btn btn-warning">تهيئة البرنامج</button>
//                 <button type="button" className="btn btn-info">بيانات العاملين</button>
//                 <button type="button" className="btn btn-light">البحث بالإســم</button>
//           </div>
//           {showSetup && (
//      <div className='prgram-setup'>
//         <div className="setup-section mt-4 text-center d-flex justify-content-center gap-2">
//           <span className='' style={{color: '#0067ff', marginTop: '10px'}}><SettingsIcon /></span>
//           <h2> تهيئة البرنامج</h2>
//         </div>

// <div className="buttons row mt-4" style={{maxWidth: '1000px', position: 'absolute',right: '450px'}}>

// <div className="col d-flex felx-direction-column flex-column gap-2"style={{minWidth: '100px'}} >
// <Link to='/faculty' type="button" className="btn btn-primary">الجهات التابع لها الموظف</Link>
// <button type="button" className="btn btn-primary">القطاعات</button>
// <button type="button" className="btn btn-primary">الادارات العامة</button>
// <button type="button" className="btn btn-primary">الادارات الفرعية</button>
// <button type="button" className="btn btn-primary">الاقسام</button>

// </div>

// <div className="col d-flex flex-column gap-2">
// <Link to='/job-groups' type="button" className="btn btn-primary">المجموعات الوظيفية</Link>
// <Link to='/jobs' type="button" className="btn btn-primary">المجموعات النوعية</Link>
// <button type="button" className="btn btn-primary">المسميات الوظيفية</button>
// <button type="button" className="btn btn-primary">حالات عدم الوجود في العمل</button>
// <button type="button" className="btn btn-primary">المسؤولون بالجهة</button>
// </div>

// <div className="col d-flex flex-column gap-2">
// <button type="button" className="btn btn-primary">المستوى العلمي</button>
// <button type="button" className="btn btn-primary">المؤهل الدراسي</button>
// <button type="button" className="btn btn-primary">الموقف من التجنيد</button>
// <button type="button" className="btn btn-primary">الاجازات</button>
// </div>







// </div>
     
//      </div>
//       )}
    

//    </div>
//   )
// }

// export default MainPage


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import './MainPage.css';


function MainPage() {
  const [showSetup, setShowSetup] = useState(false);

  const handleToggle = () => {
    setShowSetup(!showSetup);
  };

  return (
    <div className="mainPage bg-light min-vh-100 p-4">
      {/* العنوان */}
      <div className="bg-white p-3 text-center rounded shadow mb-4">
        <h1 className="text-primary fw-bold"style={{ fontSize: '2.5rem' }}>برنامج العاملين بالكادر العام</h1>
      </div>

      {/* روابط القائمة العلوية */}
      <div className="highList d-flex flex-wrap justify-content-center gap-2 mb-4" >
        <button className="btn btn-danger headerButton">إدخال الرقم القومي</button>
        <button className="btn btn-primary headerButton">نبذة عن البرنامج</button>
        <button className="btn btn-primary headerButton"style={{minWidth: '150px'}}>التقارير</button>
        <button className="btn btn-primary headerButton">قواعد التكويد</button>
        <button onClick={handleToggle} className="btn btn-warning headerButton">تهيئة البرنامج</button>
        <button className="btn btn-primary headerButton">بيانات العاملين</button>
        <button className="btn btn-primary headerButton">البحث بالإســم</button>
      </div>

      {/* تهيئة البرنامج */}
      {showSetup && (
        <div className="program-setup">
          <div className="text-center d-flex justify-content-center align-items-center gap-2 mb-3">
            <SettingsIcon style={{ color: '#0d6efd' }} />
            <h3 className="fw-bold">تهيئة البرنامج</h3>
          </div>

          <div className="container">
            <div className="row g-3">
              {/* العمود الأول */}
              <div className="col-md-4 col-sm-6">
                <div className="d-flex flex-column gap-2">
                  <Link to='/faculty' className="btn btn-outline-primary">الجهات التابع لها الموظف</Link>
                  <Link to='/sectors' className="btn btn-outline-primary">القطاعات</Link>
                  <Link to='/generalAd' className="btn btn-outline-primary">الادارات العامة</Link>
                  <Link to='subAd' className="btn btn-outline-primary">الادارات الفرعية</Link>
                  <Link to='/department' className="btn btn-outline-primary">الاقسام</Link>
                </div>
              </div>

              {/* العمود الثاني */}
              <div className="col-md-4 col-sm-6">
                <div className="d-flex flex-column gap-2">
                  <Link to='/job-groups' className="btn btn-outline-primary">المجموعات الوظيفية</Link>
                  <Link to='/jobs' className="btn btn-outline-primary">المجموعات النوعية</Link>
                  <Link to='/job-names' className="btn btn-outline-primary">المسميات الوظيفية</Link>
                  <Link to='non-existance-type' className="btn btn-outline-primary">حالات عدم الوجود في العمل</Link>
                  <button className="btn btn-outline-primary">المسؤولون بالجهة</button>
                </div>
              </div>

              {/* العمود الثالث */}
              <div className="col-md-4 col-sm-6">
                <div className="d-flex flex-column gap-2">
                  <Link to='/educational-level' className="btn btn-outline-primary">المستوى العلمي</Link>
                  <Link to='qualification' className="btn btn-outline-primary">المؤهل الدراسي</Link>
                  <Link to='/military-state-type' className="btn btn-outline-primary">الموقف من التجنيد</Link>
                  <Link to='/vacation' className="btn btn-outline-primary">الاجازات</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;

