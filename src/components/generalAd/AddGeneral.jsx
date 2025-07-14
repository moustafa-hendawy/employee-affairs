
// // // // import React, { useState } from 'react'
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import { addFacultyData } from '../redux/Reducers';

// // // // function AddFaculty() {
// // // //     const [name, setName] = useState('');
// // // //   const [code, setCode] = useState('');
// // // //      const faculty = useSelector(state => state.faculty);
// // // //      console.log(faculty);
// // // //      const dispatch = useDispatch();
// // // //   const router = useRouter()
// // // //   const [loading, setLoading] = useState(false);

// // // //     const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setNewEmployee({ ...newEmployee, [name]: value });
// // // //   };

// // // // //     const handleSubmit = () => {
// // // // //     console.log('✅ تم إضافة الموظف:', newEmployee);
// // // // //     // e.preventDefault();
// // // // //     setLoading(true);
// // // // //     setVisible(false);       // نخفي الفورم بعد الإرسال
// // // // //     dispatch(addFacultyData({
// // // // //     id: (+faculty[faculty.length-1].id + 1),
// // // // //      name: name,
// // // // //      code: code
// // // // //    }));
// // // // //   };

// // // // const handleSubmit = () => {
// // // //   dispatch(addFacultyData({
// // // //     id: (+faculty[faculty.length - 1]?.id + 1 || 1),
// // // //     name,
// // // //     code
// // // //   }));
// // // //   setName('');
// // // //   setCode('');
// // // //   setLoading(false);
// // // //   onClose(); // تغلق النافذة بعد الإرسال
// // // // };

// // // // // const formSubmit = async (e) => {
// // // // //   e.preventDefault();
// // // // //   setLoading(true);
// // // // //    dispatch(addFacultyData({
// // // // //     id: (+faculty[faculty.length-1].id + 1),
// // // // //      name: name,
// // // // //      code: code
// // // // //    }));
// // // // //   onClose();
// // // // // }

// // // //   return (
// // // //         <Form>
// // // //             {loading && (
// // // //             <LoadingDemo />
// // // //         )}

// // // //         <Form.Group className="mb-3" controlId="formBasicEmail">
// // // //         <Form.Label>الإسم</Form.Label>
// // // //         <Form.Control type="text" placeholder="أدحل الإسم" value={name} onChange={(e) => setName(e.target.value)} />
// // // //         </Form.Group>

// // // //         <Form.Group className="mb-3" controlId="formBasicPassword">
// // // //         <Form.Label>الكود</Form.Label>
// // // //         <Form.Control type="number" placeholder="أدخل الكود" value={code} onChange={(e) => setName(e.target.value)} />
// // // //         </Form.Group>
// // // //          <Button label="إرسال" icon="pi pi-check" onClick={handleSubmit} className="mt-3" />
// // // //         {/* <Button label="إضافة" severity="success" className="p-button-warning" type='submit' /> */}
// // // //         </Form>
// // // //   )
// // // // }

// // // // export default AddFaculty


// // // import React, { useState } from 'react'
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { addFacultyData } from '../redux/Reducers';
// // // import { Form } from 'react-bootstrap';
// // // import { Button } from 'primereact/button';
// // // import './AddFaculty.css';

// // // function AddFaculty({ onClose }) {
// // //   const [name, setName] = useState('');
// // //   const [code, setCode] = useState('');
// // //   const faculty = useSelector(state => state.faculty);
// // //   const dispatch = useDispatch();

// // //   const handleSubmit = () => {
// // //     dispatch(addFacultyData({
// // //       id: (+faculty[faculty.length - 1]?.id + 1 || 1),
// // //       name,
// // //       code
// // //     }));
// // //     setName('');
// // //     setCode('');
// // //     onClose();
// // //   };

// // //   return (
    
