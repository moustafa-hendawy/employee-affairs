
import React, { useState } from 'react'
import './HeaderSecondRow.css'

function HeaderSecondRow() {
    const [showSetupMenu, setShowSetupMenu] = useState(false);

  const toggleSetupMenu = () => {
    setShowSetupMenu(!showSetupMenu);
    setShowEmployeeMenu(false);
  };

  return (
    <div className="second-row">
        <div className="content">
          <a href="#" className="logo-link">
            <img src="img/logo 1.png" alt="logo" />
          </a>

        <div className="menu-item" onClick={toggleSetupMenu}>
          <span>تهيئة البرنامج</span>
          <img src="/img/Iconly.png" alt="dropdown" />

          {showSetupMenu && (
            <div className="dropdown-menu-container">
              <a className='dropdown-item' href="/faculty">الجهات التابعة لكل موظف</a>
              <div className='link-and-select'>
                <a className='dropdown-item' href="#"> الهيكل التنظيمي</a>
                <img src="img\Iconly.png" alt=""/>
              </div>
              <div className="link-and-select">
                <a className='dropdown-item' href="#"> هيكل الوظائف</a>
                   <img src="img\Iconly.png" alt=""/>
              </div>
              <a className='dropdown-item' href="/non-existance-type">حالات عدم الوجود في العمل </a>
              <a className='dropdown-item' href="/military-state-type"> الموقف من التجنيد</a>
             <div className="link-and-select">
               <a className='dropdown-item' href="#"> المؤهلات الدراسية</a>
                <img src="img\Iconly.png" alt=""/>
             </div>
               <a className='dropdown-item' href="/vacation-type">الاجازات </a>
            </div>  
          )}
        </div>


          {/* <select className="menu-item"  style={{border: 'none'}}
          // onChange={(e) => setSelectedGroup(jobGroups.find((x) => x.id == e.target.value ))}
          // value={selectedGroup ? selectedGroup.id : ''}
          name=""
          id=""
        >
          <option value="" disabled >اختر </option>
            <option style={{cursor: 'pointer'}}>بيانات الوظائف </option>
            <option style={{cursor: 'pointer'}}>الدرجات المالية  </option>
            <option style={{cursor: 'pointer'}}> الإدارات </option>
            <option style={{cursor: 'pointer'}}>الوحدات التنظيمية  </option>
            <option style={{cursor: 'pointer'}}> الوظائف العامة </option>
            <option style={{cursor: 'pointer'}}>مجموعات الوظائف  </option>
  
        </select> */}

          <div className="menu-item">
            <span>بيانات الموظفين</span>
            <img src="img/Iconly.png" alt="dropdown" />
          </div>

          <div className="menu-item">
            <span>التقارير</span>
            <img src="img/Iconly.png" alt="dropdown" />
          </div>

          <div className="menu-item">
            <span>البحث</span>
            <img src="img/Iconly.png" alt="dropdown" />
          </div>

          <div className="menu-item">
            <span>حول البرنامج</span>
            <img src="img/Iconly.png" alt="dropdown" />
          </div>

        </div>
      </div>
    // </div>
  );
}

export default HeaderSecondRow;
