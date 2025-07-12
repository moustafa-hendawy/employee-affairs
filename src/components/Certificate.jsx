
import './SubAd.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { fetchCertificate, fetchEducationalLevel, fetchGeneralAd } from '../services/EmployeeService';
import { fetchSectorData } from './redux/SectorReducers';

function Certificate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { educationalLevelId } = useParams();
console.log(educationalLevelId)
  const [education, setEducation] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [selectedEducationId, setSelectedEducationId] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

//   useEffect(() => {
//     // dispatch(fetchSectorData())
//     //   .unwrap()
//     //   .then((data) => setSectors(data));
//     fetchCertificate().then((data) => setCertificate(data))
// }, []);

  useEffect(() => {
    if (educationalLevelId && educationalLevelId !== 'all') {
      fetchCertificate(educationalLevelId).then((data) => setCertificate(data));
    } else {
      setEducation([]);
        fetchEducationalLevel().then((data) => setEducation(data))
      setShowDropDown(true);
    }
  }, [educationalLevelId]);

  useEffect(() => {
    if (selectedEducationId) {
      fetchCertificate(selectedEducationId).then((data) => setCertificate(data));
    }
  }, [selectedEducationId]);

  return (
    <div className='faculty-container'>
      <h2 className='title'>المؤهل الدراسي </h2>
      <div className='button-and-table'>
        <div className='add-and-select'>
          <button className='add-btn'>
            <img src='/img/mingcute_add-fill.png' alt='add' />
          </button>

          {showDropDown && (
            <div className="selects" style={{ display: 'flex', gap: '100px' }}>
              <div className="sector-select card flex justify-content-center">
                <Dropdown
                  value={education.find((s) => s.id === selectedEducationId)}
                  onChange={(e) => setSelectedEducationId(+e.value.id)}
                  options={education}
                  optionLabel="name"
                  placeholder=" اختر المؤهل العلمي "
                  className="w-full md:w-14rem sector-option"
                />
              </div>
            </div>
          )}
        </div>

        {educationalLevelId === 'all' && !selectedEducationId ? (
          <p className="select-message">من فضلك اختر المؤهل العلمي أولا</p>
        ) : Array.isArray(certificate) && certificate.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>كود المؤهل</th>
                <th>  اسم المؤهل</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {certificate.map((i, index) => (
                <tr key={index}>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td className='edit-and-delete'>
                    <img src="/img/ic_sharp-edit.png" alt="edit" className="icon-action" />
                    <img src="/img/ic_outline-delete.png" alt="delete" className="icon-action" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          educationalLevelId && <p className="select-message">لا توجد بيانات للإدارة العامة لهذا القطاع.</p>
        )}
      </div>
    
    </div>
  );
}

export default Certificate;
