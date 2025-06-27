
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { fetchMilitaryStateType } from '../services/EmployeeService';

function MilitaryStateType() {
    const [militaryState, setMilitaryState] = useState([]);

    useEffect(() => {
        fetchMilitaryStateType().then((data) => setMilitaryState(data))
    },[])
  return (
    <div>
      <h4 style={{position: 'absolute',zIndex: '5',top: '37px',right: '600px',border: '1px solid',
    padding: '5px 25px 13px ',
    borderRadius: '11px',
    backgroundColor: 'dodgerblue'}}>الموقف من التجنيد</h4>
        <DataTable className='dataTable' value={militaryState} tableStyle={{ minWidth: '50rem' }} style={{zIndex: '0'}}>
              <Column field="id" header="id" />
              <Column field="name" header=" الموقف من التجنيد" style={{ width: '400px' }} />
              <Column field="code" header="الكود" />
            </DataTable>
    </div>
  )
}

export default MilitaryStateType

