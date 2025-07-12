
// import { Column } from 'primereact/column'
// import { DataTable } from 'primereact/datatable'
// import React, { useEffect, useState } from 'react'
// import { fetchMilitaryStateType } from '../services/EmployeeService';

// function MilitaryStateType() {
//     const [militaryState, setMilitaryState] = useState([]);

//     useEffect(() => {
//         fetchMilitaryStateType().then((data) => setMilitaryState(data))
//     },[])
//   return (
//     <div>
//       <h4 style={{position: 'absolute',zIndex: '5',top: '37px',right: '600px',border: '1px solid',
//     padding: '5px 25px 13px ',
//     borderRadius: '11px',
//     backgroundColor: 'dodgerblue'}}>الموقف من التجنيد</h4>
//         <DataTable className='dataTable' value={militaryState} tableStyle={{ minWidth: '50rem' }} style={{zIndex: '0'}}>
//               <Column field="id" header="id" />
//               <Column field="name" header=" الموقف من التجنيد" style={{ width: '400px' }} />
//               <Column field="code" header="الكود" />
//             </DataTable>
//     </div>
//   )
// }

// export default MilitaryStateType

import React, { useEffect, useState } from 'react';
import {fetchMilitaryStateType} from '../services/EmployeeService';
import './faculty/Faculty.css'

function MilitaryState() {
const [militaryState, setMilitaryState] = useState([])
 

  useEffect(() => {
    fetchMilitaryStateType().then((data) => setMilitaryState(data))
  }, []);
  return (
       <div className='faculty-container'>
              <h2 className='title'>الموقف من التجنيد</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
            <th> كود الحالة</th>
            <th> الموقف من التجنيد </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {militaryState.map((i, index) => (
            <tr key={index}>
              <td>{i.code}</td>
              <td>{i.name}</td>
              <td className='center-actions'>
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

export default MilitaryState