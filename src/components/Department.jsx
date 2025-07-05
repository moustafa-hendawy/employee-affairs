
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import BackToMenu from './BackToMenu';

function Department() {
//     const [department, setDepartment] = useState([])
//   const [sectors, setSectors] = useState([]);
//   const [selectedSectorId, setSelectedSectorId] = useState("")


// useEffect(() => {
//     setSectors(fakeSectors)
//       // fetchGeneralAd().then((data) => setGeneralAd(data))
      
//   },[])
//   useEffect(() => {
//     selectedSectorId && setGeneralAd(fakeGeneralAd) 
//       // fetchGeneralAd().then((data) => setGeneralAd(data))
      
//   },[selectedSectorId])


  return (
     <div className='general-ad'>
      {/* <BackToMenu />
    <div className="selectors">
        <div className="select-sector">
      <h4>القطاع (مستوى 1)</h4>
        <select name="" id="" value={selectedSectorId} onChange={(e) => setSelectedSectorId(+(e.target.value))}>
          <option value="" disabled>احتر حاجة</option>
          {sectors.map((i) => 
          <option value={i.id}>{i.name}</option>
          )}
        </select>
      </div>
      <div className="select-general-ad">
      <h4>الادارة العامة أو الوحدات (مستوى 2)</h4>
        <select name="" id="" value={selectedSectorId} onChange={(e) => setSelectedSectorId(+(e.target.value))}>
          <option value="" disabled>احتر حاجة</option>
          {sectors.map((i) => 
          <option value={i.id}>{i.name}</option>
          )}
        </select>
      </div>
      <div className="select-sub-ad">
      <h4>الادارة الفرعية أو الاقسام (مستوى 3)</h4>
        <select name="" id="" value={selectedSectorId} onChange={(e) => setSelectedSectorId(+(e.target.value))}>
          <option value="" disabled>احتر حاجة</option>
          {sectors.map((i) => 
          <option value={i.id}>{i.name}</option>
          )}
        </select>
      </div>
    </div>
      <div className="fourth-level">
  <span >المستوى التنظيمي الرابع</span>
      <span>الأقسام</span>
       </div>
       <br />

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
     */}
    
    </div>
  )
}

export default Department
