
import './sectors/Sectors.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchDepartment, fetchGeneralAd, fetchSubAd } from '../services/EmployeeService';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchSectorData } from './redux/SectorReducers';
import { Dropdown } from 'primereact/dropdown';

function Department() {
const [department, setDepartmet] = useState([]);
  const [subAd, setSubAd] = useState([]);
  const [generalAd, setGeneralAd] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSectorId, setSelectedSectorId] = useState('');
  const [selectedGeneralId, setSelectedGeneralId] = useState('');
  const [selectedSubAdId, setSelectedSubAdId] = useState('');
  const [showDropDown, setShowDropDown] = useState(false)
const navigate = useNavigate(); 
const {subAdId} = useParams();
const dispatch = useDispatch();
  // useEffect(() => {
  //   fetchDepartment(subAdId).then((data) => setDepartmet(data))
  // }, []);

    // جلب بيانات القطاعات
    useEffect(() => {
      dispatch(fetchSectorData())
        .unwrap()
        .then((data) => setSectors(data));
    }, []);
  
    // عند اختيار قطاع: جلب الادارات العامة
    useEffect(() => {
      if (selectedSectorId) {
        setGeneralAd([]); // تفريغ القائمة قبل التحديث
        setSelectedGeneralId(''); // إلغاء تحديد الإدارة العامة السابقة
       dispatch( fetchGeneralAd(selectedSectorId)).then((data) => setGeneralAd(data));
        setSubAd([]); // مسح الإدارات الفرعية
      }
    }, [selectedSectorId]);
  
    // عند اختيار إدارة عامة: جلب الإدارات الفرعية
    useEffect(() => {
      if (selectedGeneralId) {
        fetchSubAd(selectedGeneralId).then((data) => setSubAd(data));
      }
    }, [selectedGeneralId]);

    // عند اختيار إدارة فرعية: جلب الاقسام
    useEffect(() => {
      if (selectedSubAdId) {
        fetchDepartment(selectedSubAdId).then((data) => setDepartmet(data));
      }
    }, [selectedSubAdId]);

  
   useEffect(() => {
     if (subAdId && subAdId !== 'all') {
       fetchDepartment(subAdId).then((data) => setDepartmet(data));
     } else {
       setDepartmet([]); // لو all خليه فاضي مبدئياً
       setShowDropDown(true)
     }       
   }, [subAdId]);





  return (
 <div className='faculty-container'>
              <h2 className='title'>الأقـــــســــــام</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='/img/mingcute_add-fill.png' alt='add' />
      </button>

                 {showDropDown &&
           <div className="selects" style={{ display: 'flex', gap: '100px' }}>
             <div className="sector-select card flex justify-content-center">
                     <Dropdown value={sectors.find((s) => s.id === selectedSectorId)}  onChange={(e) => setSelectedSectorId(+e.value.id)} options={sectors} optionLabel="name" 
                         placeholder=" اختر القطاع " className="w-full md:w-14rem sector-option" />
                 </div>
                 
         
             <div className="general-select card flex justify-content-center" style={{width: '200px', height: '50px', position: 'absolute', right: '216px'}}>
                     <Dropdown value={generalAd.find((g) => g.id === selectedGeneralId)}  onChange={(e) => setSelectedGeneralId(+e.value.id)} options={generalAd} optionLabel="name" 
                         placeholder=" اختر الادارة العامة " className="w-full md:w-14rem general-option" />
                 </div>

             <div className="sub-select card flex justify-content-center" style={{width: '200px', height: '50px', position: 'absolute', right: '432px'}}>
                     <Dropdown value={subAd.find((g) => g.id === selectedSubAdId)}  onChange={(e) => setSelectedSubAdId(+e.value.id)} options={subAd} optionLabel="name" 
                         placeholder=" اختر الادارة الفرعية " className="w-full md:w-14rem general-option" />
                 </div>
         
                   </div>}

 {subAdId === 'all' && !selectedSectorId && !selectedGeneralId && !selectedSubAdId ? (
          <p className="select-message">
            من فضلك اختر القطاع والإدارة العامة والادارة الفرعية أولا
          </p>
        ) : Array.isArray(department) && department.length > 0 ? (

      <table>
        <thead>
          <tr>
            <th>   القسم</th>
            <th>كود القسم </th>
            <th>حالة القسم</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {department.map((i, index) => (
            <tr key={index} style={{cursor: 'pointer'}}>
              <td>{i.name}</td>
              <td>{i.code}</td>
              <td>{i.status}</td>
              <td className='center-actions'>
                <img
                onClick={(e) => e.stopPropagation}
                  src="/img/ic_sharp-edit.png"
                  alt="edit"
                  className="icon-action"
                />
                <img
                  onClick={(e) => e.stopPropagation}
                  src="/img/ic_outline-delete.png"
                  alt="delete"
                  className="icon-action"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        ) : (
          <p className="select-message">
            لا توجد بيانات للاقسام لهذا الاختيار.
          </p>
        )}
     </div>
        </div>
  );
}

export default Department;