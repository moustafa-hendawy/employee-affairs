import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchSectors } from '../services/EmployeeService';
import './Sectors.css'
import MainPage from './MainPage';
import BackToMenu from './BackToMenu';
function Sectors() {
  const [sector, setSector] = useState([]);
  useEffect(() => {
    fetchSectors().then((data) => setSector(data))
  },[])
  return (
    <div>
      <BackToMenu style={{position: 'absolute',
    left: '14px',
    top: '32px'}}/>
     <div className="sector-title">
       <h4 className='first'>المستوى التنظيمي الاول</h4>
      <h4 className='units'>القطاعات أو الوحدات </h4>
     </div>
     <p>   ...(يبدأ بواحد ويزيد بواحد في كل قطاع أو وحدة)ادخال القطاعات أو الوحدات وأكوادها </p>
         <DataTable className='dataTable' value={sector} tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="القطاع" />
        <Column field="code" header="كود القطاع" style={{ width: '400px' }} />
        <Column field="status" header="النوع" />
      </DataTable>
    </div>
  )
}

export default Sectors
