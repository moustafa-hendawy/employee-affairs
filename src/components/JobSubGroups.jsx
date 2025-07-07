
import './faculty/Faculty.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchJobSubGroups } from '../services/EmployeeService';
// import './JobSubGroups.css';
import { useParams } from 'react-router-dom';

function JobSubGroups() {
const [jobSubGroups, setJobSubGroups] = useState([])
const navigate = useNavigate(); 
const {id, groupCode} = useParams();

  useEffect(() => {
    fetchJobSubGroups(id).then((data) => setJobSubGroups(data))
  }, []);

  return (
 <div className='faculty-container'>
              <h2 className='title'> المسميات الوظيفية</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='/img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
            <th>  المجموعة النوعية</th>
            <th> كود المجموعة الوظيفية </th>
            <th> كود المجموعة النوعية </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {jobSubGroups.map((i, index) => (
            <tr key={index} onClick={() => navigate(`/job-names/subGroupID/${i.id}`)} style={{cursor: 'pointer'}}>
              <td>{i.name}</td>
              <td>{groupCode}</td>
              <td>{i.code}</td>
              <td>
                <img
                  src="/img/ic_sharp-edit.png"
                  alt="edit"
                  className="icon-action"
                />
                <img
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
  );
}

export default JobSubGroups;