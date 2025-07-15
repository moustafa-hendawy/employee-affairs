

import './subAd/SubAd.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchJobGroups, fetchJobSubGroups } from '../services/EmployeeService';
import { Dropdown } from 'primereact/dropdown';

function JobSubGroups() {
  const [jobSubGroups, setJobSubGroups] = useState([]);
  const [jobGroups, setJobGroups] = useState([]);
  const [selectedJobGroupId, setSelectedJobGroupId] = useState('');


  const navigate = useNavigate();
  const { jobGroupsId } = useParams();

  useEffect(() => {
    if (jobGroupsId && jobGroupsId !== 'all') {
      fetchJobSubGroups(jobGroupsId).then((data) => setJobSubGroups(data));
     
    } else {
      fetchJobGroups().then((data) => setJobGroups(data))
    }
  }, [jobGroupsId]);

  useEffect(() => {
    if (selectedJobGroupId) {
      fetchJobSubGroups(selectedJobGroupId).then((data) => setJobSubGroups(data));
    }
  }, [selectedJobGroupId]);

  return (
    <div className='faculty-container'>
      <h2 className='title'>المجموعة النوعية</h2>
      <div className="button-and-table">
        <button className='add-btn'>
          <img src='/img/mingcute_add-fill.png' alt='add' />
        </button>

       
          <div className="sector-select" style={{ display: 'flex', gap: '100px' }}>
            <div className="sector-select card flex justify-content-center">
              <Dropdown
                value={jobGroups.find((s) => s.id === selectedJobGroupId)}
                onChange={(e) => setSelectedJobGroupId(+e.value.id)}
                options={jobGroups}
                optionLabel="name"
                placeholder="اختر المجموعة الوظيفية"
                className="w-full md:w-14rem sector-option"
              />
            </div>
          </div>
      

        {jobGroupsId === 'all' && !selectedJobGroupId ? (
          <p className="select-message">من فضلك اختر المجموعة الوظيفية أولا</p>
        ) : Array.isArray(jobSubGroups) && jobSubGroups.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>كود المجموعة النوعية</th>
                <th>المجموعة النوعية</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {jobSubGroups.map((i, index) => (
                <tr key={index} onClick={() => navigate(`/job-groups/job-sub-groups/${jobGroupsId}/job-names`)} style={{ cursor: 'pointer' }}>
                  <td>{i.code}</td>
                  <td>{i.name}</td>
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
          <p className="select-message">لا توجد بيانات للمجموعة النوعية.</p>
        )}
      </div>
    </div>
  );
}

export default JobSubGroups;
