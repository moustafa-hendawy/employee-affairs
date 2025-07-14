import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import SettingsIcon from '@mui/icons-material/Settings';
import "./MainPage.css";
import Header from "./Header/Header";
import SignIn from '../components/SignIn'
function MainPage() {
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");
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
     { token ? <Header /> : <SignIn />}
    </div>
  );
}

export default MainPage;
