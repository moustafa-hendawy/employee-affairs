
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addFacultyData } from '../redux/Reducers';

// function AddFaculty() {
//     const [name, setName] = useState('');
//   const [code, setCode] = useState('');
//      const faculty = useSelector(state => state.faculty);
//      console.log(faculty);
//      const dispatch = useDispatch();
//   const router = useRouter()
//   const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee({ ...newEmployee, [name]: value });
//   };

// //     const handleSubmit = () => {
// //     console.log('✅ تم إضافة الموظف:', newEmployee);
// //     // e.preventDefault();
// //     setLoading(true);
// //     setVisible(false);       // نخفي الفورم بعد الإرسال
// //     dispatch(addFacultyData({
// //     id: (+faculty[faculty.length-1].id + 1),
// //      name: name,
// //      code: code
// //    }));
// //   };

// const handleSubmit = () => {
//   dispatch(addFacultyData({
//     id: (+faculty[faculty.length - 1]?.id + 1 || 1),
//     name,
//     code
//   }));
//   setName('');
//   setCode('');
//   setLoading(false);
//   onClose(); // تغلق النافذة بعد الإرسال
// };

// // const formSubmit = async (e) => {
// //   e.preventDefault();
// //   setLoading(true);
// //    dispatch(addFacultyData({
// //     id: (+faculty[faculty.length-1].id + 1),
// //      name: name,
// //      code: code
// //    }));
// //   onClose();
// // }

//   return (
//         <Form>
//             {loading && (
//             <LoadingDemo />
//         )}

//         <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>الإسم</Form.Label>
//         <Form.Control type="text" placeholder="أدحل الإسم" value={name} onChange={(e) => setName(e.target.value)} />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>الكود</Form.Label>
//         <Form.Control type="number" placeholder="أدخل الكود" value={code} onChange={(e) => setName(e.target.value)} />
//         </Form.Group>
//          <Button label="إرسال" icon="pi pi-check" onClick={handleSubmit} className="mt-3" />
//         {/* <Button label="إضافة" severity="success" className="p-button-warning" type='submit' /> */}
//         </Form>
//   )
// }

// export default AddFaculty


import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFacultyData } from '../redux/Reducers';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';

function AddFaculty({ onClose }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const faculty = useSelector(state => state.faculty);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addFacultyData({
      id: (+faculty[faculty.length - 1]?.id + 1 || 1),
      name,
      code
    }));
    setName('');
    setCode('');
    onClose();
  };

  return (
    
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>الإسم</Form.Label>
        <Form.Control type="text" placeholder="أدخل الإسم" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>الكود</Form.Label>
        <Form.Control type="number" placeholder="أدخل الكود" value={code} onChange={(e) => setCode(e.target.value)}  />
      </Form.Group>

      <Button label="إرسال" icon="pi pi-check" onClick={handleSubmit} className="mt-3" />
    </Form>
  )
}

export default AddFaculty;

