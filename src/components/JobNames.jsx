
// import './faculty/Faculty.css'
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { fetchJobNames } from '../services/EmployeeService';
// import { Dropdown } from 'primereact/dropdown';
// import { useParams } from 'react-router-dom';

// function JobNames() {
// const [jobNames, setJobNames] = useState([])
// const [jobGroups, setJobGroups] = useState([]);
// const [jobSubGroups, setJobSubGroups] = useState([]);
// const navigate = useNavigate(); 
// const {jobGroupsId} = useParams();
// const {jobSubGroupsId} = useParams();
//   const [selectedJobGroupsId, setSelectedJobGroupsId] = useState("");
//   const [selectedjobSubGroupsId, setSelectedJobSubGroupsId] = useState("");
//   const [showDropDown, setShowDropDown] = useState(false);

//   // جلب بيانات القطاعات
//   useEffect(() => {
//    fetchJobNames(jobSubGroupsId)
//       .then((data) => setSectors(data));
//   }, []);

//   // عند اختيار مجموعة وظيفية: جلب  مجموعة نوعية
//   useEffect(() => {
//     if (jobGroupsId) {
//       setJobGroups([]); // تفريغ القائمة قبل التحديث
//       setSelectedJobGroupsId(''); // إلغاء تحديد الإدارة العامة السابقة
//       fetchJobNames(jobGroupsId).then((data) => setJobNames(data));
//       // setSubAd([]); // مسح الإدارات الفرعية
//     }
//   }, [jobGroupsId]);

//   // عند اختيار مجموعة نوعية : جلب  المسميات
//   useEffect(() => {
//     if (selectedjobSubGroupsId) {
//       fetchJobNames(sele).then((data) => setJobNames(data));
//     }
//   }, [selectedjobSubGroupsId]);



//  useEffect(() => {
//    if (generalAdId && generalAdId !== 'all') {
//      fetchJobNames(jobGroupsId).then((data) => setJobNames(data));
//    } else {
//      setJobNames([]); // لو all خليه فاضي مبدئياً
//      setShowDropDown(true)
//    }       
//  }, [selectedjobSubGroupsId]);
 
 
//   return (
//  <div className='faculty-container'>
//               <h2 className='title'> المسميات الوظيفية</h2>
//      <div className="button-and-table">
       
//       <button className='add-btn'>
//         <img src='/img/mingcute_add-fill.png' alt='add' />
//       </button>


 
//         {showDropDown &&
//   <div className="selects" style={{ display: 'flex', gap: '100px' }}>
//     <div className="sector-select card flex justify-content-center">
//             <Dropdown value={sectors.find((s) => s.id === selectedSectorId)}  onChange={(e) => setSelectedSectorId(+e.value.id)} options={sectors} optionLabel="name" 
//                 placeholder=" اختر المجموعة الوظيفية " className="w-full md:w-14rem sector-option" />
//         </div>
        

//     <div className="general-select card flex justify-content-center" style={{width: '200px', height: '50px', position: 'absolute', right: '216px'}}>
//             <Dropdown value={generalAd.find((g) => g.id === selectedGeneralId)}  onChange={(e) => setSelectedGeneralId(+e.value.id)} options={generalAd} optionLabel="name" 
//                 placeholder=" اختر المجموعة النوعية  " className="w-full md:w-14rem general-option" />
//         </div>

//           </div>
          
//           }

//           {jobSubGroupsId === 'all' && !selectedSectorId && !selectedGeneralId ? (
//           <p className="select-message">
//             من فضلك اختر القطاع والإدارة العامة أولا
//           </p>
//         ) : Array.isArray(jobNames) && selectedjobSubGroupsId.length > 0 ? (
//         {jobSubGroupsId === 'all' && !selectedJobSubId ? (
//           <p className="select-message">من فضلك اختر المجموعة الوظيفية والمجموعة النوعية أولا</p>
//         ) : Array.isArray(jobNames) && jobNames.length > 0 ? (

