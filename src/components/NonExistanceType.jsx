
// import { Column } from 'primereact/column'
// import { DataTable } from 'primereact/datatable'
// import React, { useEffect, useState } from 'react'
// import { fetchNonExistenceType } from '../services/EmployeeService'
// import BackToMenu from './BackToMenu';

// function NonExistanceType() {
//   const [nonExistence, setNonExistence] = useState([]);
//   useEffect(() => {
//     fetchNonExistenceType().then((data) => setNonExistence(data))
//   }, [])
//   return (
//     <div>
//        <BackToMenu style={{position: 'absolute',left: '14px',top: '32px'}} />
//       <h4 className='non-exist' style={{padding: '20px',
//    margin: '20px',
//     textAlign: 'center'}}>حالات عدم الوجود في العمل</h4>
//      <DataTable className='dataTable' value={nonExistence} tableStyle={{ minWidth: '30rem' }}>
//              <Column field="name" header="حالة عدم الوجود" />
//              <Column field="code" header="كود الحالة" style={{ width: '400px' }} />
//              {/* <Column field="status" header="النوع" /> */}
//            </DataTable>
//     </div>
//   )
// }

// export default NonExistanceType

import React, { useEffect, useState } from 'react';
import {fetchNonExistenceType} from '../services/EmployeeService';
import './NonExistanceType.css'

function NonExistanceType() {
const [exist, setExist] = useState([])
 

  useEffect(() => {
    fetchNonExistenceType().then((data) => setExist(data))
  }, []);
  return (
       <div className='faculty-container'>
              <h2 className='title'>حالات عدم الوجود في العمل</h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
            <th> كود الحالة</th>
            <th>حالة عدم الوجود</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {exist.map((i, index) => (
            <tr key={index}>
              <td>{i.code}</td>
              <td>{i.name}</td>
              <td>
                <img
                  src="img/ic_sharp-edit.png"
                  alt="edit"
                  className="icon-action"
                />
                <img
                  src="img/ic_outline-delete.png"
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

export default NonExistanceType
