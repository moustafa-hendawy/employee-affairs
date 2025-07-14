
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editFacultyData } from '../redux/FacultyReducers';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import './AddFaculty.css';

function Update({ data, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCode(data.code);
    }
  }, [data]);

  const handleSubmit = () => {
    dispatch(editFacultyData({
      id: data.id,
      updateFaculty: { name, code }
    }));
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <Form className="form-container">
        <span className="close-button" onClick={onClose}>×</span>

        <Form.Group className="mb-3">
          <Form.Label className="label">الإســــــــم</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل الإسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">الكــــــود</Form.Label>
          <Form.Control
            type="number"
            placeholder="أدخل الكود"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>

        <Button
          label="تحـديث"
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

export default Update;