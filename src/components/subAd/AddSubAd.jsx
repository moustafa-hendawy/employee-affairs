


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import '../faculty/AddFaculty.css';
import { addSubAdData } from '../redux/SubAdReducer';

function AddSubAd({ onClose, generalAdId }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(true);
  const [specialLevel, setSpecialLevel] = useState(false);
  const [status, setStatus] = useState(1);

  const general = useSelector((state) => state.generalSlice);
  const dispatch = useDispatch();
     console.log("subad ", generalAdId)

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId = general.length > 0
      ? Math.max(...general.map(item => +item.id)) + 1
      : 1;

      console.log("subad ", generalAdId)
    dispatch(addSubAdData({
      id: newId,
      name,
      code,
      level,
      specialLevel,
      status,
      generalAdId
    }));

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

export default AddSubAd;