//       <table>
//         <thead>
//           <tr>
//      <th>   المسمى الوظيفي</th>
//             <th> كود المسمى الوظيفي </th>
//             <th> مهام ومسئوليات الوظيفة </th>
//             <th>الإجراءات</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobNames.map((i, index) => (
//             <tr key={index}>
//               <td>{i.name}</td>
//               <td>{i.code}</td>
//               <td>{i.jobMission}</td>
//               <td className='center-actions '>
//                 <img
//                 onClick={(e) => e.stopPropagation()}
//                   src="/img/ic_sharp-edit.png"
//                   alt="edit"
//                   className="icon-action"
//                 />
//                 <img
//                    onClick={(e) => e.stopPropagation()}
//                   src="/img/ic_outline-delete.png"
//                   alt="delete"
//                   className="icon-action"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//      ) : (
//           <p className="select-message">
//             لا توجد بيانات للمسميات لهذا الاختيار.
//           </p>
//         )}
//      </div>
//         </div>
//   );
// }

// export default JobNames;

import './faculty/Faculty.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchJobGroups, fetchJobNames, fetchJobSubGroups } from '../services/EmployeeService';
import { Dropdown } from 'primereact/dropdown';

function JobNames() {
  const [jobNames, setJobNames] = useState([]);
  const [jobGroups, setJobGroups] = useState([]);
  const [jobSubGroups, setJobSubGroups] = useState([]);
  const [selectedJobGroupsId, setSelectedJobGroupsId] = useState('');
  const [selectedJobSubGroupsId, setSelectedJobSubGroupsId] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);

  const navigate = useNavigate();
  const { jobGroupsId, jobSubGroupsId } = useParams();

  useEffect(() => {
    if (jobSubGroupsId && jobSubGroupsId !== 'all') {
      fetchJobNames(jobSubGroupsId).then((data) => setJobNames(data));
    } else {
      setJobNames([]);
      fetchJobGroups().then((data) => setJobGroups(data))
      setShowDropDown(true);
    }
  }, [jobSubGroupsId]);

  useEffect(() => {
    if (selectedJobGroupsId) {
      fetchJobSubGroups(selectedJobGroupsId).then((data) => setJobSubGroups(data));
    }
  }, [selectedJobGroupsId]);


  useEffect(() => {
    if (selectedJobSubGroupsId) {
      fetchJobNames(selectedJobSubGroupsId).then((data) => setJobNames(data));
    }
  }, [selectedJobSubGroupsId]);

  return (
    <div className='faculty-container'>
      <h2 className='title'>المسميات الوظيفية</h2>
      <div className="button-and-table">
        <button className='add-btn'>
          <img src='/img/mingcute_add-fill.png' alt='add' />
        </button>

        {showDropDown && (
          <div className="selects" style={{ display: 'flex', gap: '100px' }}>
            <div className="sector-select card flex justify-content-center">
              <Dropdown
                value={jobGroups.find((s) => s.id === selectedJobGroupsId)}
                onChange={(e) => setSelectedJobGroupsId(+e.value.id)}
                options={jobGroups}
                optionLabel="name"
                placeholder="اختر المجموعة الوظيفية"
                className="w-full md:w-14rem sector-option"
              />
            </div>

            <div className="general-select card flex justify-content-center" style={{ width: '200px', height: '50px', position: 'absolute', right: '216px' }}>
              <Dropdown
                value={jobSubGroups.find((g) => g.id === selectedJobSubGroupsId)}
                onChange={(e) => setSelectedJobSubGroupsId(+e.value.id)}
                options={jobSubGroups}
                optionLabel="name"
                placeholder="اختر المجموعة النوعية"
                className="w-full md:w-14rem general-option"
              />
            </div>
          </div>
        )}

        {jobSubGroupsId === 'all' && !selectedJobGroupsId && !selectedJobSubGroupsId ? (
          <p className="select-message">من فضلك اختر المجموعة الوظيفية والمجموعة النوعية أولا</p>
        ) : Array.isArray(jobNames) && jobNames.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>كود المسمى الوظيفي</th>
                <th>المسمى الوظيفي</th>
                <th>مهام ومسئوليات الوظيفة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {jobNames.map((i, index) => (
                <tr key={index}>
                  <td>{i.code}</td>
                  <td>{i.name}</td>
                  <td>{i.jobMission}</td>
                  <td className='center-actions'>
                    <img
                      onClick={(e) => e.stopPropagation()}
                      src="/img/ic_sharp-edit.png"
                      alt="edit"
                      className="icon-action"
                    />
                    <img
                      onClick={(e) => e.stopPropagation()}
                      src="/img/ic_outline-delete.png"
                      alt="delete"
                      className="icon-action"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="select-message">لا توجد بيانات للمسميات لهذا الاختيار.</p>
        )}
      </div>
    </div>
  );
}

export default JobNames; 