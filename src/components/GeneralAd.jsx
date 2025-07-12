// import './SubAd.css';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { fetchGeneralAd } from '../services/EmployeeService';
// import { useParams } from 'react-router-dom';
// import { fetchSectorData } from './redux/SectorReducers';
// import { useDispatch } from 'react-redux';

// function GeneralAd() {
//   const dispatch = useDispatch()
// const navigate = useNavigate();
// const [generalAd, setGeneralAd] = useState([]);
//   const [sectors, setSectors] = useState([]);
//   const [selectedSectorId, setSelectedSectorId] = useState("");
//   const [showDropDown, setShowDropDown] = useState(false);  
// const {sectorId} = useParams();

//  useEffect(() => {
//       dispatch(fetchSectorData()).unwrap().then((data) => setSectors(data));     
//   },[]);


// useEffect(() => {
//   if (sectorId && sectorId !== 'all') {
//     fetchGeneralAd(sectorId).then((data) => setGeneralAd(data));
//   } else {
//     setGeneralAd([]); 
//     setShowDropDown(true)
//   }
// }, [sectorId]);


// useEffect(() => {
//   if (selectedSectorId) {
//     fetchGeneralAd(selectedSectorId).then((data) => setGeneralAd(data));
//   }
// }, [selectedSectorId]);

//   return (
//  <div className='faculty-container'>
//               <h2 className='title'>  الادارة العامة</h2>
//      <div className="button-and-table">
       
//       <div className="add-and-select">
//               <button className='add-btn'>
//         <img src='/img/mingcute_add-fill.png' alt='add' />
//       </button>
      
//      {showDropDown &&  
//       // <select name="" id="" value={selectedSectorId} onChange={(e) => setSelectedSectorId(+(e.target.value))}>
//       //      <option value="" disabled>اختر القطاع</option>
//       //      {sectors.map((i) => 
//       //      <option value={i.id}>{i.name}</option>
//       //      )}
//       //    </select> 
         
//          <div className="selects" style={{ display: 'flex', gap: '100px' }}>
//              <div className="sector-select card flex justify-content-center">
//                      <Dropdown value={sectors.find((s) => s.id === selectedSectorId)}  onChange={(e) => setSelectedSectorId(+e.value.id)} options={sectors} optionLabel="name" 
//                          placeholder=" اختر القطاع " className="w-full md:w-14rem sector-option" />
//                  </div>
     
//       </div>
//     }
// {sectorId === 'all' && !selectedSectorId ? (
//   <p className="select-message">من فضلك اختر القطاع أولا</p>
// ) : (
//   Array.isArray(generalAd) && generalAd.length > 0 ? (
//     <table>
//       <thead>
//         <tr>
//           <th>الادارة العامة</th>
//           <th>كود الادارة العامة</th>
//           <th>مستوى ادارة عامة</th>
//           <th>كائن خاص</th>
//           <th>حالة الادارة العامة</th>
//           <th>الإجراءات</th>
//         </tr>
//       </thead>
//       <tbody>
//         {generalAd.map((i, index) => (
//           <tr key={index} onClick={() => navigate(`/sectors/generalAd/${i.id}/subAd`)} style={{ cursor: 'pointer' }}>
//             <td>{i.name}</td>
//             <td>{i.code}</td>
//             <td style={{ color: i.level ? 'rgb(40, 167, 69)' : '#DC4C64' }}>{i.level ? '✔' : '✖'}</td>
//             <td style={{ color: i.specialLevel ? 'rgb(40, 167, 69)' : '#DC4C64' }}>{i.specialLevel ? '✔' : '✖'}</td>
//             <td>{i.status}</td>
//             <td className='edit-and-delete'>
//               <img src="/img/ic_sharp-edit.png" alt="edit" className="icon-action" />
//               <img src="/img/ic_outline-delete.png" alt="delete" className="icon-action" />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   ) : (
//     selectedSectorId && <p className="select-message">لا توجد بيانات للإدارة العامة لهذا القطاع.</p>
//   )
// )}

    
//      </div>
//         </div>
//   );
// }

// export default GeneralAd;


// // import './GeneralAd.css';
// // import { useNavigate } from 'react-router-dom';
// // import React, { useEffect, useState } from 'react';
// // import { fetchGeneralAd } from '../services/EmployeeService';
// // import { useParams } from 'react-router-dom';
// // import { fetchSectorData } from './redux/SectorReducers';
// // import { useDispatch } from 'react-redux';
// // import CustomDropdown from './CustomDropdown';

