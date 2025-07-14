

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFacultyData } from '../redux/FacultyReducers';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import '../faculty/AddFaculty.css';


function AddFaculty({ onClose }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const faculty = useSelector(state => state.faculty);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
        e.preventDefault();

    dispatch(addFacultyData({
      id: (+faculty[faculty.length - 1]?.id + 1 || 1),
      name,
      code
    }));
    setName('');
    setCode('');
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
          <Form.Label className="label">الكلية</Form.Label>
          <Form.Control
            type="text"
            placeholder="الكلية "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

export default AddFaculty;