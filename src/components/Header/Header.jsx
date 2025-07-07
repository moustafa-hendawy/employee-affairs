
import React from 'react';
import './Header.css';
import HeaderSecondRow from './HeaderSecondRow';
import HeaderFirstRow from './HeaderFirstRow';

function Header() {
  return (
    <div className="all-container">
        <HeaderFirstRow />
      <HeaderSecondRow />
    </div>
  );
}

export default Header;
