

import '../subAd/SubAd.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSectorData } from '../redux/SectorReducers';
import { Dropdown } from 'primereact/dropdown';
import { fetchGeneralData } from '../redux/GeneralAdReducer';
import { fetchSubAdData } from '../redux/SubAdReducer';
import { fetchDepartment } from '../../services/EmployeeService';

function Department() {
  const [department, setDepartmet] = useState([]);
  const [subAd, setSubAd] = useState([]);
  const [generalAd, setGeneralAd] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSectorId, setSelectedSectorId] = useState('');
  const [selectedGeneralId, setSelectedGeneralId] = useState('');
  const [selectedSubAdId, setSelectedSubAdId] = useState('');

  const navigate = useNavigate(); 
  const { subAdId } = useParams();
  const dispatch = useDispatch();

  // جلب بيانات القطاعات
  useEffect(() => {
    dispatch(fetchSectorData())
      .unwrap()
      .then((data) => setSectors(data));
  }, []);

  // عند اختيار قطاع: جلب الادارات العامة
  useEffect(() => {
    if (selectedSectorId) {
      setGeneralAd([]);
      setSelectedGeneralId('');
      setSubAd([]);

      dispatch(fetchGeneralData(selectedSectorId))
        .unwrap()
        .then((data) => setGeneralAd(data));
    }
  }, [selectedSectorId]);

  // عند اختيار إدارة عامة: جلب الإدارات الفرعية
  useEffect(() => {
    if (selectedGeneralId) {
      dispatch(fetchSubAdData(selectedGeneralId))
        .unwrap()
        .then((data) => setSubAd(data));
    }
  }, [selectedGeneralId]);

  // عند اختيار إدارة فرعية: جلب الأقسام
  useEffect(() => {
    if (selectedSubAdId) {
      fetchDepartment(selectedSubAdId).then((data) => setDepartmet(data));
    }
  }, [selectedSubAdId]);

  // في حال الدخول من الرابط مباشرة
  useEffect(() => {
    if (subAdId && subAdId !== 'all') {
      fetchDepartment(subAdId).then((data) => setDepartmet(data));
    } else {
      setDepartmet([]);
    }
  }, [subAdId]);

  return (
    <div className='faculty-container'>
      <h2 className='title'>الأقـــــســــــام</h2>
      <div className="button-and-table">
        <div className="add-and-select">
          <button className='add-btn'>
            <img src='/img/mingcute_add-fill.png' alt='add' />
          </button>

          <div className="selects" style={{ display: 'flex', gap: '100px' }}>
            {/* القطاع */}
            <div className="sector-select card flex justify-content-center">
              <Dropdown
                value={sectors.find((s) => s.id === selectedSectorId)}
                onChange={(e) => setSelectedSectorId(e.value.id)}
                options={sectors}
                optionLabel="name"
                placeholder="اختر القطاع"
                className="w-full md:w-14rem sector-option"
              />
            </div>

            {/* الإدارة العامة */}
            <div className="general-select card flex justify-content-center" style={{ width: '200px', height: '50px', position: 'absolute', right: '216px' }}>
              <Dropdown
                value={generalAd.find((g) => g.id === selectedGeneralId)}
                onChange={(e) => setSelectedGeneralId(e.value.id)}
                options={generalAd}
                optionLabel="name"
                placeholder="اختر الإدارة العامة"
                className="w-full md:w-14rem general-option"
              />
            </div>

            {/* الإدارة الفرعية */}
            <div className="sub-select card flex justify-content-center" style={{ width: '200px', height: '50px', position: 'absolute', right: '432px' }}>
              <Dropdown
                value={subAd.find((s) => s.id === selectedSubAdId)}
                onChange={(e) => setSelectedSubAdId(e.value.id)}
                options={subAd}
                optionLabel="name"
                placeholder="اختر الإدارة الفرعية"
                className="w-full md:w-14rem general-option"
              />
            </div>
          </div>
        </div>

        {subAdId === 'all' && !selectedSectorId && !selectedGeneralId && !selectedSubAdId ? (
          <p className="select-message">من فضلك اختر القطاع والإدارة العامة والإدارة الفرعية أولا</p>
        ) : Array.isArray(department) && department.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>كود القسم</th>
                <th>القسم</th>
                <th>حالة القسم</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {department.map((i, index) => (
                <tr key={index} style={{ cursor: 'pointer' }}>
                  <td>{i.code}</td>
                  <td>{i.name}</td>
                  <td>{i.status === 1 ? "نشط" : "غير نشط"}</td>
                  <td className='center-actions'>
                    <img
                      onClick={(e) => e.stopPropagation()}
                      src="/img/ic_sharp-edit.png"
                      alt="edit"
                      className="icon-action"
                    />
                    <img
                      onClick={(e) => e.stopPropagation()}
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
          <p className="select-message">لا توجد بيانات للأقسام لهذا الاختيار.</p>
        )}
      </div>
    </div>
  );
}

export default Department;
