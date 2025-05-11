import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { getFacultydata } from '../../services/EmployeeService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteFacultyData, fetchFacultyData } from '../redux/Reducers';
// import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import './faculty.scss';
import BackToMenu from '../BackToMenu';

function Faculty() {
  //  const [faculty,setFaculty] = useState([]);
   const faculty = useSelector(state => state.faculty)
   console.log(faculty);
    const dispatch = useDispatch();

  useEffect(() => {
    // getFacultydata().then(data => {
    //   setFaculty(data)
    //   console.log(data);
    // });
    dispatch(fetchFacultyData())
  }, []);

  // Delete
  const handleDelete = (id) => {
    Swal.fire({
        title: "هل تريد الحذف فعلا ؟",
        showCancelButton: true,
        confirmButtonText: "حـذف",
        confirmButtonColor: "#d33", // أحمر
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
let icons = (i) => {
  return(
    <div className='' style={{display: 'flex', gap: '10px'}}>
   <Link className=''style={{color: '#1976d2', cursor: 'pointer' }} to={`/faculty/update/${i.id}`}>{<EditIcon />}</Link>
   <button style={{background: 'none',color: 'red', border: 'none' }} onClick={() => handleDelete(i.id)}>{<DeleteIcon />}</button> 
    </div>
  )
}

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Facult ##</h1>
      <BackToMenu />
    <DataTable className='dataTable' value={faculty} tableStyle={{ minWidth: '50rem'}} style={{paddingRight: '20px'}}>
        <Column field="id" header="Id"></Column>
        <Column field="name" header="الإســـــم" style={{width: '500px'}}></Column>
        <Column field="code" header="الكود"></Column>
        <Column body={icons} header="التعديل والحذف"/>
    </DataTable>
</div>
  )
}

export default Faculty
