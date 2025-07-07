import React from 'react'
import './HeaderFirstRow.css'

function HeaderFirstRow() {
  return (
    <div className="header-container">
      <div className="left-section">
          <a href="#" className="header-link">
            <img src="/img/Ellipse 1.png" alt="icon" />
            <span>الهيكل التنظيمى</span>
          </a>
          <a href="#" className="header-link">
            <img src="/img/Ellipse 1.png" alt="icon" />
            <span>ارشيف الاخبار</span>
          </a>
        </div>

        <div className="right-section">
          <div className="language-select">
            <img src="/img/emojione_flag-for-egypt@3x.png" alt="flag" />
            <span>عربي</span>
            <img src="/img/ri_arrow-down-s-fill.png" alt="arrow" />
          </div>
          <button className="login-button">الدخول</button>
        </div>
      </div>
  )
}

export default HeaderFirstRow
