
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { fetchJobGroups, fetchJobSubGroups } from '../services/EmployeeService';
import './JobSubGroups.css';
import BackToMenu from './BackToMenu';

function JobSubGroups() {
  const [jobGroups, setJobGroups] = useState([]); 
  const [jobSubGroups, setJobSubGroups] = useState([]); 
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    // جلب البيانات مرة واحدة عند تحميل المكون (أو عندما تتغير selectedGroupId إذا تحتاج)
    fetchJobGroups().then((data) => {
      console.log(data);
      setJobGroups(data);
    });
  }, []); // حددت مصفوفة التبعيات فارغة لتحميل البيانات مرة واحدة

  useEffect(() => {
    if (selectedGroup !== null) {
      fetchJobSubGroups(selectedGroup.id).then((data) => {
         data.forEach((e) => e.jobGroupCode = selectedGroup.code);
         setJobSubGroups(data);
      }).catch(() => setJobSubGroups([]));
    }
  },[selectedGroup])

  return (
    <div className='job'>
      <BackToMenu className='back-btn' />
      <div className='selctJobs'>
        <h6>المجموعة الوظيفية</h6>
        <select 
          onChange={(e) => setSelectedGroup(jobGroups.find((x) => x.id == e.target.value ))}
          value={selectedGroup ? selectedGroup.id : ''}
          name=""
          id=""
        >
          <option value="" disabled>اختر المجموعة</option>
          {jobGroups && jobGroups.map((group) => (
            <option style={{cursor: 'pointer'}} key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div>
      
          <DataTable
            className='dataTable'
            value={jobSubGroups}
            tableStyle={{ minWidth: '35rem' }}
            style={{ paddingRight: '20px' }}
          >
            <Column field="id" header="رقم المسلسل" />
            <Column field="name" header="المجموعة النوعية "/>
            <Column field="jobGroupCode" header="كود المجموعة الوظيفية" />
            <Column field="code" header="كود المجموعة النوعية" />
          </DataTable>
       
          {/* <h1>اختر المجموعة الوظيفية</h1> */}
      </div>
    </div>
  );
}

export default JobSubGroups;