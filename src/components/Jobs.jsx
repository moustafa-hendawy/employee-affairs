
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobSubGroups } from '../services/EmployeeService';

function Jobs() {
    const [jobs, setJobs] = useState();
     const [selectedGroupId, setSelectedGroupId] = useState(null);
   
     useEffect(() => {
// fetching the jobs list of the selected group to render them in the table
fetchJobSubGroups().then((data) => {
    console.log(data);
    setJobs(data)
})
},[selectedGroupId])
    
  return (
    <div className='job'>
        <h1>Jobs</h1>
{selectedGroupId}
        <select onChange={(e) => setSelectedGroupId(e.target.value)} name="" id="" style={{width: '200px'}}>
                {jobs && jobs.map((group) => (
                       <>
                        <option value={group.id}>{group.name}</option>
                       </>
                ))}
        </select>
     <DataTable className='dataTable' value={jobs} tableStyle={{ minWidth: '35rem'}} style={{paddingRight: '20px'}}>
              <Column field="id" header="رقم المسلسل"></Column>
              <Column field="name" header="اسم المجموعة الوظيفية"></Column>
              <Column field="code" header="كود المجموعة الوظيفية"></Column>
       
          </DataTable>
    </div>
  )
}

export default Jobs
