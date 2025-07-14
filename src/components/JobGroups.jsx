

import React, { useEffect, useState } from 'react';
import './faculty/Faculty.css'
import { fetchJobGroups } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
// import { fetchJobGroups } from '../services/EmployeeService';

function JobGroups() {
const [jobGroups, setJobGroups] = useState([])
const navigate = useNavigate(); 

  useEffect(() => {
    fetchJobGroups().then((data) => setJobGroups(data))
  }, []);
  return (
       <div className='faculty-container'>
              <h2 className='title'>المجموعة الوظيفية</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
            <th> كود المجموعة الوظيفية </th>
            <th>  المجموعة الوظيفية</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {jobGroups.map((i, index) => (
            <tr key={index} onClick={() => navigate(`/job-groups/${i.id}/job-sub-groups`)} style={{cursor: 'pointer'}}>
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
     </div>
        </div>

  )
}

export default JobGroups
