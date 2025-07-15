
// // import '../SubAd.css';
// // import React, { useEffect, useState } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Dropdown } from 'primereact/dropdown';
// // // import { fetchGeneralAd } from '../../services/EmployeeService';
// // import { fetchSectorData } from '../redux/SectorReducers';
// // import { deleteGeneralData, fetchGeneralData } from '../redux/GeneralAdReducer';
// // import AddGeneral from './AddGeneral';

// // function GeneralAd() {
// //   const general = useSelector(state => state.generalSlice)
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { sectorId } = useParams();
// //  const [addVisible, setAddVisible] = useState(false);
// //   const [editVisible, setEditVisible] = useState(false);
// //   // const [selectedFaculty, setSelectedFaculty] = useState(null);
// //   // const [sectors, setSectors] = useState([]);
// //   const [selectedSectorId, setSelectedSectorId] = useState("");
// //   const [showDropDown, setShowDropDown] = useState(false);

// //   useEffect(() => {
// //     dispatch(fetchSectorData())
// //       // .unwrap()
// //       // .then((data) => setSectors(data));
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (sectorId && sectorId !== 'all') {
// //       dispatch(fetchGeneralData(sectorId));
// //     } else {
// //       // setGeneralAd([]);
// //       setShowDropDown(true);
// //     }
// //   }, [sectorId, dispatch]);

// //   useEffect(() => {
// //     if (selectedSectorId) {
// //       dispatch(fetchGeneralData(selectedSectorId));
// //     }
// //   }, [selectedSectorId, dispatch]);

// //   // Delete
// //   const handleDelete = (id) => {
// //     Swal.fire({
// //         title: "هل تريد الحذف فعلا ؟",
// //         showCancelButton: true,
// //         confirmButtonText: "حـذف",
// //         cancelButtonText: "لا",
// //         confirmButtonColor: "#d33", 
// //         cancelButtonColor: "#3085d6"
// //       }).then((result) => {
// //          if (result.isConfirmed) {
// //         dispatch(deleteGeneralData(id));
// //              dispatch(fetchGeneralData());
// //         } 
// //         else if (result.isDenied) {
// //           Swal.fire("Changes are not saved", "", "info");
// //         }
        
// //       });
// //     }

// //   return (
// //     <div className='faculty-container'>
// //       <h2 className='title'>الادارة العامة</h2>
// //       <div className='button-and-table'>
// //         <div className='add-and-select'>
// //           <button className='add-btn'>
// //             <img src='/img/mingcute_add-fill.png' alt='add' />
// //           </button>

// //           {showDropDown && (
// //             <div className="selects" style={{ display: 'flex', gap: '100px' }}>
// //               <div className="sector-select card flex justify-content-center">
// //                 <Dropdown
// //                   value={sectors.find((s) => s.id === selectedSectorId)}
// //                   onChange={(e) => setSelectedSectorId(+e.value.id)}
// //                   options={sectors}
// //                   optionLabel="name"
// //                   placeholder=" اختر القطاع "
// //                   className="w-full md:w-14rem sector-option"
// //                 />
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //      {/* نافذة الإضافة */}
// //         <Dialog className="custom-dialog" header='' visible={addVisible} onHide={() => setAddVisible(false)}>
// //           <AddGeneral onClose={() => setAddVisible(false)} />
// //         </Dialog>

// //         {/* نافذة التعديل */}
// //         {/* <Dialog className="custom-dialog" header='' visible={editVisible} onHide={() => setEditVisible(false)}>
// //           <Update data={selectedFaculty} onClose={() => setEditVisible(false)} />
// //         </Dialog> */}

// //         {sectorId === 'all' && !selectedSectorId ? (
// //           <p className="select-message">من فضلك اختر القطاع أولا</p>
// //         ) : Array.isArray(general) && general.length > 0 ? (
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
// //               {general.map((i, index) => (
// //                 <tr key={index} onClick={() => navigate(`/sectors/generalAd/${i.id}/subAd`)} style={{ cursor: 'pointer' }}>
// //                   <td>{i.name}</td>
// //                   <td>{i.code}</td>
// //                   <td style={{ color: i.level ? 'rgb(40, 167, 69)' : '#DC4C64' }}>{i.level ? '✔' : '✖'}</td>
// //                   <td style={{ color: i.specialLevel ? 'rgb(40, 167, 69)' : '#DC4C64' }}>{i.specialLevel ? '✔' : '✖'}</td>
// //                   <td>{i.status === 0 ? 'مستحدث' : 'قديم'}</td>
// //                   <td className='edit-and-delete'>
// //                     <img src="/img/ic_sharp-edit.png" alt="edit" className="icon-action" />
// //                     <img src="/img/ic_outline-delete.png" alt="delete" className="icon-action" onClick={() => handleDelete(i.id)} />
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           selectedSectorId && <p className="select-message">لا توجد بيانات للإدارة العامة لهذا القطاع.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default GeneralAd;



// import '../SubAd.css';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Dropdown } from 'primereact/dropdown';
// import { Dialog } from 'primereact/dialog';
// import Swal from 'sweetalert2';
// import { fetchSectorData } from '../redux/SectorReducers';
// import { deleteGeneralData, fetchGeneralData } from '../redux/GeneralAdReducer';
// import AddGeneral from './AddGeneral';

// function GeneralAd() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { sectorId } = useParams();

//   const general = useSelector((state) => state.generalSlice);
//   const sectors = useSelector((state) => state.sectorSlice); // تأكد من أن slice اسمه sectorSlice

//   const [selectedSectorId, setSelectedSectorId] = useState('');
//   const [showDropDown, setShowDropDown] = useState(false);
//   const [addVisible, setAddVisible] = useState(false);
//   const [editVisible, setEditVisible] = useState(false);

//   useEffect(() => {
//     dispatch(fetchSectorData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (sectorId && sectorId !== 'all') {
//       dispatch(fetchGeneralData(sectorId));
//     } else {
//       setShowDropDown(true);
//     }
//   }, [sectorId, dispatch]);

//   useEffect(() => {
//     if (selectedSectorId) {
//       dispatch(fetchGeneralData(selectedSectorId));
//     }
//   }, [selectedSectorId, dispatch]);

//   // حذف عنصر
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'هل تريد الحذف فعلاً؟',
//       showCancelButton: true,
//       confirmButtonText: 'حـذف',
//       cancelButtonText: 'إلغاء',
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteGeneralData(id)).then(() => {
//           dispatch(fetchGeneralData(sectorId !== 'all' ? sectorId : selectedSectorId));
//         });
//       }
//     });
//   };

//   return (
//     <div className="faculty-container">
//       <h2 className="title">الإدارة العامة</h2>

//       <div className="button-and-table">
//         <div className="add-and-select">
//           <button className="add-btn" onClick={() => setAddVisible(true)}>
//             <img src="/img/mingcute_add-fill.png" alt="add" />
//           </button>

//           {showDropDown && (
//             <div className="selects" style={{ display: 'flex', gap: '100px' }}>
//               <div className="sector-select card flex justify-content-center">
//                 <Dropdown
//                   value={sectors.find((s) => s.id === selectedSectorId)}
//                   onChange={(e) => setSelectedSectorId(+e.value.id)}
//                   options={sectors}
//                   optionLabel="name"
//                   placeholder="اختر القطاع"
//                   className="w-full md:w-14rem sector-option"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* نافذة الإضافة */}
//         <Dialog className="custom-dialog" header="إضافة إدارة عامة" visible={addVisible} onHide={() => setAddVisible(false)}>
//           <AddGeneral onClose={() => setAddVisible(false)} />
//         </Dialog>

//         {/* نافذة التعديل (قيد التنفيذ أو لاحقاً) */}
//         {/* <Dialog visible={editVisible} onHide={() => setEditVisible(false)}>
//           <Update data={selectedFaculty} onClose={() => setEditVisible(false)} />
//         </Dialog> */}

//         {sectorId === 'all' && !selectedSectorId ? (
//           <p className="select-message">من فضلك اختر القطاع أولاً</p>
//         ) : Array.isArray(general) && general.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>الإدارة العامة</th>
//                 <th>كود الإدارة العامة</th>
//                 <th>مستوى إدارة عامة</th>
//                 <th>كائن خاص</th>
//                 <th>حالة الإدارة العامة</th>
//                 <th>الإجراءات</th>
//               </tr>
//             </thead>
//             <tbody>
//               {general.map((i, index) => (
//                 <tr
//                   key={index}
//                   onClick={() => navigate(`/sectors/generalAd/${i.id}/subAd`)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <td>{i.name}</td>
//                   <td>{i.code}</td>
//                   <td style={{ color: i.level ? 'green' : 'red' }}>{i.level ? '✔' : '✖'}</td>
//                   <td style={{ color: i.specialLevel ? 'green' : 'red' }}>{i.specialLevel ? '✔' : '✖'}</td>
//                   <td>{i.status === 0 ? 'مستحدث' : 'غير مستحدث'}</td>
//                   <td className="edit-and-delete">
//                     <img src="/img/ic_sharp-edit.png" alt="edit" className="icon-action" />
//                     <img
//                       src="/img/ic_outline-delete.png"
//                       alt="delete"
//                       className="icon-action"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDelete(i.id);
//                       }}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           selectedSectorId && <p className="select-message">لا توجد بيانات للإدارة العامة لهذا القطاع.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GeneralAd;



import '../subAd/SubAd.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2';

import { fetchSectorData } from '../redux/SectorReducers';
import { deleteGeneralData, fetchGeneralData } from '../redux/GeneralAdReducer';
import AddGeneral from './AddGeneral';
import EditGeneral from './EditGeneral'

function GeneralAd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sectorId } = useParams();

    const general = useSelector((state) => state.generalSlice);
  const sectors = useSelector(state => state.sectors);


  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [selectedGeneral, setSelectedGeneral] = useState(null);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  // جلب بيانات القطاعات
  useEffect(() => {
    dispatch(fetchSectorData());
  }, [dispatch]);

  // في حالة الدخول من رابط معين مثل /sectors/generalAd/:sectorId
  useEffect(() => {
    if (sectorId && sectorId !== 'all') {
      setSelectedSectorId(sectorId);
      dispatch(fetchGeneralData(sectorId));
    } else {
      dispatch(fetchSectorData());
    }
  }, [sectorId, dispatch]);

  // عند اختيار القطاع من Dropdown
  useEffect(() => {
    if (selectedSectorId) {
      dispatch(fetchGeneralData(selectedSectorId));
    }
  }, [selectedSectorId, dispatch]);

  useEffect(() => {
    console.log('Moustafaf' , sectors)
  },[sectors])




  // حذف إدارة عامة
  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل تريد الحذف فعلاً؟',
      showCancelButton: true,
      confirmButtonText: 'حـذف',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGeneralData(id)).then(() => {
          const reloadId = sectorId !== 'all' ? sectorId : selectedSectorId;
          dispatch(fetchGeneralData(reloadId));
        });
      }
    });
  };

  return (
    <div className="faculty-container">
      <h2 className="title">الإدارة العامة</h2>

      <div className="button-and-table">
        <div className="add-and-select">
          <button className="add-btn" onClick={() => setAddVisible(true)}>
            <img src="/img/mingcute_add-fill.png" alt="add" />
          </button>

            <div className="selects" style={{ display: 'flex', gap: '100px' }}>
              <div className="sector-select card flex justify-content-center">
           
             <Dropdown
                  value={Array.isArray(sectors) ? sectors.find((s) => s.id === +selectedSectorId) : null}
                  onChange={(e) => setSelectedSectorId(+e.value.id)}
                  options={sectors}
                  optionLabel="name"
                  placeholder="اختر القطاع"
                  className="w-full md:w-14rem sector-option"
                />
              </div>
            </div>
          {/* )} */}
        </div>

        {/* نافذة الإضافة */}
        <Dialog className="custom-dialog" header="إضافة إدارة عامة" visible={addVisible} onHide={() => setAddVisible(false)}>
          <AddGeneral sectorId={selectedSectorId }  onClose={() => setAddVisible(false)} />
        </Dialog>

        <Dialog visible={editVisible} onHide={() => setEditVisible(false)}>
          <EditGeneral data={selectedGeneral} onClose={() => setEditVisible(false)} />
        </Dialog>

        {sectorId === 'all' && !selectedSectorId ? (
          <p className="select-message">من فضلك اختر القطاع أولاً</p>
        ) : Array.isArray(general) && general.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>كود الإدارة العامة</th>
                <th>الإدارة العامة</th>
                <th>مستوى إدارة عامة</th>
                <th>كائن خاص</th>
                <th>حالة الإدارة العامة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {general.map((i, index) => (
                <tr
                  key={index}
                  onClick={() => navigate(`/sectors/generalAd/${i.id}/subAd`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{i.code}</td>
                  <td>{i.name}</td>
                  <td style={{ color: i.level ? 'green' : 'red' }}>{i.level ? '✔' : '✖'}</td>
                  <td style={{ color: i.specialLevel ? 'green' : 'red' }}>{i.specialLevel ? '✔' : '✖'}</td>
                  {/* <td>{i.status === 0 ? 'مستحدث' : 'معتمد'}</td> */}
                  {i.status == 1?<td>معتمد</td>: <td>مستحدث</td>}
                  <td className="edit-and-delete">
                    <img
                      src="/img/ic_sharp-edit.png"
                      alt="edit"
                      className="icon-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGeneral(i);
                        setEditVisible(true)
                      }}
                    />
                    <img
                      src="/img/ic_outline-delete.png"
                      alt="delete"
                      className="icon-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(i.id);
                      }}
                    />
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
