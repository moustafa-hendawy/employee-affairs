
import './faculty/Faculty.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchDepartment } from '../services/EmployeeService';
import { useParams } from 'react-router-dom';

function Department() {
const [department, setDepartmet] = useState([])
const navigate = useNavigate(); 
const {id} = useParams();

  useEffect(() => {
    fetchDepartment(id).then((data) => setDepartmet(data))
  }, []);

  return (
 <div className='faculty-container'>
              <h2 className='title'>الأقـــــســــــام</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='/img/mingcute_add-fill.png' alt='add' />
      </button>

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

export default Department;