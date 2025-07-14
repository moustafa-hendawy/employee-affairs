


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import '../faculty/AddFaculty.css';
import { editSubAdData } from '../redux/SubAdReducer';

function EditSubAd({ onClose, subAd }) {
  const [code, setCode] = useState(subAd.code);
  const [name, setName] = useState(subAd.name);
  const [level, setLevel] = useState(subAd.level);
  const [specialLevel, setSpecialLevel] = useState(subAd.specialLevel);
  const [status, setStatus] = useState(subAd.status);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: subAd.id,
      name,
      code,
      level,
      specialLevel,
      status,
      generalAdId: subAd.generalAdId
    }

    dispatch(editSubAdData(data));

    // Reset fields
    setName('');
    setCode('');
    setLevel(true);
    setSpecialLevel(false);
    setStatus(1);

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
            <option value={1}>مستحدث</option>
            <option value={2}>معتمد</option>
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

export default EditSubAd;
