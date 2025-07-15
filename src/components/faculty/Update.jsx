// // // // import { InputText } from 'primereact/inputtext';
// // // // import React, { useState } from 'react'
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { useNavigate, useParams } from 'react-router-dom'
// // // // import { editFacultyData, updateFaculty } from '../redux/Reducers';
// // // // import { Dialog } from 'primereact/dialog';

// // // // function Update() {
// // // //     const {id} = useParams();
// // // //     console.log({id});
// // // //     const faculty = useSelector(state => state.faculty);
// // // //     console.log(faculty);
// // // //     const dispatch = useDispatch();
// // // //     const existingFaculty = faculty.filter((i) => i.id == id);
// // // //     console.log(existingFaculty);
// // // //     const {name, code} = existingFaculty[0];
// // // //     const [uname, setUname] = useState(name);
// // // //     const [ucode, setUcode] = useState(code);
// // // //     const navigate = useNavigate();
// // // //     const [visible, setVisible] = useState(false);
// // // //     const [formData, setFormData] = useState({
// // // //       name: '',
// // // //       code: ''
// // // //     });

// // // //     const handleSubmit = (e) => {
// // // //       e.preventDefault();
// // // //       dispatch(editFacultyData({ 
// // // //       id: id,
// // // //         updateFaculty: {
// // // //           code: ucode,
// // // //           name: uname
// // // //         }
// // // //       })
// // // //       )
// // // //      setVisible(false);
// // // //     }
// // // //   return (
// // // //       <Dialog header="أدخل البيانات" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
// // // //          <div>
// // // //      <h1 className='text-center mt-20'>Update # {id}</h1>
// // // //      <div className='d-flex justify-content-center align-items-center vh-100 '>
// // // //    <div className='border p-3'>
// // // //    <h2>تعديل الكلية والكود</h2>
// // // //        <div className="flex flex-wrap align-items-center mb-3 gap-2">
// // // //        <label htmlFor="username" className="p-hidden-accessible">الكلية</label>
// // // //        <InputText id="username" placeholder="الكلية" className="p-invalid mr-2" value={uname} onChange={e => setUname(e.target.value)}/>
      
// // // //    </div>
// // // //    <div className="flex flex-wrap align-items-center gap-2 my-3">
// // // //        <label htmlFor="email" className="p-hidden-accessible">الكود</label>
// // // //        <InputText placeholder="الكود" className="p-invalid mr-2" value={ucode} onChange={e => setUcode(e.target.value)}/>
   
// // // //    </div>
// // // //    <button className='btn btn-primary' onClick={handleSubmit}>تحـديث</button>
// // // //    </div>
// // // //     </div>

// // // //     </div>
// // // //       </Dialog>
// // // //   )
// // // // }

// // // // export default Update



// // // import './AddFaculty.css';
// // // import { InputText } from 'primereact/inputtext';
// // // import React, { useState } from 'react'
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { useNavigate, useParams } from 'react-router-dom'
// // // import { editFacultyData, updateFaculty } from '../redux/FacultyReducers';

// // // function Update() {
// // //     const {id} = useParams();
// // //     console.log({id});
// // //     const faculty = useSelector(state => state.faculty);
// // //     console.log(faculty);
// // //     const dispatch = useDispatch();
// // //     const existingFaculty = faculty.filter((i) => i.id == id);
// // //     console.log(existingFaculty);
// // //     const {name, code} = existingFaculty[0];
// // //     const [uname, setUname] = useState(name);
// // //     const [ucode, setUcode] = useState(code);
// // //     const navigate = useNavigate();
// // //     // const [visible, setVisible] = useState(false);
// // //     const [formData, setFormData] = useState({
// // //       name: '',
// // //       code: ''
// // //     });

// // //     const handleSubmit = (e) => {
// // //       e.preventDefault();
// // //       dispatch(editFacultyData({ 
// // //       id: id,
// // //         updateFaculty: {
// // //           code: ucode,
// // //           name: uname
// // //         }
// // //       })
// // //       )
// // //      setVisible(false);
// // //     }
// // //   return (
// // //     <div className="dialog-overlay">
// // //       <Form className="form-container">
// // //         <span className="close-button" onClick={onClose}>×</span>

// // //         <Form.Group className="mb-3">
// // //           <Form.Label className="label">الإســــــــم</Form.Label>
// // //           <Form.Control
// // //             type="text"
// // //             placeholder="أدخل الإسم"
// // //             value={name}
// // //             onChange={(e) => setName(e.target.value)}
// // //           />
// // //         </Form.Group>

// // //         <Form.Group className="mb-3">
// // //           <Form.Label className="label">الكــــــود</Form.Label>
// // //           <Form.Control
// // //             type="number"
// // //             placeholder="أدخل الكود"
// // //             value={code}
// // //             onChange={(e) => setCode(e.target.value)}
// // //           />
// // //         </Form.Group>

