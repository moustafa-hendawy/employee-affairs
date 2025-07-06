import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import './MainPage.css';

function MainPage() {
  const [showSetup, setShowSetup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setShowSetup(!showSetup);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mainPage bg-light min-vh-100 p-4">
      <div className="bg-white p-3 text-center rounded shadow mb-4">
        <h1 className="text-primary fw-bold" style={{ fontSize: '2.5rem' }}>
          برنامج العاملين بالكادر العام
        </h1>
      </div>

      {/* روابط القائمة العلوية */}
      <div className="highList d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button className="btn btn-danger headerButton">إدخال الرقم القومي</button>
        <button className="btn btn-primary headerButton">نبذة عن البرنامج</button>
        <button className="btn btn-primary headerButton" style={{ minWidth: '150px' }}>
          التقارير
        </button>
        <button className="btn btn-primary headerButton">قواعد التكويد</button>
        <button onClick={handleToggle} className="btn btn-warning headerButton">
          تهيئة البرنامج
        </button>

        {/* القائمة المنسدلة */}
        <div className="relative inline-block text-right" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[#0d6efd] text-white text-base font-medium px-4 py-2 rounded shadow"
          >
            بيانات العاملين
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow z-50 text-right">
              <li>
                <Link
                  to="/detailofEmployees"
                  className="d-block px-3 py-2 text-dark text-sm hover-bg-light text-decoration-none"
                >
                  عرض بيانات العاملين
                </Link>
              </li>
              <li>
                <Link
                  to="/addEmployee"
                  className="d-block px-3 py-2 text-dark text-sm hover-bg-light text-decoration-none"
                >
                  إضافة موظف جديد
                </Link>
              </li>
            </ul>
          )}
        </div>

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
                  <Link to="/faculty" className="btn btn-outline-primary">الجهات التابع لها الموظف</Link>
                  <Link to="/sectors" className="btn btn-outline-primary">القطاعات</Link>
                  <Link to="/generalAd" className="btn btn-outline-primary">الادارات العامة</Link>
                  <Link to="/subAd" className="btn btn-outline-primary">الادارات الفرعية</Link>
                  <Link to="/department" className="btn btn-outline-primary">الاقسام</Link>
                </div>
              </div>

              {/* العمود الثاني */}
              <div className="col-md-4 col-sm-6">
                <div className="d-flex flex-column gap-2">
                  <Link to="/job-groups" className="btn btn-outline-primary">المجموعات الوظيفية</Link>
                  <Link to="/job-subGroups" className="btn btn-outline-primary">المجموعات النوعية</Link>
                  <Link to="/job-names" className="btn btn-outline-primary">المسميات الوظيفية</Link>
                  <Link to="/non-existance-type" className="btn btn-outline-primary">حالات عدم الوجود في العمل</Link>
                  <button className="btn btn-outline-primary">المسؤولون بالجهة</button>
                </div>
              </div>

              {/* العمود الثالث */}
              <div className="col-md-4 col-sm-6">
                <div className="d-flex flex-column gap-2">
                  <Link to="/educational-level" className="btn btn-outline-primary">المستوى العلمي</Link>
                  <Link to="/qualification" className="btn btn-outline-primary">المؤهل الدراسي</Link>
                  <Link to="/military-state-type" className="btn btn-outline-primary">الموقف من التجنيد</Link>
                  <Link to="/vacation-type" className="btn btn-outline-primary">الاجازات</Link>
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
