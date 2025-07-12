    
import './faculty/Faculty.css'
import React, { useEffect, useState } from 'react';
// import { fetchFacultyData, deleteFacultyData } from '../redux/FacultyReducers';
import { useDispatch, useSelector } from 'react-redux';
import './faculty/Faculty.css';
// import { Dialog } from 'primereact/dialog';
// import AddFaculty from './AddFaculty';
// import Update from './Update';
import Swal from 'sweetalert2';
import { fetchFincialDegrees } from '../services/EmployeeService';

function FincialDegrees() {
 const [fintialDegrees, setFintialDegrees] = useState([]);

  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    fetchFincialDegrees().then((data) => setFintialDegrees(data))
  }, []);

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
        dispatch(deleteFacultyData(id));
             dispatch(fetchFacultyData());
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
        {/* <Dialog className="custom-dialog" header='' visible={addVisible} onHide={() => setAddVisible(false)}>
          <AddFaculty onClose={() => setAddVisible(false)} />
        </Dialog> */}

        {/* نافذة التعديل */}
        {/* <Dialog className="custom-dialog" header='' visible={editVisible} onHide={() => setEditVisible(false)}>
          <Update data={selectedFaculty} onClose={() => setEditVisible(false)} />
        </Dialog> */}

        <table>
          <thead>
            <tr>
              <th> الكود</th>
              <th> الدرجة</th>
              <th>رقم الدرجة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {fintialDegrees.map((i, index) => (
              <tr key={index}>
                <td>{i.code}</td>
                <td>{i.name}</td>
                <td>{i.fincialDegreeTypeId}</td>
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
