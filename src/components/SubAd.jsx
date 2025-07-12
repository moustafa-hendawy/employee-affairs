import './SubAd.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchGeneralAd, fetchSubAd } from '../services/EmployeeService';
import { useDispatch } from 'react-redux';
import { fetchSectorData } from './redux/SectorReducers';
import { Dropdown } from 'primereact/dropdown';
// import { Dropdown } from 'bootstrap';
// import { Dropdown } from 'react-bootstrap';

function SubAd() {
  const [subAd, setSubAd] = useState([]);
  const [generalAd, setGeneralAd] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSectorId, setSelectedSectorId] = useState('');
  const [selectedGeneralId, setSelectedGeneralId] = useState('');
  const [showDropDown, setShowDropDown] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {generalAdId} = useParams();
// console.log(subAdId)

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
      fetchGeneralAd(selectedSectorId).then((data) => setGeneralAd(data));
      setSubAd([]); // مسح الإدارات الفرعية
    }
  }, [selectedSectorId]);

  // عند اختيار إدارة عامة: جلب الإدارات الفرعية
  useEffect(() => {
    if (selectedGeneralId) {
      fetchSubAd(selectedGeneralId).then((data) => setSubAd(data));
    }
  }, [selectedGeneralId]);

useEffect(() => {
  fetchSubAd().then((data) => setSubAd(data))
},[])


 useEffect(() => {
   if (generalAdId && generalAdId !== 'all') {
     fetchSubAd(generalAdId).then((data) => setSubAd(data));
   } else {
     setSubAd([]); // لو all خليه فاضي مبدئياً
     setShowDropDown(true)
   }       
 }, [generalAdId]);
 

  return (
    <div className="faculty-container">
      <h2 className="title">الادارة الفرعية</h2>
      <div className="button-and-table">
        <div className="add-and-select">
          <button className="add-btn">
            <img src="/img/mingcute_add-fill.png" alt="add" />
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

          </div>}
        </div>

        {/* عرض الجدول */}
        {generalAdId === 'all' && !selectedSectorId && !selectedGeneralId ? (
          <p className="select-message">
            من فضلك اختر القطاع والإدارة العامة أولا
          </p>
        ) : Array.isArray(subAd) && subAd.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>اسم الادارة الفرعية</th>
                <th>كود الادارة الفرعية</th>
                <th>مستوى ادارة فرعية؟</th>
                <th>كائن خاص</th>
                <th>حالة الادارة الفرعية</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {subAd.map((item, index) => (
                <tr key={index} onClick={() => navigate(`/sectors/generalAd/subAd/${item.id}/department`)} style={{cursor: 'pointer'}}>
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  <td style={{ color: item.level ? 'green' : 'red' }}>
                    {item.level ? '✔' : '✖'}
                  </td>
                  <td style={{ color: item.specialLevel ? 'green' : 'red' }}>
                    {item.specialLevel ? '✔' : '✖'}
                  </td>
                  <td>{item.status}</td>
                  <td className="edit-and-delete">
                    <img
                      src="/img/ic_sharp-edit.png"
                      alt="edit"
                      className="icon-action"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <img
                      src="/img/ic_outline-delete.png"
                      alt="delete"
                      className="icon-action"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="select-message">
            لا توجد بيانات للإدارة الفرعية لهذا الاختيار.
          </p>
        )}
      </div>
    </div>
  );
}

export default SubAd;