// // function GeneralAd() {
// //   const [generalAd, setGeneralAd] = useState([]);
// //   const [sectors, setSectors] = useState([]);
// //   const [selectedSectorId, setSelectedSectorId] = useState(null);
// //   const [showDropDown, setShowDropDown] = useState(false);
// //   const { sectorId } = useParams();

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (sectorId && sectorId !== 'all') {
// //       fetchGeneralAd(sectorId).then((data) => setGeneralAd(data));
// //     } else {
// //       setGeneralAd([]);
// //       setShowDropDown(true);
// //     }
// //   }, [sectorId]);

// //   useEffect(() => {
// //     dispatch(fetchSectorData())
// //       .unwrap()
// //       .then((data) => setSectors(data));
// //   }, []);

// //   useEffect(() => {
// //     if (selectedSectorId) {
// //       fetchGeneralAd(selectedSectorId).then((data) => setGeneralAd(data));
// //     }
// //   }, [selectedSectorId]);

// //   return (
// //     <div className='faculty-container'>
// //       <h2 className='title'>الادارة العامة</h2>
// //       <div className='button-and-table'>
// //         <div className='add-and-select'>
// //           <button className='add-btn'>
// //             <img src='/img/mingcute_add-fill.png' alt='add' />
// //           </button>

// //           {showDropDown && (
// //             <CustomDropdown
// //               options={sectors}
// //               selectedValue={sectors.find(s => s.id === selectedSectorId)}
// //               onSelect={(option) => setSelectedSectorId(option.id)}
// //               placeholder='اختر القطاع'
// //             />
// //           )}
// //         </div>

// //         {sectorId === 'all' && !selectedSectorId ? (
// //           <p className='select-message'>من فضلك اختر القطاع أولا</p>
// //         ) : Array.isArray(generalAd) && generalAd.length > 0 ? (
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>الادارة العامة</th>
// //                 <th>كود الادارة العامة</th>
// //                 <th>مستوى ادارة عامة</th>
// //                 <th>كائن خاص</th>
// //                 <th>حالة الادارة العامة</th>
// //                 <th>الإجراءات</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {generalAd.map((i, index) => (
// //                 <tr
// //                   key={index}
// //                   onClick={() => navigate(`/subAd/generalAd-id/${i.id}`)}
// //                   style={{ cursor: 'pointer' }}
// //                 >
// //                   <td>{i.name}</td>
// //                   <td>{i.code}</td>
// //                   <td style={{ color: i.level ? 'rgb(40, 167, 69)' : '#DC4C64' }}>
// //                     {i.level ? '✔' : '✖'}
// //                   </td>
// //                   <td style={{ color: i.specialLevel ? 'rgb(40, 167, 69)' : '#DC4C64' }}>
// //                     {i.specialLevel ? '✔' : '✖'}
// //                   </td>
// //                   <td>{i.status}</td>
// //                   <td className='edit-and-delete'>
// //                     <img
// //                       src='/img/ic_sharp-edit.png'
// //                       alt='edit'
// //                       className='icon-action'
// //                     />
// //                     <img
// //                       src='/img/ic_outline-delete.png'
// //                       alt='delete'
// //                       className='icon-action'
// //                     />
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           selectedSectorId && <p className='select-message'>لا توجد بيانات للإدارة العامة لهذا القطاع.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default GeneralAd;


import './SubAd.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { fetchGeneralAd } from '../services/EmployeeService';
import { fetchSectorData } from './redux/SectorReducers';

function GeneralAd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sectorId } = useParams();

  const [generalAd, setGeneralAd] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSectorId, setSelectedSectorId] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    dispatch(fetchSectorData())
      .unwrap()
      .then((data) => setSectors(data));
  }, [dispatch]);

  useEffect(() => {
    if (sectorId && sectorId !== 'all') {
      fetchGeneralAd(sectorId).then((data) => setGeneralAd(data));
    } else {
      setGeneralAd([]);
      setShowDropDown(true);
    }
  }, [sectorId]);

  useEffect(() => {
    if (selectedSectorId) {
      fetchGeneralAd(selectedSectorId).then((data) => setGeneralAd(data));
    }
  }, [selectedSectorId]);

  return (
    <div className='faculty-container'>
      <h2 className='title'>الادارة العامة</h2>
      <div className='button-and-table'>
        <div className='add-and-select'>
          <button className='add-btn'>
            <img src='/img/mingcute_add-fill.png' alt='add' />
          </button>

          {showDropDown && (
            <div className="selects" style={{ display: 'flex', gap: '100px' }}>
              <div className="sector-select card flex justify-content-center">
                <Dropdown
                  value={sectors.find((s) => s.id === selectedSectorId)}
                  onChange={(e) => setSelectedSectorId(+e.value.id)}
                  options={sectors}
                  optionLabel="name"
                  placeholder=" اختر القطاع "
                  className="w-full md:w-14rem sector-option"
                />
              </div>
            </div>
          )}
        </div>

        {sectorId === 'all' && !selectedSectorId ? (
          <p className="select-message">من فضلك اختر القطاع أولا</p>
        ) : Array.isArray(generalAd) && generalAd.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>الادارة العامة</th>
                <th>كود الادارة العامة</th>
                <th>مستوى ادارة عامة</th>
                <th>كائن خاص</th>
                <th>حالة الادارة العامة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {generalAd.map((i, index) => (
                <tr key={index} onClick={() => navigate(`/sectors/generalAd/${i.id}/subAd`)} style={{ cursor: 'pointer' }}>
                  <td>{i.name}</td>
                  <td>{i.code}</td>
                  <td style={{ color: i.level ? 'rgb(40, 167, 69)' : '#DC4C64' }}>{i.level ? '✔' : '✖'}</td>
                  <td style={{ color: i.specialLevel ? 'rgb(40, 167, 69)' : '#DC4C64' }}>{i.specialLevel ? '✔' : '✖'}</td>
                  <td>{i.status}</td>
                  <td className='edit-and-delete'>
                    <img src="/img/ic_sharp-edit.png" alt="edit" className="icon-action" />
                    <img src="/img/ic_outline-delete.png" alt="delete" className="icon-action" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          selectedSectorId && <p className="select-message">لا توجد بيانات للإدارة العامة لهذا القطاع.</p>
        )}
      </div>
    </div>
  );
}

export default GeneralAd;
