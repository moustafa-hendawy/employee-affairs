import { InputText } from 'primereact/inputtext';
import React from 'react'
import { useParams } from 'react-router-dom'

function Update() {
    const {id} = useParams();
  return (
    <div>
      

     <h1 className='text-center mt-20'>Update # {id}</h1>
     <div className='d-flex justify-content-center align-items-center vh-100 '>
   <div className='border p-3'>
   <h2>تعديل الكلية والكود</h2>
       <div className="flex flex-wrap align-items-center mb-3 gap-2">
       <label htmlFor="username" className="p-hidden-accessible">الكلية</label>
       <InputText id="username" placeholder="الكلية" className="p-invalid mr-2"/>
      
   </div>
   <div className="flex flex-wrap align-items-center gap-2 my-3">
       <label htmlFor="email" className="p-hidden-accessible">الكود</label>
       <InputText id="email" placeholder="الكود" className="p-invalid mr-2"/>
   
   </div>
   <button className='btn btn-primary'>Update</button>
   </div>
    </div>

    </div>
  )
}

export default Update
