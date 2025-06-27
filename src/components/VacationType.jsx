
import React, { useEffect, useState } from 'react'
import { fetchVacationType } from '../services/EmployeeService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function VacationType() {
    const [vacation, setVacation] = useState([]);

    useEffect(() => {
        fetchVacationType().then((data) => setVacation(data))
    },[])
  return (
    <div>
           <h4 style={{position: 'absolute',zIndex: '5',top: '37px',right: '600px',border: '1px solid',
    padding: '5px 25px 13px ',
    borderRadius: '11px',
    backgroundColor: 'dodgerblue'}}>تهيئة الاجازات</h4>
      <DataTable className='dataTable' value={vacation} tableStyle={{ minWidth: '50rem' }} style={{zIndex: '0'}}>
                    <Column field="id" header="id" />
                    <Column field="name" header=" نوع الاجازة" style={{ width: '400px' }} />
                    <Column field="code" header="كود الاجازة" />
                  </DataTable>
    </div>
  )
}

export default VacationType
