
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MainPage.css';
import SettingsIcon from '@mui/icons-material/Settings';


function MainPage() {
  const [showSetup, setShowSetup] = useState(false);

const handleToggle = () => {
  setShowSetup(!showSetup);
}

  return (
   <div className='mainPage'>
    <h1 className="d-flex align-items-center justify-content-center gap-2" style={{backgroundColor: 'cyan', height: '70px'}}>برنامج العاملين بالكادر العام</h1>
          <div className="linksNav d-flex align-items-center justify-content-center gap-2" style={{borderRadius: '5px'}}>
                <button type="button" className="btn btn-danger">إدخال الرقم القومي</button>
                <button type="button" className="btn btn-primary">نبذة عن البرنامج</button>
                <button type="button" className="btn btn-secondary">التقارير</button>
                <button type="button" className="btn btn-success">قواعد التكويد</button>
                <button onClick={handleToggle} type="button" className="btn btn-warning">تهيئة البرنامج</button>
                <button type="button" className="btn btn-info">بيانات العاملين</button>
                <button type="button" className="btn btn-light">البحث بالإســم</button>
          </div>
          {showSetup && (
     <div className='prgram-setup'>
        <div className="setup-section mt-4 text-center d-flex justify-content-center gap-2">
          <span className='' style={{color: '#0067ff', marginTop: '10px'}}><SettingsIcon /></span>
          <h2> تهيئة البرنامج</h2>
        </div>

<div className="buttons row mt-4" style={{maxWidth: '1000px', position: 'absolute',right: '450px'}}>

<div className="col d-flex felx-direction-column flex-column gap-2" >
<Link to='/faculty' type="button" className="btn btn-primary">الجهات التابع لها الموظف</Link>
<button type="button" className="btn btn-primary">القطاعات</button>
<button type="button" className="btn btn-primary">الادارات العامة</button>
<button type="button" className="btn btn-primary">الادارات الفرعية</button>
<button type="button" className="btn btn-primary">الاقسام</button>

</div>

<div className="col d-flex flex-column gap-2">
<button type="button" className="btn btn-primary">المجموعات الوظيفية</button>
<button type="button" className="btn btn-primary">المجموعات النوعية</button>
<button type="button" className="btn btn-primary">المسميات الوظيفية</button>
<button type="button" className="btn btn-primary">حالات عدم الوجود في العمل</button>
<button type="button" className="btn btn-primary">المسؤولون بالجهة</button>
</div>

<div className="col d-flex flex-column gap-2">
<button type="button" className="btn btn-primary">المستوى العلمي</button>
<button type="button" className="btn btn-primary">المؤهل الدراسي</button>
<button type="button" className="btn btn-primary">الموقف من التجنيد</button>
<button type="button" className="btn btn-primary">الاجازات</button>
</div>







</div>
     
     </div>
      )}
    

   </div>
  )
}

export default MainPage
