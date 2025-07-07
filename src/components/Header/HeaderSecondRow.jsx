
import React, { useEffect, useRef, useState } from 'react';
import './HeaderSecondRow.css';

function HeaderSecondRow() {
  const [showSetupMenu, setShowSetupMenu] = useState(false);
  const [showOrganizationalSubMenu, setShowOrganizationalSubMenu] = useState(false);
  const [showJobStructure, setShowJobStructure] = useState(false);
  const [showQualification, setShowQualification] = useState(false);

  const menuRef = useRef(null);

  const toggleSetupMenu = () => {
    setShowSetupMenu(!showSetupMenu);
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
                    <a className="dropdown-item" href="/general-ad">الإدارة العامة</a>
                    <a className="dropdown-item" href="#">الإدارات الفرعية</a>
                    <a className="dropdown-item" href="#">الأقسام</a>
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
                    <a className="dropdown-item" href="job-groups">المجموعات الوظيفية</a>
                    <a className="dropdown-item" href="#">المجموعات النوعية</a>
                    <a className="dropdown-item" href="#">المسميات الوظيفية</a>
                  </div>
                )}
              </div>

              <a className="dropdown-item" href="/non-existance-type">حالات عدم الوجود في العمل</a>
              <a className="dropdown-item" href="/military-state-type">الموقف من التجنيد</a>

              <div className="link-and-select"
                   onMouseEnter={() => setShowQualification(true)}
                   onMouseLeave={() => setShowQualification(false)}>
                <a className="dropdown-item" href="#">المؤهلات الدراسية</a>
                <img src="/img/Iconly.svg" alt="submenu" />
                {showQualification && (
                  <div className="submenu">
                    <a className="dropdown-item" href="#">المؤهل العلمي</a>
                    <a className="dropdown-item" href="#">المؤهل الدراسي</a>
                  </div>
                )}
              </div>

              <a className="dropdown-item" href="/vacation-type">الإجازات</a>
            </div>
          )}
        </div>

   
        <div className="menu-item">
          <span>بيانات الموظفين</span>
          <img src="/img/Iconly.png" alt="dropdown" />
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
