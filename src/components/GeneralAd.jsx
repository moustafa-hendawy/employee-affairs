import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import './GeneralAd.css'
import BackToMenu from './BackToMenu'
function GeneralAd() {
  const [generalAd, setGeneralAd] = useState([])
  const [sectors, setSectors] = useState([]);
  const [selectedSectorId, setSelectedSectorId] = useState("")
  const   fakeSectors = 
    [
{
  id: 1,
  name: 'الجامعة',
},
{
  id: 2,
  name: 'المنوفية',
},
{
  id: 3,
  name: 'اسيوط',

},
{
  id: 4,
  name: 'اسكندرية',
},
{
  id: 5,
  name: 'المدير',
},
    ]

  const   fakeGeneralAd = 
    [
{
  id: 1,
  name: 'kdfmnkfm',
  level:5,
  specialLevel: 6,
  kind: 'dfdkf'
},
{
  id: 1,
  name: 'klmsndckdf',
  level:5,
  specialLevel: 6,
  kind: 'dfdkf'
},
{
  id: 1,
  name: 'knnfkdnmdfk',
  level:5,
  specialLevel: 6,
  kind: 'dfdkf'
},
{
  id: 1,
  name: 'الجامعة',
  level:5,
  specialLevel: 6,
  kind: 'dfdkf'
}

    ]
  
  useEffect(() => {
    setSectors(fakeSectors)
      // fetchGeneralAd().then((data) => setGeneralAd(data))
      
  },[])
  useEffect(() => {
    selectedSectorId && setGeneralAd(fakeGeneralAd) 
      // fetchGeneralAd().then((data) => setGeneralAd(data))
      
  },[selectedSectorId])

  return (
    <div className='general-ad'>
      <BackToMenu />
      <div className="selector">
      <h4>القطاعات أو الوحدات (مستوى 1)</h4>
        <select name="" id="" value={selectedSectorId} onChange={(e) => setSelectedSectorId(+(e.target.value))}>
          <option value="" disabled>احتر حاجة</option>
          {sectors.map((i) => 
          <option value={i.id}>{i.name}</option>
          )}
        </select>
      </div>
      <div className="level-two">
  <span >المستوى التنظيمي الثاني</span>
      <span>الإدارات العامة أو الوحدات</span>
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
       <p>بادخال القطاع..</p>
}
    
    
    </div>
  )
}

export default GeneralAd
