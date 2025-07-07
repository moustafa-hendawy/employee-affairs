
import './faculty/Faculty.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchGeneralAd, fetchJobSubGroups } from '../services/EmployeeService';
// import './JobSubGroups.css';
import { useParams } from 'react-router-dom';

function GeneralAd() {
const [generalAd, setGenerAd] = useState([])
const navigate = useNavigate(); 
const {id} = useParams();

  useEffect(() => {
    fetchGeneralAd(id).then((data) => setGenerAd(data))
  }, []);

  return (
 <div className='faculty-container'>
              <h2 className='title'>  الادارة العامة</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='/img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
            <th>  الادارة العامة </th>
            <th> كود الادارة العامة  </th>
            <th>   مستوى ادارة عامة </th>
            <th>     كائن خاص </th>
            <th> حالة الادارة العامة </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {generalAd.map((i, index) => (
            <tr key={index} onClick={() => navigate(`/subAd/generalAd-id/${i.id}`)} style={{cursor: 'pointer'}}>
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

export default GeneralAd;