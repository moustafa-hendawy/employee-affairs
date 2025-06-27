
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import { fetchJobGroups } from './services/EmployeeService';

function JobGroups() {
   const [jobGroubs, setJobGroups] = useState();

useEffect(() => {
    fetchJobGroups().then((data) => {
console.log(data);
setJobGroups(data);
    })
}, [])

    
  return (
    <div className='job'>
        <h1 className='text-center'>المجموعة الوظيفية</h1>
    <DataTable className='dataTable' value={jobGroubs} tableStyle={{ minWidth: '35rem'}} style={{paddingRight: '20px'}}>
           <Column field="id" header="رقم المسلسل"></Column>
           <Column field="name" header="اسم المجموعة الوظيفية"></Column>
           <Column field="code" header="كود المجموعة الوظيفية"></Column>
    
       </DataTable>
    </div>
  )
}

export default JobGroups
