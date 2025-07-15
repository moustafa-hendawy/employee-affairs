


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import '../faculty/AddFaculty.css';
import { editGeneralData } from '../redux/GeneralAdReducer';

function EditSubAd({ onClose, data }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(true);
  const [specialLevel, setSpecialLevel] = useState(false);
  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();

  // ✅ تحديث الحقول عند فتح النافذة (أو عند تغيّر data)
  useEffect(() => {
    if (data) {
      setCode(data.code || '');
      setName(data.name || '');
      setLevel(data.level ?? true); // استخدام nullish coalescing
      setSpecialLevel(data.specialLevel ?? false);
      setStatus(data.status ?? 0);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editGeneralData({
        id: data.id,
      updateFaculty: {
        name,
        code,
        level,
        specialLevel,
        status,
        sectorID: data.sectorID
      }
    }));

    onClose(); // إغلاق النافذة بعد الإرسال
    // window.location.reload();
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
            label="كادر خاص"
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
