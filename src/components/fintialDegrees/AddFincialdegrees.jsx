
// // import React, { useState } from 'react'
// // import { useDispatch, useSelector } from 'react-redux';
// // import { addFacultyData } from '../redux/Reducers';

// // function AddFaculty() {
// //     const [name, setName] = useState('');
// //   const [code, setCode] = useState('');
// //      const faculty = useSelector(state => state.faculty);
// //      console.log(faculty);
// //      const dispatch = useDispatch();
// //   const router = useRouter()
// //   const [loading, setLoading] = useState(false);

// //     const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewEmployee({ ...newEmployee, [name]: value });
// //   };

// // //     const handleSubmit = () => {
// // //     console.log('✅ تم إضافة الموظف:', newEmployee);
// // //     // e.preventDefault();
// // //     setLoading(true);
// // //     setVisible(false);       // نخفي الفورم بعد الإرسال
// // //     dispatch(addFacultyData({
// // //     id: (+faculty[faculty.length-1].id + 1),
// // //      name: name,
// // //      code: code
// // //    }));
// // //   };

// // const handleSubmit = () => {
// //   dispatch(addFacultyData({
// //     id: (+faculty[faculty.length - 1]?.id + 1 || 1),
// //     name,
// //     code
// //   }));
// //   setName('');
// //   setCode('');
// //   setLoading(false);
// //   onClose(); // تغلق النافذة بعد الإرسال
// // };

// // // const formSubmit = async (e) => {
// // //   e.preventDefault();
// // //   setLoading(true);
// // //    dispatch(addFacultyData({
// // //     id: (+faculty[faculty.length-1].id + 1),
// // //      name: name,
// // //      code: code
// // //    }));
// // //   onClose();
// // // }

// //   return (
// //         <Form>
// //             {loading && (
// //             <LoadingDemo />
// //         )}

// //         <Form.Group className="mb-3" controlId="formBasicEmail">
// //         <Form.Label>الإسم</Form.Label>
// //         <Form.Control type="text" placeholder="أدحل الإسم" value={name} onChange={(e) => setName(e.target.value)} />
// //         </Form.Group>

// //         <Form.Group className="mb-3" controlId="formBasicPassword">
// //         <Form.Label>الكود</Form.Label>
// //         <Form.Control type="number" placeholder="أدخل الكود" value={code} onChange={(e) => setName(e.target.value)} />
// //         </Form.Group>
// //          <Button label="إرسال" icon="pi pi-check" onClick={handleSubmit} className="mt-3" />
// //         {/* <Button label="إضافة" severity="success" className="p-button-warning" type='submit' /> */}
// //         </Form>
// //   )
// // }

// // export default AddFaculty


// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addFacultyData } from '../redux/Reducers';
// import { Form } from 'react-bootstrap';
// import { Button } from 'primereact/button';
// import './AddFaculty.css';

// function AddFaculty({ onClose }) {
//   const [name, setName] = useState('');
//   const [code, setCode] = useState('');
//   const faculty = useSelector(state => state.faculty);
//   const dispatch = useDispatch();

//   const handleSubmit = () => {
//     dispatch(addFacultyData({
//       id: (+faculty[faculty.length - 1]?.id + 1 || 1),
//       name,
//       code
//     }));
//     setName('');
//     setCode('');
//     onClose();
//   };

//   return (
    
//     <Form className='form-container'>
//       <Form.Group className="mb-3">
//         <Form.Label style={{marginBottom: '10px',marginRight: '15px', padding: '15px'}}>الإســــــــم</Form.Label>
//         <Form.Control type="text" placeholder="أدخل الإسم" value={name} onChange={(e) => setName(e.target.value)} />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label style={{marginBottom: '10px',marginRight: '15px', padding: '15px'}}>الكــــــود</Form.Label>
//         <Form.Control type="number" placeholder="أدخل الكود" value={code} onChange={(e) => setCode(e.target.value)}  />
//       </Form.Group>

//       <Button label="إرسال" icon="pi pi-check" onClick={handleSubmit} className="mt-3" style={{backgroundColor: 'red', border: 'none', height: '40px', borderRadius: '5px'}}/>
//     </Form>
//   )
// }

// export default AddFaculty;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFacultyData } from '../redux/FacultyReducers';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import '../faculty/AddFaculty.css';
import { addDegreeData } from '../redux/FinintialDegeeReducer';


function AddFintialDegrees({ onClose , types}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [fincialDegreeTypeId, setFincialDegreeTypeId] = useState("");
  const fintialDegree = useSelector(state => state.finintialDegree);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
        e.preventDefault();

    dispatch(addDegreeData({
    //   id: (+faculty[faculty.length - 1]?.id + 1 || 1),
      name,
      code,
      fincialDegreeTypeId
    }));
    setName('');
    setCode('');
    setFincialDegreeTypeId();
    onClose(); // غلق النافذة
  };

  return (
    <div className="dialog-overlay">
      <Form className="form-container">
        <span className="close-button" onClick={onClose}>×</span>

        <Form.Group className="mb-3">
          <Form.Label className="label">الكود  </Form.Label>
          <Form.Control
            type="number"
            placeholder="الكود "
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">الدرجة</Form.Label>
          <Form.Control
            type="text"
            placeholder="الدرجة "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label className="label"> نوع الدرجة</Form.Label>
          <Form.Control
            type="text"
            placeholder="الدرجة "
            value={name}
            onChange={(e) => setFincialDegreeTypeId(e.target.value)}
          />
        </Form.Group> */}

              <Form.Group className="mb-3">
                      <Form.Label className="label">حالة الإدارة العامة</Form.Label>
                      <Form.Select
                        value={fincialDegreeTypeId}
                        onChange={(e) => setFincialDegreeTypeId(e.target.value)}>
                         <option disabled value=''>اختر الدرجة</option>

                          {
                            types.map((type) => (
                                <option value={type.id}>{type.name}</option>

                            ))
                          }
                      </Form.Select>
                    </Form.Group>
            


        <Button
          label="إرسال"
          icon="pi pi-check"
          onClick={handleSubmit}
          className="mt-3"
          style={{
            backgroundColor: '#176D6A',
            border: 'none',
            height: '45px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            width: '100%',
            color: '#eee'
          }}
        />
      </Form>
</div>
  );
}

export default AddFintialDegrees;