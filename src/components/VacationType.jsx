
// import React, { useEffect, useState } from 'react'
// import { fetchVacationType } from '../services/EmployeeService';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

// function VacationType() {
//     const [vacation, setVacation] = useState([]);

//     useEffect(() => {
//         fetchVacationType().then((data) => setVacation(data))
//     },[])
//   return (
//     <div>
//            <h4 style={{position: 'absolute',zIndex: '5',top: '37px',right: '600px',border: '1px solid',
//     padding: '5px 25px 13px ',
//     borderRadius: '11px',
//     backgroundColor: 'dodgerblue'}}>تهيئة الاجازات</h4>
//       <DataTable className='dataTable' value={vacation} tableStyle={{ minWidth: '50rem' }} style={{zIndex: '0'}}>
//                     <Column field="id" header="id" />
//                     <Column field="name" header=" نوع الاجازة" style={{ width: '400px' }} />
//                     <Column field="code" header="كود الاجازة" />
//                   </DataTable>
//     </div>
//   )
// }

// export default VacationType

import React, { useEffect, useState } from 'react';
import {fetchVacationType} from '../services/EmployeeService';
import './faculty/Faculty.css'

function VacationType() {
const [vacationType, VacationType] = useState([])
 

  useEffect(() => {
    fetchVacationType().then((data) => VacationType(data))
  }, []);
  return (
       <div className='faculty-container'>
              <h2 className='title'> تهيئة الاجازات </h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
            <th> كود الاجازة </th>
            <th>  نوع الاجازة  </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {vacationType.map((i, index) => (
            <tr key={index}>
              <td>{i.code}</td>
              <td>{i.name}</td>
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

  )
}

export default VacationType
