
// import React, { useState } from 'react'
// import './HeaderSecondRow.css'

// function HeaderSecondRow() {
//     const [showSetupMenu, setShowSetupMenu] = useState(false);

//   const toggleSetupMenu = () => {
//     setShowSetupMenu(!showSetupMenu);
//     // setShowEmployeeMenu(false);
//   };

//   return (
//     <div className="second-row">
//         <div className="content">
//           <a href="#" className="logo-link">
//             <img src="/img/logo 1.png" alt="logo" />
//           </a>

//         <div className="menu-item" onClick={toggleSetupMenu}>
//           <span>تهيئة البرنامج</span>
//           <img src="/img/Iconly.png" alt="dropdown" />

//           {showSetupMenu && (
//             <div className="dropdown-menu-container">
//               <a className='dropdown-item' href="/faculty">الجهات التابعة لكل موظف</a>
//               <div className='link-and-select'>
//                 <a className='dropdown-item' href="#"> الهيكل التنظيمي</a>
//                 <img src="/img/Iconly.png" alt=""/>
//               </div>
//               <div className="link-and-select">
//                 <a className='dropdown-item' href="#"> هيكل الوظائف</a>
//                    <img src="/img/Iconly.png" alt=""/>
//               </div>
//               <a className='dropdown-item' href="/non-existance-type">حالات عدم الوجود في العمل </a>
//               <a className='dropdown-item' href="/military-state-type"> الموقف من التجنيد</a>
//              <div className="link-and-select">
//                <a className='dropdown-item' href="#"> المؤهلات الدراسية</a>
//                 <img src="/img/Iconly.png" alt=""/>
//              </div>
//                <a className='dropdown-item' href="/vacation-type">الاجازات </a>
//             </div>  
//           )}
//         </div>


//           {/* <select className="menu-item"  style={{border: 'none'}}
//           // onChange={(e) => setSelectedGroup(jobGroups.find((x) => x.id == e.target.value ))}
//           // value={selectedGroup ? selectedGroup.id : ''}
//           name=""
//           id=""
//         >
//           <option value="" disabled >اختر </option>
//             <option style={{cursor: 'pointer'}}>بيانات الوظائف </option>
//             <option style={{cursor: 'pointer'}}>الدرجات المالية  </option>
//             <option style={{cursor: 'pointer'}}> الإدارات </option>
//             <option style={{cursor: 'pointer'}}>الوحدات التنظيمية  </option>
//             <option style={{cursor: 'pointer'}}> الوظائف العامة </option>
//             <option style={{cursor: 'pointer'}}>مجموعات الوظائف  </option>
  
//         </select> */}

//           <div className="menu-item">
//             <span>بيانات الموظفين</span>
//             <img src="/img/Iconly.png" alt="dropdown" />
//           </div>

//           <div className="menu-item">
//             <span>التقارير</span>
//             <img src="/img/Iconly.png" alt="dropdown" />
//           </div>

//           <div className="menu-item">
//             <span>البحث</span>
//             <img src="/img/Iconly.png" alt="dropdown" />
//           </div>

//           <div className="menu-item">
//             <span>حول البرنامج</span>
//             <img src="/img/Iconly.png" alt="dropdown" />
//           </div>

//         </div>
//       </div>
//     // </div>
//   );
// }

// export default HeaderSecondRow;
import React, { useEffect, useRef, useState } from 'react';
import './HeaderSecondRow.css';
import { useNavigate, useParams } from 'react-router-dom';

