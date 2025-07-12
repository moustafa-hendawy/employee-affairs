
import React, { useEffect, useState } from 'react';
// import { fetchSectorData, deleteSectorData } from '../redux/SectorReducers';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
// import AddSectors from './AddSectors';
// import EditSectors from './EditSectors';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { fetchEducationalLevel } from '../services/EmployeeService';


function EducationalLevel() {
//   const sectors = useSelector(state => state.sectors);
const [education, setEducation] = useState([]);
  const dispatch = useDispatch();
const navigate = useNavigate();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    // dispatch(fetchSectorData());
fetchEducationalLevel().then((data) => setEducation(data))
  }, []);

  // Delete
//   const handleDelete = (id) => {
//     Swal.fire({
//       showCancelButton: true,
//       confirmButtonText: "حذف",
//       cancelButtonText: "لا",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteSectorData(id));
//         dispatch(fetchSectorData());
//       }
//     });
//   };



  return (
       <div className='faculty-container'>
              <h2 className='title'>  المؤهل العلمي  </h2>
     <div className="button-and-table">
       
      <button onClick={() => setAddVisible(true)} className='add-btn'>
        <img src='/img/mingcute_add-fill.png' alt='add' />
      </button>
   {/* نافذة الإضافة */}
        <Dialog className="custom-dialog" header='' visible={addVisible} onHide={() => setAddVisible(false)}>
          {/* <AddSectors onClose={() => setAddVisible(false)} /> */}
        </Dialog>

        {/* نافذة التعديل */}
        <Dialog className="custom-dialog" header='' visible={editVisible} onHide={() => setEditVisible(false)}>
          {/* <EditSectors data={selectedFaculty} onClose={() => setEditVisible(false)} /> */}
        </Dialog>

      <table>
        <thead>
          <tr>
            <th>  كود المستوى العلمي </th>
            <th>   المستوى العلمي  </th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {education.map((i, index) => (
            <tr key={index} onClick={() => navigate(`/educational-level/${i.id}/certificate`) } style={{cursor: 'pointer'}}>
              <td>{i.sortId}</td>
              <td>{i.name}</td>
              <td style={{display: 'flex', justifyContent: 'center'}}>
                <img
                      onClick={(e) => {
                    //   setSelectedFaculty(i);
                    //   setEditVisible(true);
                      e.stopPropagation();
                    }}
                  src="/img/ic_sharp-edit.png"
                  alt="edit"
                  className="icon-action"
                />
                <img
                  onClick={(e) => {
                    // handleDelete(i.id);
                    e.stopPropagation();
                  }}
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

  )
}

export default EducationalLevel
