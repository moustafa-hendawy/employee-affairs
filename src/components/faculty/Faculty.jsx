    
// // Faculty.js
// import React, { useEffect, useState } from 'react';
// import { fetchFacultyData, deleteFacultyData } from '../redux/FacultyReducers';
// import { useDispatch, useSelector } from 'react-redux';
// import './Faculty.css';
// import { Dialog } from 'primereact/dialog';
// import AddFaculty from './AddFaculty';
// import Update from './Update';
// import Swal from 'sweetalert2';

// function Faculty() {
//   const faculty = useSelector(state => state.faculty);
//   const dispatch = useDispatch();

//   const [addVisible, setAddVisible] = useState(false);
//   const [editVisible, setEditVisible] = useState(false);
//   const [selectedFaculty, setSelectedFaculty] = useState(null);

//   useEffect(() => {
//     dispatch(fetchFacultyData());
//   }, [dispatch]);

//     // Delete
//   const handleDelete = (id) => {
//     Swal.fire({
//         title: "هل تريد الحذف فعلا ؟",
//         showCancelButton: true,
//         confirmButtonText: "حـذف",
//         cancelButtonText: "لا",
//         confirmButtonColor: "#d33", 
//         cancelButtonColor: "#3085d6"
//       }).then((result) => {
//          if (result.isConfirmed) {
//         //   dispatch(deleteUser({id: id}));
//         dispatch(deleteFacultyData(id));
//              dispatch(fetchFacultyData());
//         } 
//         else if (result.isDenied) {
//           Swal.fire("Changes are not saved", "", "info");
//         }
        
//       });
//     }

//   return (
//     <div className='faculty-container'>
//       <h2 className='title'>الجهات التابع لها كل موظف</h2>

//       <div className="button-and-table">
//         <button onClick={() => setAddVisible(true)} className='add-btn'>
//           <img src='/img/mingcute_add-fill.png' alt='add' />
//         </button>

//         {/* نافذة الإضافة */}
//         <Dialog className="custom-dialog" header='' visible={addVisible} onHide={() => setAddVisible(false)}>
//           <AddFaculty onClose={() => setAddVisible(false)} />
//         </Dialog>

//         {/* نافذة التعديل */}
//         <Dialog className="custom-dialog" header='' visible={editVisible} onHide={() => setEditVisible(false)}>
//           <Update data={selectedFaculty} onClose={() => setEditVisible(false)} />
//         </Dialog>

//         <table>
//           <thead>
//             <tr>
//               <th> الكود</th>
//               <th>الكلية</th>
//               <th>الإجراءات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {faculty.map((i, index) => (
//               <tr key={index}>
//                 <td>{i.code}</td>
//                 <td>{i.name}</td>
//                 <td className='center-actions'>
//                   <img
//                     onClick={() => {
//                       setSelectedFaculty(i);
//                       setEditVisible(true);
//                     }}
//                     src="/img/ic_sharp-edit.png"
//                     alt="edit"
//                     className="icon-action"
//                   />
//                   <img
//                     onClick={() => handleDelete(i.id)}
//                     src="/img/ic_outline-delete.png"
//                     alt="delete"
//                     className="icon-action"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Faculty;

// Faculty.js
import React, { useEffect, useState } from 'react';
import { fetchFacultyData, deleteFacultyData } from '../redux/FacultyReducers';
import { useDispatch, useSelector } from 'react-redux';
import './Faculty.css';
import { Dialog } from 'primereact/dialog';
import { Paginator } from 'primereact/paginator';
import AddFaculty from './AddFaculty';
import Update from './Update';
import Swal from 'sweetalert2';

function Faculty() {
  const faculty = useSelector(state => state.faculty);
  const dispatch = useDispatch();

  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    dispatch(fetchFacultyData());
  }, [dispatch]);

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
        dispatch(deleteFacultyData(id)).then(() => dispatch(fetchFacultyData()));
      }
    });
  };

  const paginatedFaculty = faculty.slice(first, first + rows);

  return (
    <div className='faculty-container'>
      <h2 className='title'>الجهات التابع لها كل موظف</h2>

      <div className="button-and-table">
        <button onClick={() => setAddVisible(true)} className='add-btn'>
          <img src='/img/mingcute_add-fill.png' alt='add' />
        </button>

        <Dialog className="custom-dialog" header='' visible={addVisible} onHide={() => setAddVisible(false)}>
          <AddFaculty onClose={() => setAddVisible(false)} />
        </Dialog>

        <Dialog className="custom-dialog" header='' visible={editVisible} onHide={() => setEditVisible(false)}>
          <Update data={selectedFaculty} onClose={() => setEditVisible(false)} />
        </Dialog>

        <table>
          <thead>
            <tr>
              <th>الكود</th>
              <th>الكلية</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFaculty.map((i, index) => (
              <tr key={index}>
                <td>{i.code}</td>
                <td>{i.name}</td>
                <td className='center-actions'>
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

        {/* Paginator */}
        {/* <Paginator
          first={first}
          rows={rows}
          totalRecords={faculty.length}
          rowsPerPageOptions={[5, 10, 20, 50]}
          onPageChange={(e) => {
            setFirst(e.first);
            setRows(e.rows);
          }}
        /> */}
      <Paginator
  first={first}
  rows={rows}
  totalRecords={faculty.length}
  rowsPerPageOptions={[5, 10, 20, 50]}
  onPageChange={(e) => {
    setFirst(e.first);
    setRows(e.rows);
  }}
  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
  className="custom-paginator"
/>
      
      
      </div>
    </div>
  );
}

export default Faculty;
