import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addFacultyData } from '../redux/FacultyReducers';
import { Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import './AddSectors.css';
import { addSectorData, fetchSectorData } from '../redux/SectorReducers';

function AddSectors({ onClose }) {
  const sectors = useSelector(state => state.sectors);
  console.log(sectors);
  const [code, setCode] = useState('');
  const [sectorName, setSectorName] = useState('');
  const [status, setStatus] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
   e.preventDefault();
    console.log('kdnfjdfnjf')
    dispatch(addSectorData({
      // id: (+sectors[sectors.length - 1]?.id + 1 || 1),
      name: sectorName,
      status: Number(status),
      code: Number(code)
    })).then(() => {
      dispatch(fetchSectorData());
      setSectorName('');
    setCode('');
    setStatus('');
      onClose();
      console.log('Ahmed Ali');
    })
    // setSectorName('');
    // setCode('');
    // setStatus('');
    // onClose();  
  };

  return (
    <div className="dialog-overlay">
      <Form className="form-container">
        <span className="close-button" onClick={onClose}>×</span>

        <Form.Group className="mb-3">
          <Form.Label className="label">كود القطاع </Form.Label>
          <Form.Control
            type="number"
            placeholder=" كود القطاع"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">القطاع</Form.Label>
          <Form.Control
            type="text"
            placeholder="القطاع "
            value={sectorName}
            onChange={(e) => setSectorName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">النوع</Form.Label>
          <Form.Control
            type="number"
            placeholder="النوع"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

export default AddSectors;