import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { editFacultyData, updateFaculty } from '../redux/Reducers';

function Update() {
    const {id} = useParams();
    const faculty = useSelector(state => state.faculty);
    console.log(faculty);
    const dispatch = useDispatch();
    const existingFaculty = faculty.filter((i) => i.id == id);
    console.log(existingFaculty)
    const {name, code} = existingFaculty[0];
    const [uname, setUname] = useState(name);
    const [ucode, setUcode] = useState(code);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(editFacultyData({ 
      id: id,
        updateFaculty: {
          code: ucode,
          name: uname
        }
      })
      )
      navigate('/faculty');
    }
  return (
    <div>
      

     <h1 className='text-center mt-20'>Update # {id}</h1>
     <div className='d-flex justify-content-center align-items-center vh-100 '>
   <div className='border p-3'>
   <h2>تعديل الكلية والكود</h2>
       <div className="flex flex-wrap align-items-center mb-3 gap-2">
       <label htmlFor="username" className="p-hidden-accessible">الكلية</label>
       <InputText id="username" placeholder="الكلية" className="p-invalid mr-2" value={uname} onChange={e => setUname(e.target.value)}/>
      
   </div>
   <div className="flex flex-wrap align-items-center gap-2 my-3">
       <label htmlFor="email" className="p-hidden-accessible">الكود</label>
       <InputText placeholder="الكود" className="p-invalid mr-2" value={ucode} onChange={e => setUcode(e.target.value)}/>
   
   </div>
   <button className='btn btn-primary' onClick={handleSubmit}>تحـديث</button>
   </div>
    </div>

    </div>
  )
}

export default Update
