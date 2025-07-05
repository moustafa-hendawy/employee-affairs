// // import React, { useEffect, useState } from 'react'
// // import { DataTable } from 'primereact/datatable';
// // import { Column } from 'primereact/column';
// // // import { getFacultydata } from '../../services/EmployeeService';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Link } from 'react-router-dom';
// // import { deleteFacultyData, fetchFacultyData } from '../redux/Reducers';
// // // import { useSelector } from 'react-redux';
// // import Swal from 'sweetalert2'
// // import './Faculty.css';
// // import BackToMenu from '../BackToMenu';
// // import { Dialog } from 'primereact/dialog';
// // import { Button } from 'primereact/button';
// // import AddFaculty from './AddFaculty';

// // function Faculty() {
// //   // const [addVisible, setAddVisible] = useState(false);
// //    const faculty = useSelector(state => state.faculty)
// //    console.log(faculty);
// //     const dispatch = useDispatch();
// //  const [visible, setVisible] = useState(false); // عشان نظهر ونخفي الفورم
// //   const [newEmployee, setNewEmployee] = useState({
// //     name: '',
// //     email: ''
// //   });

// //   useEffect(() => {
// //     // getFacultydata().then(data => {
// //     //   setFaculty(data)
// //     //   console.log(data);
// //     // });
// //     dispatch(fetchFacultyData())
// //   }, []);

// //   // Delete
// //   const handleDelete = (id) => {
// //     Swal.fire({
// //         title: "هل تريد الحذف فعلا ؟",
// //         showCancelButton: true,
// //         confirmButtonText: "حـذف",
// //         confirmButtonColor: "#d33", // أحمر
// //         cancelButtonColor: "#3085d6"
// //       }).then((result) => {
// //          if (result.isConfirmed) {
// //         //   dispatch(deleteUser({id: id}));
// //         dispatch(deleteFacultyData(id));
// //              dispatch(fetchFacultyData());
// //         } 
// //         else if (result.isDenied) {
// //           Swal.fire("Changes are not saved", "", "info");
// //         }
        
// //       });
    
// // }

// // //    const notifyAdd = (e, product: { order: number; }) => {
// // //    showMessage(e, toastTopRight, 'success')
// // //    // toast.current.show({severity:'success', 
// // //    //   summary: 'Success', detail:'Message Content', life: 3000})
// // //      setAddVisible(false);
// // //      product.order = products.length + 1;
// // //      /* @ts-ignore*/
// // //      setProducts([...products, product])
// // //  }


// // let icons = (i) => {
// //   return(
// //     <div className='' style={{display: 'flex', gap: '10px'}}>
// //    <Link className=''style={{color: '#1976d2', cursor: 'pointer' }} to={`/faculty/update/${i.id}`}>{<EditIcon />}</Link>
// //    <button style={{background: 'none',color: 'red', border: 'none' }} onClick={() => handleDelete(i.id)}>{<DeleteIcon />}</button> 
// //     </div>
// //   )
// // }


// //   return (
// //     <div>
// //       <BackToMenu />
// //       <button className='add-btn' onClick={() => setVisible(true)}>إضافة كلية</button>      {/*  اول تصحيح */}

// //         <Dialog header="إضافة موظف جديد" style={{ width: '50vw', borderRadius: '15px' }} visible={visible} onHide={() => setVisible(false)}>
// //                     <AddFaculty onClose={() => setVisible(false)} />
// //                   </Dialog>
// // {/* header={notifyAdd} */}
// //     <DataTable className='dataTable' value={faculty} tableStyle={{ minWidth: '50rem'}} style={{paddingRight: '20px'}}>
// //         <Column field="id" header="Id"></Column>
// //         <Column field="name" header="الإســـــم" style={{width: '500px'}}></Column>
// //         <Column field="code" header="الكود"></Column>
// //         <Column body={icons} header="التعديل والحذف"/>
// //     </DataTable>
// // </div>
// //   )
// // }

// // export default Faculty