// // //     <Form className='form-container'>
// // //       <Form.Group className="mb-3">
// // //         <Form.Label style={{marginBottom: '10px',marginRight: '15px', padding: '15px'}}>الإســــــــم</Form.Label>
// // //         <Form.Control type="text" placeholder="أدخل الإسم" value={name} onChange={(e) => setName(e.target.value)} />
// // //       </Form.Group>

// // //       <Form.Group className="mb-3" >
// // //         <Form.Label style={{marginBottom: '10px',marginRight: '15px', padding: '15px'}}>الكــــــود</Form.Label>
// // //         <Form.Control type="number" placeholder="أدخل الكود" value={code} onChange={(e) => setCode(e.target.value)}  />
// // //       </Form.Group>

// // //       <Button label="إرسال" icon="pi pi-check" onClick={handleSubmit} className="mt-3" style={{backgroundColor: 'red', border: 'none', height: '40px', borderRadius: '5px'}}/>
// // //     </Form>
// // //   )
// // // }

// // // export default AddFaculty;

// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Form } from 'react-bootstrap';
// // import { Button } from 'primereact/button';
// // import './AddFaculty.css';
// // import { addGeneralData } from '../redux/GeneralAdReducer';


// // function AddGeneral({ onClose }) {
// //   const [code, setCode] = useState('');
// //   const [name, setName] = useState('');
// //   const [status, setStatus] = useState(0);
// //   const [level, setLevel] = useState(true);
// //   const [specialLevel, setSpecialLevel] = useState(false);
// //   const [generalStatus, sGeneralStatus] = useState(false);
// //   const general = useSelector(state => state.generalSlice);
// //   const dispatch = useDispatch();

// //   const handleSubmit = (e) => {
// //         e.preventDefault();

// //     dispatch(addGeneralData({
// //       id: (+general[general.length - 1].id + 1 || 1),
// //       name,
// //       code,
// //        level,
// //       specialLevel
// //     }));
// //     setName('');
// //     setCode('');
// //     setStatus('');
// //     setLevel('');
// //     setSpecialLevel('');
// //     onClose(); // غلق النافذة
// //   };

// //   return (
// //     <div className="dialog-overlay">
// //       <Form className="form-container">
// //         <span className="close-button" onClick={onClose}>×</span>

// //         <Form.Group className="mb-3">
// //           <Form.Label className="label">الادارة العامة  </Form.Label>
// //           <Form.Control
// //             type="text"
// //             placeholder="الادارة العامة "
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3">
// //           <Form.Label className="label">كود الادارة العامة</Form.Label>
// //           <Form.Control
// //             type="number"
// //             placeholder="كود الادارة العامة "
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //           />
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label className="label">  ؟ مستوى الادارة العامة</Form.Label>
// //           <Form.Control
// //             type="checkbox"
// //             placeholder="مستوى الادارة العامة "
// //             value={status}
// //             onChange={(e) => setStatus(e.target.value)}
// //           />
// //         </Form.Group>
// //         <Form.Group className="mb-3">
// //           <Form.Label className="label">  ؟ كائن خاص</Form.Label>
// //           <Form.Control
// //             type="checkbox"
// //             placeholder="كائن خاص "
// //             value={name}
// //             onChange={(e) => setSpecialLevel(e.target.value)}
// //           />
// //         </Form.Group>
        
// //         <Form.Group className="mb-3">
// //           <Form.Label className="label"> ؟ حالة الادارة العامة</Form.Label>
// //           <Form.Control
// //             type="text"
// //             placeholder="؟حالة الادارة العامة "
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //           />
// //         </Form.Group>

// //         <Button
// //           label="إرسال"
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
// // </div>
// //   );
// // }

// // export default AddGeneral;


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Form } from 'react-bootstrap';
// import { Button } from 'primereact/button';
// import '../faculty/AddFaculty.css'
// import { addGeneralData } from '../redux/GeneralAdReducer';

// function AddGeneral({ onClose }) {
//   const [code, setCode] = useState('');
//   const [name, setName] = useState('');
//   const [level, setLevel] = useState(true);
//   const [specialLevel, setSpecialLevel] = useState(true);
//   const [status, setStatus] = useState('مستحدث'); // أو فارغ افتراضياً

