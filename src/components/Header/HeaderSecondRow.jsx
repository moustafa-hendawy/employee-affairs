import React, { useState, useRef, useEffect } from "react";
import "./HeaderSecondRow.css";

function HeaderSecondRow() {
  const [showSetupMenu, setShowSetupMenu] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        setupMenuRef.current &&
        !setupMenuRef.current.contains(event.target) &&
        employeeMenuRef.current &&
        !employeeMenuRef.current.contains(event.target)
      ) {
        setShowSetupMenu(false);
        setShowEmployeeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="second-row">
      <div className="content">
        <a href="#" className="logo-link">
          <img src="img/logo 1.png" alt="logo" />
        </a>

        <div className="menu-item" onClick={toggleSetupMenu} ref={setupMenuRef}>
          <span>تهيئة البرنامج</span>
          <img src="img/Iconly.png" alt="dropdown" />
          {showSetupMenu && (
            <div className="dropdown-menu-container">
              <a className="dropdown-item" href="/faculty">
                الجهات التابعة لكل موظف
              </a>
              <div className="link-and-select">
                <a className="dropdown-item" href="#">
                  الهيكل التنظيمي
                </a>
                <img src="img/Iconly.png" alt="" />
              </div>
              <div className="link-and-select">
                <a className="dropdown-item" href="#">
                  هيكل الوظائف
                </a>
                <img src="img/Iconly.png" alt="" />
              </div>
              <a className="dropdown-item" href="/non-existance-type">
                حالات عدم الوجود في العمل
              </a>
              <a className="dropdown-item" href="/military-state-type">
                الموقف من التجنيد
              </a>
              <div className="link-and-select">
                <a className="dropdown-item" href="#">
                  المؤهلات الدراسية
                </a>
                <img src="img/Iconly.png" alt="" />
              </div>
              <a className="dropdown-item" href="/vacation-type">
                الاجازات
              </a>
            </div>
          )}
        </div>

        <div
          className="menu-item"
          onClick={toggleEmployeeMenu}
          ref={employeeMenuRef}
        >
          <span>بيانات الموظفين</span>
          <img src="img/Iconly.png" alt="dropdown" />
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
  );
}

export default HeaderSecondRow;
