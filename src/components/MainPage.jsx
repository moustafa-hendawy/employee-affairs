import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import SettingsIcon from '@mui/icons-material/Settings';
import "./MainPage.css";
import Header from "./Header/Header";

function MainPage() {
  const dropdownRef = useRef(null);
  // const [showSetup, setShowSetup] = useState(false);

  // const handleToggle = () => {
  //   setShowSetup(!showSetup);
  // };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="main-page">
      <Header />
    </div>
  );
}

export default MainPage;
