
import './faculty/Faculty.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchJobNames } from '../services/EmployeeService';
// import './JobNames.css';
import { useParams } from 'react-router-dom';

function JobNames() {
const [jobNames, setJobNames] = useState([])
const navigate = useNavigate(); 
const {id} = useParams();

  useEffect(() => {
    fetchJobNames(id).then((data) => setJobNames(data))
  }, []);

  return (
 <div className='faculty-container'>
              <h2 className='title'>المجموعة النوعية</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='/img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
     <th>   المسمى الوظيفي</th>
            <th> كود المسمى الوظيفي </th>
            <th> مهام ومسئوليات الوظيفة </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {jobNames.map((i, index) => (
            <tr key={index}>
              <td>{i.name}</td>
              <td>{i.code}</td>
              <td>{i.jobMission}</td>
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

export default JobNames;