//   const general = useSelector((state) => state.generalSlice);
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(addGeneralData({
//       id: (+general[general.length - 1]?.id + 1 || 1),
//       name,
//       code,
//       level,
//       specialLevel,
//       status
//     }));

//     setName('');
//     setCode('');
//     setLevel('');
//     setSpecialLevel('');
//     setStatus('');
//     onClose(); // غلق النافذة
//   };

//   return (
//     <div className="dialog-overlay">
//       <Form className="form-container">
//         <span className="close-button" onClick={onClose}>×</span>

//         <Form.Group className="mb-3">
//           <Form.Label className="label">الإدارة العامة</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="الإدارة العامة"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label className="label">كود الإدارة العامة</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="كود الإدارة العامة"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3 d-flex align-items-center gap-2">
//           <Form.Check
//             type="checkbox"
//             checked={level}
//             onChange={(e) => setLevel(e.target.checked)}
//             label="مستوى إدارة عامة"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3 d-flex align-items-center gap-2">
//           <Form.Check
//             type="checkbox"
//             checked={specialLevel}
//             onChange={(e) => setSpecialLevel(e.target.checked)}
//             label="  كائن خاص؟"
//           />
//         </Form.Group>

//         {/* <Form.Group className="mb-3 d-flex align-items-center gap-2">
//           <Form.Check
//             type="checkbox"
//             checked={specialLevel}
//             onChange={(e) => setSpecialLevel(e.target.checked)}
//             label="كائن خاص"
//           />
//         </Form.Group> */}

//         <Form.Group className="mb-3">
//           <Form.Label className="label">حالة الإدارة العامة</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="مستحدث / غير مستحدث"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           />
//         </Form.Group>

//         <Button
//           label="إرسال"
//           icon="pi pi-check"
//           onClick={handleSubmit}
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

// export default AddGeneral;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import '../faculty/AddFaculty.css';
import { addGeneralData } from '../redux/GeneralAdReducer';

function AddGeneral({ onClose , sectorId}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(true);
  const [specialLevel, setSpecialLevel] = useState(false);
  const [status, setStatus] = useState(1);

  const general = useSelector((state) => state.generalSlice);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const newId = general.length > 0
    //   ? Math.max(...general.map(item => +item.id)) + 1
    //   : 1;

    dispatch(addGeneralData({
      // id: newId,
      code,
      name,
      level,
      specialLevel,
      status,
      sectorID: sectorId
    }));

    // Reset fields
    setCode('');
    setName('');
    setLevel(true);
    setSpecialLevel(false);
    setStatus(0);
    onClose(); // Close dialog
  };

  return (
    <div className="dialog-overlay">
      <Form className="form-container" onSubmit={handleSubmit}>
        <span className="close-button" onClick={onClose}>×</span>

       

        <Form.Group className="mb-3">
          <Form.Label className="label">كود الإدارة العامة</Form.Label>
          <Form.Control
            type="number"
            placeholder="أدخل كود الإدارة العامة"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>

 <Form.Group className="mb-3">
          <Form.Label className="label">اسم الإدارة العامة</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل اسم الإدارة العامة"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>


        <Form.Group className="mb-3 d-flex align-items-center gap-2">
          <Form.Check
            type="checkbox"
            checked={level}
            onChange={(e) => setLevel(e.target.checked)}
            label="مستوى إدارة عامة"
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex align-items-center gap-2">
          <Form.Check
            type="checkbox"
            checked={specialLevel}
            onChange={(e) => setSpecialLevel(e.target.checked)}
            label="كائن خاص"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">حالة الإدارة العامة</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >

 <option value={2}>مستحدث</option>
                        <option value={1}>معتمد</option>

            {/* <option value={0}>مستحدث</option>
            <option value={1}>قديم</option> */}
          </Form.Select>
        </Form.Group>

        <Button
          label="إرسال"
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

export default AddGeneral;
