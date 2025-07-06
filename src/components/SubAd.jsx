
import React, { useEffect, useState } from 'react'
import './SubAd.css';
import BackToMenu from './BackToMenu';

function SubAd() {
//  const [jobGroups, setJobGroups] = useState([]); 
//    const [jobSubGroups, setJobSubGroups] = useState([]); 
//    const [selectedGroup, setSelectedGroup] = useState(null);
 
//    useEffect(() => {
//      fetchJobGroups().then((data) => {
//        console.log(data);
//        setJobGroups(data);
//      });
//    }, []);
 
//    useEffect(() => {
//      if (selectedGroup !== null) {
//        fetchJobSubGroups(selectedGroup.id).then((data) => {
//           data.forEach((e) => e.jobGroupCode = selectedGroup.code);
//           setJobSubGroups(data);
//        }).catch(() => setJobSubGroups([]));
//      }
//    },[selectedGroup])
 
   return (
     <div className='sub-ad'>
       {/* <BackToMenu className='back-btn' />
       <div className='selct-sub-ad-sector'>
         <h6> القطاع (مستوى 1)</h6>
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
       <div className='selct-sub-ad-management'>
         <h6> الادارة العامة أو الوحدات (مستوى 2)</h6>
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
 <div className="third-level">
  <span>المستوى التنظيمي الثالث</span>
  <span>الادارات الفرعية أو الأقسام</span>
 </div>
 <br />

       <div>
       
       
          {selectedSectorId ? 
            <div className=""> 
                  <p>ادخال الادارات العامة</p>
                  <DataTable className='dataTable' value={generalAd} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="الادارة العامة" />
                        <Column field="id" header="كود " style={{ width: '400px' }} />
                        <Column field="level" header="مستوى الادارة العامة" />
                        <Column field="specialLevel" header="  كائن خاص" />
                        <Column field="kind" header="  الادارة العامة حالة" />
                      </DataTable> 
                </div>
                :
                 <p>باختيار القطاع أولا ثم الاداة العامة أو الوحدة تظهر الادارات الفرعية او الاقسام التابعة لإمكانية التعديل والإضافة</p>
          }
        
       </div>
     </div> */}
     </div>
   );
}

export default SubAd
