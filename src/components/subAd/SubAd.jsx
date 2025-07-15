import './SubAd.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import { fetchSubAd } from '../../services/EmployeeService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSectorData } from '../redux/SectorReducers';
import { Dropdown } from 'primereact/dropdown';
import { fetchGeneralData, setGeneralAd } from '../redux/GeneralAdReducer';
import AddSubAd from './AddSubAd';
import EditSubAd from './EditSubAd';
import { deleteSubAdData, fetchSubAdData, setSubAd } from '../redux/SubAdReducer';
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2';
// import { Dropdown } from 'bootstrap';
// import { Dropdown } from 'react-bootstrap';

function SubAd() {
const subAd = useSelector(state => state.subAdSlice);
console.log(subAd);
  const general = useSelector((state) => state.generalSlice);
  const sectors = useSelector((state) => state.sectors);
console.log(sectors);
  const [selectedSectorId, setSelectedSectorId] = useState('');
  const [selectedGeneralId, setSelectedGeneralId] = useState('');
  const [selectedSubAd, setSelectedSubAd] = useState(null);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {generalAdId} = useParams();


 useEffect(() => {
   if (generalAdId && generalAdId !== 'all') {
    setSelectedGeneralId(generalAdId);
     dispatch(fetchSubAdData(generalAdId));
   } else {
     dispatch(setSubAd([])); // لو all خليه فاضي مبدئياً
     dispatch(fetchSectorData());
   }       
 }, [dispatch, generalAdId]);
 
  useEffect(() => {
     if (selectedSectorId) {
       dispatch(fetchGeneralData(selectedSectorId));
     }
   }, [selectedSectorId, dispatch]);


  // عند اختيار قطاع: جلب الادارات العامة
  useEffect(() => {
    if (selectedSectorId) {
      dispatch(setGeneralAd([])); // تفريغ القائمة قبل التحديث
      setSelectedGeneralId(''); // إلغاء تحديد الإدارة العامة السابقة
      dispatch(fetchGeneralData(selectedSectorId));
      dispatch(setSubAd([])); // مسح الإدارات الفرعية
    }
  }, [selectedSectorId]);

// عند اختيار إدارة عامة: جلب الإدارات الفرعية
  useEffect(() => {
    if (selectedGeneralId) {
      dispatch(fetchSubAdData(selectedGeneralId));
    }
  }, [dispatch, selectedGeneralId]);


     // Delete
  const handleDelete = (id) => {
    Swal.fire({
        title: "هل تريد الحذف فعلا ؟",
        showCancelButton: true,
        confirmButtonText: "حـذف",
        cancelButtonText: "لا",
        confirmButtonColor: "#d33", 
        cancelButtonColor: "#3085d6"
      }).then((result) => {
         if (result.isConfirmed) {
        //   dispatch(deleteUser({id: id}));
        dispatch(deleteSubAdData(id));
             dispatch(fetchSubAdData(selectedGeneralId));
        } 
        else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
        
      });
    }


  return (
    <div className="faculty-container">
      <h2 className="title">الادارة الفرعية</h2>
      <div className="button-and-table">
        <div className="add-and-select">
          <button className="add-btn" onClick={() => setAddVisible(true)}>
            <img src="/img/mingcute_add-fill.png" alt="add" />
          </button>


          {/* نافذة الإضافة */}
        <Dialog className="custom-dialog" header='' visible={addVisible} onHide={() => setAddVisible(false)}>
          <AddSubAd generalAdId={selectedGeneralId} onClose={() => setAddVisible(false)} />
        </Dialog>

        {/* نافذة التعديل */}
        <Dialog className="custom-dialog" header='' visible={editVisible} onHide={() => setEditVisible(false)}>
          <EditSubAd subAd={selectedSubAd} onClose={() => setEditVisible(false)} />
        </Dialog>


  <div className="selects" style={{ display: 'flex', gap: '100px' }}>
    <div className="sector-select card flex justify-content-center">

            <Dropdown
              value={(sectors && sectors.find((s) => s.id === selectedSectorId)) || null}
              onChange={(e) => setSelectedSectorId(e.value.id)}
              options={sectors || []}
              optionLabel="name"
              placeholder="اختر القطاع"
              className="w-full md:w-14rem"
            />


        </div>
        

    <div className="general-select card flex justify-content-center" style={{width: '200px', height: '50px', position: 'absolute', right: '216px'}}>
            <Dropdown value={general.find((g) => g.id === selectedGeneralId)}  onChange={(e) => setSelectedGeneralId(+e.value.id)} options={general} optionLabel="name" 
                placeholder=" اختر الادارة العامة " className="w-full md:w-14rem general-option" />
        </div>

          </div>
          {/* } */}
        </div>

        {/* عرض الجدول */}
        {generalAdId === 'all' && !selectedSectorId && !selectedGeneralId ? (
          <p className="select-message">
            من فضلك اختر القطاع والإدارة العامة أولا
          </p>
        ) : Array.isArray(subAd) && subAd.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>كود الادارة الفرعية</th>
                <th>اسم الادارة الفرعية</th>
                <th>مستوى ادارة فرعية؟</th>
                <th>كادر خاص</th>
                <th>حالة الادارة الفرعية</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {subAd.map((item, index) => (
                <tr key={index} onClick={() => navigate(`/sectors/generalAd/subAd/${item.id}/department`)} style={{cursor: 'pointer'}}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td style={{ color: item.level ? 'green' : 'red' }}>
                    {item.level ? '✔' : '✖'}
                  </td>
                  <td style={{ color: item.specialLevel ? 'green' : 'red' }}>
                    {item.specialLevel ? '✔' : '✖'}
                  </td>
                  {/* <td>{item.status}</td> */}
                     {item.status == 1?<td>معتمد</td>: <td>مستحدث</td>}
                  <td className="edit-and-delete">
                    <img
                      src="/img/ic_sharp-edit.png"
                      alt="edit"
                      className="icon-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("item", item);
                        setSelectedSubAd(item);
                        setEditVisible(true);
                      }
                    }
                    />
                    <img
                      src="/img/ic_outline-delete.png"
                      alt="delete"
                      className="icon-action"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(item.id)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="select-message">
            لا توجد بيانات للإدارة الفرعية لهذا الاختيار.
          </p>
        )}
      </div>
    </div>
  );
}

export default SubAd;
