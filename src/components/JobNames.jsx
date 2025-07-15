

import './subAd/SubAd.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchJobGroups, fetchJobNames, fetchJobSubGroups } from '../services/EmployeeService';
import { Dropdown } from 'primereact/dropdown';

function JobNames() {
  const [jobNames, setJobNames] = useState([]);
  const [jobGroups, setJobGroups] = useState([]);
  const [jobSubGroups, setJobSubGroups] = useState([]);
  const [selectedJobGroupsId, setSelectedJobGroupsId] = useState('');
  const [selectedJobSubGroupsId, setSelectedJobSubGroupsId] = useState('');
  // const [showDropDown, setShowDropDown] = useState(false);

  const navigate = useNavigate();
  const { jobGroupsId, jobSubGroupsId } = useParams();

  useEffect(() => {
    if (jobSubGroupsId && jobSubGroupsId !== 'all') {
      fetchJobNames(jobSubGroupsId).then((data) => setJobNames(data));
    } else {
      setJobNames([]);
      fetchJobGroups().then((data) => setJobGroups(data))
    }
  }, [jobSubGroupsId]);

  useEffect(() => {
    if (selectedJobGroupsId) {
      fetchJobSubGroups(selectedJobGroupsId).then((data) => setJobSubGroups(data));
    }
  }, [selectedJobGroupsId]);


  useEffect(() => {
    if (selectedJobSubGroupsId) {
      fetchJobNames(selectedJobSubGroupsId).then((data) => setJobNames(data));
    }
  }, [selectedJobSubGroupsId]);

  return (
    <div className='faculty-container'>
      <h2 className='title'>المسميات الوظيفية</h2>
      <div className="button-and-table">
        <button className='add-btn'>
          <img src='/img/mingcute_add-fill.png' alt='add' />
        </button>

    
          <div className="sector-select " style={{ display: 'flex', gap: '100px' }}>
            <div className="sector-select card flex justify-content-center">
              <Dropdown
                value={jobGroups.find((s) => s.id === selectedJobGroupsId)}
                onChange={(e) => setSelectedJobGroupsId(+e.value.id)}
                options={jobGroups}
                optionLabel="name"
                placeholder="اختر المجموعة الوظيفية"
                className="w-full md:w-14rem sector-option"
              />
            </div>

            <div className="general-select card flex justify-content-center" style={{ width: '200px', height: '50px', position: 'absolute', right: '216px' }}>
              <Dropdown
                value={jobSubGroups.find((g) => g.id === selectedJobSubGroupsId)}
                onChange={(e) => setSelectedJobSubGroupsId(+e.value.id)}
                options={jobSubGroups}
                optionLabel="name"
                placeholder="اختر المجموعة النوعية"
                className="w-full md:w-14rem general-option"
              />
            </div>
          </div>
       

        {jobSubGroupsId === 'all' && !selectedJobGroupsId && !selectedJobSubGroupsId ? (
          <p className="select-message">من فضلك اختر المجموعة الوظيفية والمجموعة النوعية أولا</p>
        ) : Array.isArray(jobNames) && jobNames.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>كود المسمى الوظيفي</th>
                <th>المسمى الوظيفي</th>
                <th>مهام ومسئوليات الوظيفة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {jobNames.map((i, index) => (
                <tr key={index}>
                  <td>{i.code}</td>
                  <td>{i.name}</td>
                  <td>{i.jobMission}</td>
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
          <p className="select-message">لا توجد بيانات للمسميات لهذا الاختيار.</p>
        )}
      </div>
    </div>
  );
}

export default JobNames; 