// // //         <Button
// // //           label="إرسال"
// // //           icon="pi pi-check"
// // //           onClick={handleSubmit}
// // //           className="mt-3"
// // //           style={{
// // //             backgroundColor: '#176D6A',
// // //             border: 'none',
// // //             height: '45px',
// // //             borderRadius: '8px',
// // //             fontWeight: 'bold',
// // //             fontSize: '16px',
// // //             width: '100%'
// // //           }}
// // //         />
// // //       </Form>
// // // </div>
// // //   );
// // // }

// // // export default Update;

// // import React, { useState, useEffect } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { editFacultyData } from '../redux/FacultyReducers';
// // import { Form } from 'react-bootstrap';
// // import { Button } from 'primereact/button';
// // import './AddFaculty.css';

// // function Update({ data, onClose }) {
// //   const dispatch = useDispatch();
// //   const [name, setName] = useState('');
// //   const [code, setCode] = useState('');

// //   useEffect(() => {
// //     if (data) {
// //       setName(data.name);
// //       setCode(data.code);
// //     }
// //   }, [data]);

// //   const handleSubmit = () => {
// //     dispatch(editFacultyData({
// //       id: data.id,
// //       updateFaculty: { name, code }
// //     }));
// //     onClose();
// //   };

// //   return (
// //     <div className="dialog-overlay">
// //       <Form className="form-container">
// //         <span className="close-button" onClick={onClose}>×</span>

// //         <Form.Group className="mb-3">
// //           <Form.Label className="label">الإســــــــم</Form.Label>
// //           <Form.Control
// //             type="text"
// //             placeholder="أدخل الإسم"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3">
// //           <Form.Label className="label">الكــــــود</Form.Label>
// //           <Form.Control
// //             type="number"
// //             placeholder="أدخل الكود"
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //           />
// //         </Form.Group>

// //         <Button
// //           label="تحـديث"
// //           icon="pi pi-check"
// //           onClick={handleSubmit}
// //           className="mt-3"
// //           style={{
// //             backgroundColor: '#176D6A',
// //             border: 'none',
// //             height: '45px',
// //             borderRadius: '8px',
// //             fontWeight: 'bold',
// //             fontSize: '16px',
// //             width: '100%',
// //             color: '#eee'

// //           }}
// //         />
// //       </Form>
// //     </div>
// //   );
// // }

// // export default Update;

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { editFacultyData, fetchFacultyData } from '../redux/FacultyReducers';
// import { Form } from 'react-bootstrap';
// import { Button } from 'primereact/button';
// import './AddFaculty.css';

// function Update({ data, onClose }) {
//   const dispatch = useDispatch();
//   const [name, setName] = useState('');
//   const [code, setCode] = useState('');

//   useEffect(() => {
//     if (data) {
//       setName(data.name || '');
//       setCode(data.code || '');
//     }
//   }, [data]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(editFacultyData({
//       id: data.id,
//       updateFaculty: { name, code }
//     }));

//     onClose(); // غلق النافذة بعد التعديل
//     dispatch(fetchFacultyData())
//   };

//   return (
//     <div className="dialog-overlay">
//       <Form className="form-container" onSubmit={handleSubmit}>
//         <span className="close-button" onClick={onClose}>×</span>

//         <Form.Group className="mb-3">
//           <Form.Label className="label">الإســــــــم</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="أدخل الإسم"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label className="label">الكــــــود</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="أدخل الكود"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Button
//           label="تحـديث"
//           icon="pi pi-check"
//           type="submit"
//           className="mt-3"
//           style={{
//             backgroundColor: '#176D6A',
//             border: 'none',
//             height: '45px',
//             borderRadius: '8px',
//             fontWeight: 'bold',
//             fontSize: '16px',
//             width: '100%',
//             color: '#eee'
//           }}
//         />
//       </Form>
//     </div>
//   );
// }

// export default Update;


import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editFacultyData, fetchFacultyData } from '../redux/FacultyReducers';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import './AddFaculty.css';

function Update({ data, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setCode(data.code || '');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(editFacultyData({
      id: data.id,
      updateFaculty: { name, code }
    }));

    await dispatch(fetchFacultyData()); 
    onClose(); 
  };

  return (
    <div className="dialog-overlay">
      <Form className="form-container" onSubmit={handleSubmit}>
        <span className="close-button" onClick={onClose}>×</span>

        <Form.Group className="mb-3">
          <Form.Label className="label">الإســــــــم</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل الإسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">الكــــــود</Form.Label>
          <Form.Control
            type="number"
            placeholder="أدخل الكود"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          label="تحـديث"
          icon="pi pi-check"
          type="submit"
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

export default Update;
