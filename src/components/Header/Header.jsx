
// import React from 'react'
// import './Header.css'
// function Header() {
//   return (
//     <div className="head-bar">
//           <div className="first-and-second">
//             <div className="first-two-words">
//             <img src='Ellipse 1.png' />
//             <p>الهيكل التنظيمى </p>
//           </div>
//           <div className="second-two-words">
//             <img src='Ellipse 1.png' />
//             <p>ارشيف الاخبار</p>
//           </div>
//           </div>
//           <div className="third-and-fourth">
//             <div className="third">
//               <img src='ri_arrow-down-s-fill.png' />
//             <p>عربي</p>
//             <img src='emojione_flag-for-egypt@3x.png' />
//             </div>
//            <button className='fourth-btn'>الدخول</button>
//           </div>
//         </div>
//   )
// }

// export default Header

// import React from 'react';
// import './Header.css';

// function Header() {
//   return (
//   <div className="all-container">
//       <div className="header-container">
//       <div className="left-section">
//         <a href="#" className="header-link">
//           <img src="Ellipse 1.png" alt="icon" />
//           <span>الهيكل التنظيمى</span>
//         </a>
//         <a href="#" className="header-link">
//           <img src="Ellipse 1.png" alt="icon" />
//           <span>ارشيف الاخبار</span>
//         </a>
//       </div>

//       <div className="right-section">
//         <div className="language-select">
//           <img src="emojione_flag-for-egypt@3x.png" alt="flag" />
//           <span>عربي</span>
//           <img src="ri_arrow-down-s-fill.png" alt="arrow" />
//         </div>
//         <button className="login-button">الدخول</button>
//       </div>
//     </div>
//     {/* <div className="second-row">
//         <div className="content">
//             <a href="#" className="header-link">
//           <img src="img\logo 1.png" alt="icon" />
//         </a>
//        <div className="config">
//          <span>تهيئة البرنامج</span>
//         <img src="img\Iconly.png" alt="" />
//        </div>
//        <div className="data">
//          <span>بيانات الموطفين</span>
//         <img src="img\Iconly.png" alt="" />
//        </div>
//        <div className="report">
//          <span>التقارير</span>
//         <img src="img\Iconly.png" alt="" />
//        </div>
//        <div className="search">
//          <span>البحث </span>
//         <img src="img\Iconly.png" alt="" />
//        </div>
//        <div className="about">
//          <span>حول البرنامج </span>
//         <img src="img\Iconly.png" alt="" />
//        </div>
//         </div>
//     </div> */}
  
//    <div className="second-row">
//       <div className="content">
//         <a href="#" className="logo-link">
//           <img src="img/logo 1.png" alt="logo" />
//           <div className="logo-text">
//             <span className="ar-label">الموظفين</span>
//             <span className="en-label">Employees</span>
//           </div>
//         </a>

//         <div className="menu-item">
//           <span>تهيئة البرنامج</span>
//           <img src="img/Iconly.png" alt="dropdown" />
//         </div>

//         <div className="menu-item">
//           <span>بيانات الموظفين</span>
//           <img src="img/Iconly.png" alt="dropdown" />
//         </div>

//         <div className="menu-item">
//           <span>التقارير</span>
//           <img src="img/Iconly.png" alt="dropdown" />
//         </div>

//         <div className="menu-item">
//           <span>البحث</span>
//           <img src="img/Iconly.png" alt="dropdown" />
//         </div>

//         <div className="menu-item">
//           <span>حول البرنامج</span>
//           <img src="img/Iconly.png" alt="dropdown" />
//         </div>
//       </div>
//     </div>
  
//   </div>
//   );
// }

// export default Header;


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
