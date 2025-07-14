    
// import '../faculty/Faculty.css'
import React, { useEffect, useState } from 'react';
// import { fetchFacultyData, deleteFacultyData } from '../redux/FacultyReducers';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
// import AddFaculty from '../faculty/AddFaculty.css';
// import Update from './Update';
import Swal from 'sweetalert2';

import { deleteDegreeData, fetchDegreeData } from '../redux/FinintialDegeeReducer';
import { fetchDegreeTypeData } from '../redux/FinintialDegeeTypeReducer';
import AddFincialDegrees from './AddFincialdegrees';
import EditFincialDegrees from './EditFincialDegrees';

// import { fetchFincialDegrees } from '../../services/EmployeeService';

function FincialDegrees() {
//  const [fintialDegrees, set  ialDegrees] = useState([]);
const fincialDegrees = useSelector(state => state.fincialDegree);
const fincialTypeDegrees = useSelector(state => state.fincialDegreeType);

const dispatch = useDispatch()
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    dispatch(fetchDegreeData())
    dispatch(fetchDegreeTypeData())
  }, []);

  //   useEffect(() => {
  //   console.log("........." , fincialTypeDegrees)
  // }, [fincialTypeDegrees]);

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
        dispatch(deleteDegreeData(id));
             dispatch(fetchDegreeData());
        } 
        else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
        
      });
    }

  return (
    <div className='faculty-container'>
      <h2 className='title'>الدرجة الوظيفية</h2>

      <div className="button-and-table">
        <button onClick={() => setAddVisible(true)} className='add-btn'>
          <img src='img/mingcute_add-fill.png' alt='add' />
        </button>

        {/* نافذة الإضافة */}
        <Dialog className="custom-dialog" header='' visible={addVisible} onHide={() => setAddVisible(false)}>
          <AddFincialDegrees types={fincialTypeDegrees} onClose={() => setAddVisible(false)} />
        </Dialog>

        {/* نافذة التعديل */}
        <Dialog className="custom-dialog" header='' visible={editVisible} onHide={() => setEditVisible(false)}>
          <EditFincialDegrees types={fincialTypeDegrees} degree={selectedFaculty} onClose={() => setEditVisible(false)} />
        </Dialog>

        <table>
          <thead>
            <tr>
              <th> الكود</th>
              <th> الدرجة</th>
              <th>نوع الدرجة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {fincialDegrees.map((i, index) => (
              <tr key={index}>
                <td>{i.code}</td>
                <td>{i.name}</td>
                <td>{(fincialTypeDegrees || []).find((type) => type.id === i.fincialDegreeTypeId)?.name}</td>
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    onClick={() => {
                      setSelectedFaculty(i);
                      setEditVisible(true);
                    }}
                    src="/img/ic_sharp-edit.png"
                    alt="edit"
                    className="icon-action"
                  />
                  <img
                    onClick={() => handleDelete(i.id)}
                    src="/img/ic_outline-delete.png"
                    alt="delete"
                    className="icon-action"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FincialDegrees;