// import React, { useEffect, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { deleteFacultyData, fetchFacultyData } from '../redux/Reducers';
// import Swal from 'sweetalert2';
// import './Faculty.css';
// import BackToMenu from '../BackToMenu';
// import { Dialog } from 'primereact/dialog';
// import AddFaculty from './AddFaculty';

// function Faculty() {
//   const faculty = useSelector(state => state.faculty);
//   const dispatch = useDispatch();
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     dispatch(fetchFacultyData());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "هل تريد الحذف فعلا ؟",
//       showCancelButton: true,
//       confirmButtonText: "حـذف",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteFacultyData(id));
//         dispatch(fetchFacultyData());
//       }
//     });
//   };

//   const icons = (i) => (
//     <div className='icon-container'>
//       <Button onClick={() => setVisible(true)}><EditIcon /></Button>
//       <button onClick={() => handleDelete(i.id)}><DeleteIcon /></button>
//     </div>
//   );

//   return (
//     <div className="faculty-page">
//       <h2 className="page-title">إدارة الكليات</h2>

//       <div className="action-bar">
//         <BackToMenu className='back-faculty' style={{position: 'relative',left: '-65px'}}/>
//         <button className='add-btn' onClick={() => setVisible(true)}>+ إضــــــافــــــة </button>
//       </div>

//       <Dialog className="custom-dialog" header="إضافــة" style={{ width: '50vw', borderRadius: '15px' }} visible={visible} onHide={() => setVisible(false)}>
//         <AddFaculty onClose={() => setVisible(false)} />
//       </Dialog>

//       <DataTable className='dataTable' value={faculty} tableStyle={{ minWidth: '50rem' }}>
//         <Column field="id" header="Id"></Column>
//         <Column field="name" header="الاسم" style={{ width: '400px' }}></Column>
//         <Column field="code" header="الكود"></Column>
//         <Column body={icons} header="الإجـــراءات" />
//       </DataTable>
//     </div>
//   );
// }

// export default Faculty;


// import React, { useEffect, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteFacultyData, editFacultyData, fetchFacultyData } from '../redux/Reducers';
// import Swal from 'sweetalert2';
// import './Faculty.css';
// import BackToMenu from '../BackToMenu';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import AddFaculty from './AddFaculty';

// function Faculty() {
//   const faculty = useSelector(state => state.faculty);
//   const dispatch = useDispatch();

//   const [addVisible, setAddVisible] = useState(false);
//   const [editVisible, setEditVisible] = useState(false);

//   const [selectedFaculty, setSelectedFaculty] = useState(null);
//   const [editName, setEditName] = useState('');
//   const [editCode, setEditCode] = useState('');

//   useEffect(() => {
//     dispatch(fetchFacultyData());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "هل تريد الحذف فعلا ؟",
//       showCancelButton: true,
//       confirmButtonText: "حـذف",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteFacultyData(id));
//         dispatch(fetchFacultyData());
//       }
//     });
//   };

//   const handleEdit = (rowData) => {
//     setSelectedFaculty(rowData);
//     setEditName(rowData.name);
//     setEditCode(rowData.code);
//     setEditVisible(true);
//   };

//   const handleUpdate = () => {
//     dispatch(editFacultyData({
//       id: selectedFaculty.id,
//       updateFaculty: {
//         name: editName,
//         code: editCode
//       }
//     }));
//     setEditVisible(false);
//     dispatch(fetchFacultyData()); // لتحديث الجدول بعد التعديل
//   };

