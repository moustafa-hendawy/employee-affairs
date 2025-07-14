

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFacultyData } from '../redux/FacultyReducers';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import '../faculty/AddFaculty.css';
import { addDegreeData, editDegreeData } from '../redux/FinintialDegeeReducer';


function EditFincialDegrees({ degree, onClose , types}) {
  const [code, setCode] = useState(degree.code);
  const [name, setName] = useState(degree.name);
  const [fincialDegreeTypeId, setFincialDegreeTypeId] = useState(degree.fincialDegreeTypeId);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
        e.preventDefault();

    dispatch(editDegreeData({
      id: degree.id,
      name,
      code,
      fincialDegreeTypeId
    }));

    setName('');
    setCode('');
    setFincialDegreeTypeId('');

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

export default EditFincialDegrees;