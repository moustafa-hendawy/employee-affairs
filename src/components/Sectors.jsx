// import React, { useEffect, useState } from 'react'
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { fetchSectors } from '../services/EmployeeService';
// import './Sectors.css'
// import MainPage from './MainPage';
// import BackToMenu from './BackToMenu';
// function Sectors() {
//   const [sector, setSector] = useState([]);
//   useEffect(() => {
//     fetchSectors().then((data) => setSector(data))
//   },[])
//   return (
//     <div>
//       <BackToMenu style={{position: 'absolute',
//     left: '14px',
//     top: '32px'}}/>
//      <div className="sector-title">
//        <h4 className='first'>المستوى التنظيمي الاول</h4>
//       <h4 className='units'>القطاعات أو الوحدات </h4>
//      </div>
//      <p> إدخال القطاعات او الوحدات وأكوادها (يبدأ بواحد ويزيد بواحد في كل قطاع أو وحدة)...</p>
//          <DataTable className='dataTable' value={sector} tableStyle={{ minWidth: '50rem' }}>
//         <Column field="name" header="القطاع" />
//         <Column field="code" header="كود القطاع" style={{ width: '400px' }} />
//         <Column field="status" header="النوع" />
//       </DataTable>
//     </div>
//   )
// }

// export default Sectors

import React, { useEffect, useState } from 'react';
import {fetchSectors} from '../services/EmployeeService';
import './faculty/Faculty.css'

function Sectors() {
const [sector, setSector] = useState([]);
 

  useEffect(() => {
   fetchSectors().then((data) => setSector(data))
  },[])
  return (
       <div className='faculty-container'>
              <h2 className='title'>  القطاع </h2>
     <div className="button-and-table">
       
      <button className='add-btn'>
        <img src='img/mingcute_add-fill.png' alt='add' />
      </button>

      <table>
        <thead>
          <tr>
            <th>  كود القطاع </th>
            <th>   القطاع  </th>
            <th>   النوع  </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {sector.map((i, index) => (
            <tr key={index}>
              <td>{i.code}</td>
              <td>{i.name}</td>
              <td>{i.status}</td>
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

export default Sectors
