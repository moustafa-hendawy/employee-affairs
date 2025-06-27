
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { fetchNonExistenceType } from '../services/EmployeeService'
import BackToMenu from './BackToMenu';

function NonExistanceType() {
  const [nonExistence, setNonExistence] = useState([]);
  useEffect(() => {
    fetchNonExistenceType().then((data) => setNonExistence(data))
  }, [])
  return (
    <div>
       <BackToMenu style={{position: 'absolute',left: '14px',top: '32px'}} />
      <h4 className='non-exist' style={{padding: '20px',
   margin: '20px',
    textAlign: 'center'}}>حالات عدم الوجود في العمل</h4>
     <DataTable className='dataTable' value={nonExistence} tableStyle={{ minWidth: '30rem' }}>
             <Column field="name" header="حالة عدم الوجود" />
             <Column field="code" header="كود الحالة" style={{ width: '400px' }} />
             {/* <Column field="status" header="النوع" /> */}
           </DataTable>
    </div>
  )
}

export default NonExistanceType
