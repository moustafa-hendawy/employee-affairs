
import './faculty/Faculty.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchSubAd } from '../services/EmployeeService';
// import './JobSubGroups.css';
import { useParams } from 'react-router-dom';

function SubAd() {
const [subAd, setSubAd] = useState([])
const navigate = useNavigate(); 
const {id} = useParams();

  useEffect(() => {
    fetchSubAd(id).then((data) => setSubAd(data))
  }, []);

  return (
 <div className='faculty-container'>
              <h2 className='title'>  الادارة الفرعية</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='/img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
            <th>   اسم الادارة الفرعية </th>
            <th>كود الادارة الفرعية </th>
            <th>   مستوى ادارة فرعية؟ </th>
            <th>     كائن خاص </th>
            <th> حالة الادارة الفرعية </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {subAd.map((i, index) => (
            <tr key={index} onClick={() => navigate(`/department/subAd-id/${id}`)} style={{cursor: 'pointer'}}>
              <td>{i.name}</td>
              <td>{i.code}</td>
              {i.level?<td style={{color:'rgb(40, 167, 69)'}}>✔</td>: <td style={{color:'#DC4C64'}}>✖</td>}
              {i.specialLevel?
              <td style={{color:'rgb(40, 167, 69)'}}>✔</td>
              :<td style={{color:'#DC4C64'}}>✖</td>
              }

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

export default SubAd;