//   const icons = (rowData) => (
//     <div className='icon-container' style={{ display: 'flex', gap: '10px' }}>
//       <button onClick={() => handleEdit(rowData)} style={{ background: 'none', border: 'none', color: '#1976d2' }}>
//         <EditIcon />
//       </button>
//       <button onClick={() => handleDelete(rowData.id)} style={{ background: 'none', border: 'none', color: 'red' }}>
//         <DeleteIcon />
//       </button>
//     </div>
//   );

  // return (
    // <div className="faculty-page">
    //   <h2 className="page-title">إدارة الكليات</h2>

      {/* <div className="action-bar">
        <BackToMenu className='back-faculty' style={{ position: 'relative', left: '-65px' }} />
        <button className='add-btn' onClick={() => setAddVisible(true)}>+ إضــــــافــــــة </button>
      </div> */}

      {/* Dialog الإضافة */}
      {/* <Dialog className="custom-dialog" header="إضافــة كلية" style={{ width: '50vw', borderRadius: '15px' }} visible={addVisible} onHide={() => setAddVisible(false)}>
        <AddFaculty onClose={() => setAddVisible(false)} />
      </Dialog> */}

      {/* Dialog التعديل */}
      {/* <Dialog className='edit-dialog' header="تعديل بيانات الكلية" visible={editVisible} style={{ width: '30vw' }} onHide={() => setEditVisible(false)}>
        <div className='p-fluid'>
          <div className="field">
            <label htmlFor="name">الاسم</label>
            <InputText id="name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </div>
          <div className="field mt-3">
            <label htmlFor="code">الكود</label>
            <InputText id="code" value={editCode} onChange={(e) => setEditCode(e.target.value)} />
          </div>
          <button className='btn btn-primary mt-3' onClick={handleUpdate}>تحـديث</button>
        </div>
      </Dialog> */}

      {/* جدول الكليات */}
      {/* <DataTable className='dataTable' value={faculty} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id" />
        <Column field="name" header="الاسم" style={{ width: '400px' }} />
        <Column field="code" header="الكود" />
        <Column body={icons} header="الإجـــراءات" />
      </DataTable> */}
    // </div>




//   );
// }

// export default Faculty;



// import React, { useEffect } from 'react'
// import { fetchFacultyData } from '../redux/Reducers';
// import { useDispatch, useSelector } from 'react-redux';
// import { Table } from 'react-bootstrap';

// function Faculty() {
//     const faculty = useSelector(state => state.faculty);
//   const dispatch = useDispatch();

//     useEffect(() => {
//     dispatch(fetchFacultyData());
//   }, [dispatch]);
//   return (
//     <div className='faculty'>
//         <h1>الجهات التابع لها كل موظف</h1>
//         <button><img src='img\mingcute_add-fill.png'/></button>
//         <Table>
          
//             <tr>
//                   <th>الرقم الأكاديمي</th>
//                   <th> الكلية</th>
//                   <th> الاجراءات</th>
//             </tr>
//             <tr>
//               { faculty.map((i) => (  
//                <>
//                 <td>{i.code}</td>
//                 <td>{i.name}</td>
//                 <td><img src="img\ic_sharp-edit.png" alt="" /> <img src="img\ic_outline-delete.png" alt="" /></td>
//                </>
//               ))}
//             </tr>
//         </Table>
//     </div>
//   )
// }

// export default Faculty


import React, { useEffect, useState } from 'react';
import { fetchFacultyData } from '../redux/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import './Faculty.css';
// import { Dialog } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import AddFaculty from './AddFaculty';


function Faculty() {
  const faculty = useSelector(state => state.faculty);
  const dispatch = useDispatch();
    const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchFacultyData());
  }, [dispatch]);

  return (
    <div className='faculty-container'>
              <h2 className='title'>الجهات التابع لها كل موظف</h2>
     <div className="button-and-table">
       <button onClick={() => setAddVisible(true)} className='add-btn'> <img src='img/mingcute_add-fill.png' alt='add' /></button>

        {/* Dialog الإضافة */}
     <Dialog className="custom-dialog" header='Add' 
  visible={addVisible} onHide={() => setAddVisible(false)}>
        <AddFaculty onClose={() => setAddVisible(false)} />
      </Dialog> 

   {/* <Dialog></Dialog> */}
     

      <table>
        <thead>
          <tr>
            <th>الرقم الأكاديمي</th>
            <th>الكلية</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((i, index) => (
            <tr key={index}>
              <td>{i.code}</td>
              <td>{i.name}</td>
              <td>
                <img
                  src="img/ic_sharp-edit.png"
                  alt="edit"
                  className="icon-action"
                />
                <img
                  src="img/ic_outline-delete.png"
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

export default Faculty;