function HeaderSecondRow() {
  const [showSetupMenu, setShowSetupMenu] = useState(false);
  const [showOrganizationalSubMenu, setShowOrganizationalSubMenu] = useState(false);
  const [showJobStructure, setShowJobStructure] = useState(false);
  const [showQualification, setShowQualification] = useState(false);
const {sectorId} = useParams()
  const menuRef = useRef(null);
const navigate = useNavigate();
  // const toggleSetupMenu = () => {
  //   setShowSetupMenu(!showSetupMenu);
  // };

  const [showEmployeeMenu, setShowEmployeeMenu] = useState(false);

  const setupMenuRef = useRef(null);
  const employeeMenuRef = useRef(null);

  const toggleSetupMenu = () => {
    setShowSetupMenu(!showSetupMenu);
    setShowEmployeeMenu(false);
  };

  const toggleEmployeeMenu = () => {
    setShowEmployeeMenu(!showEmployeeMenu);
    setShowSetupMenu(false);
  };

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSetupMenu(false);
        setShowOrganizationalSubMenu(false);
        setShowJobStructure(false);
        setShowQualification(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="second-row">
      <div className="content">
        <a href="#" className="logo-link">
          <img src="/img/logo 1.png" alt="logo" />
        </a>

        <div className="menu-item" onClick={toggleSetupMenu} ref={menuRef}>
          <span>تهيئة البرنامج</span>
          <img src="/img/Iconly.png" alt="dropdown" />

          {showSetupMenu && (
            <div className="dropdown-menu-container">
              <a className="dropdown-item" href="/faculty">الجهات التابعة لكل موظف</a>

              <div className="link-and-select"
                   onMouseEnter={() => setShowOrganizationalSubMenu(true)}
                   onMouseLeave={() => setShowOrganizationalSubMenu(false)}>
                <a className="dropdown-item" href="#">الهيكل التنظيمي</a>
                <img src="/img/Iconly.svg" alt="submenu" />
                {showOrganizationalSubMenu && (
                  <div className="submenu">
                    <a className="dropdown-item" href="/sectors">القطاعات</a>
                    <a className="dropdown-item" href="/sectors/all/generalAd" >الإدارة العامة</a>
                    <a className="dropdown-item" href="/sectors/generalAd/all/subAd">الإدارات الفرعية</a>
                    <a className="dropdown-item" href="/sectors/generalAd/subAd/all/department">الأقسام</a>
                  </div>
                )}
              </div>

              <div className="link-and-select"
                   onMouseEnter={() => setShowJobStructure(true)}
                   onMouseLeave={() => setShowJobStructure(false)}>
                <a className="dropdown-item" href="#">هيكل الوظائف</a>
                <img src="/img/Iconly.svg" alt="submenu" />
                {showJobStructure && (
                  <div className="submenu">
                    <a className="dropdown-item" href="/job-groups">المجموعات الوظيفية</a>
                    <a className="dropdown-item" href="/job-groups/all/job-sub-groups">المجموعات النوعية</a>
                    <a className="dropdown-item" href="/job-groups/job-sub-groups/all/job-names">المسميات الوظيفية</a>
                  </div>
                )}
              </div>
              <a className="dropdown-item" href="/fintial-degrees"> الدرجات الوظيفية </a>
              <a className="dropdown-item" href="/vacation-type">الإجازات</a>

                     <div className="link-and-select"
                   onMouseEnter={() => setShowQualification(true)}
                   onMouseLeave={() => setShowQualification(false)}>
                <a className="dropdown-item" href="#">المؤهلات الدراسية</a>
                <img src="/img/Iconly.svg" alt="submenu" />
                {showQualification && (
                  <div className="submenu">
                    <a className="dropdown-item" href="/educational-level">المؤهل العلمي</a>
                    <a className="dropdown-item" href="/educational-level/all/certificate">المؤهل الدراسي</a>
                  </div>
                )}
              </div>

              <a className="dropdown-item" href="/military-state-type">الموقف من التجنيد</a>

       

              <a className="dropdown-item" href="/non-existance-type">حالات عدم الوجود في العمل</a>

            </div>
          )}
        </div>

        {/* <div className="menu-item">
          <span>بيانات الموظفين</span>
          <img src="/img/Iconly.png" alt="dropdown" />
        </div> */}

         <div
          className="menu-item"
          onClick={toggleEmployeeMenu}
          ref={employeeMenuRef}
        >
          <span>بيانات الموظفين</span>
          <img src="/img/Iconly.png" alt="dropdown" />
          {showEmployeeMenu && (
            <div className="dropdown-menu-container h-fit w-fit">
              <a className="dropdown-item" href="/details-of-employees">
                تفاصيل الموظفين
              </a>
              <a className="dropdown-item" href="/add-employee">
                إضافة موظف
              </a>
            </div>
          )}
        </div>

        <div className="menu-item">
          <span>التقارير</span>
          <img src="/img/Iconly.png" alt="dropdown" />
        </div>

        <div className="menu-item">
          <span>البحث</span>
          <img src="/img/Iconly.png" alt="dropdown" />
        </div>

        <div className="menu-item">
          <span>حول البرنامج</span>
          <img src="/img/Iconly.png" alt="dropdown" />
        </div>
      </div>
    </div>
  );
}

export default HeaderSecondRow;
