import React from 'react';
// import './FormStyle.css'; // اختياري لو حابب تنسيق خارجي

const OfficialInTheRegion = () => {
  const data = [
    { role: "رئيس القسم", name: "د/ خالد عثمان" },
    { role: "مدير إدارة بوابة الخدمة", name: "د/ نجلاء مصطفى" },
    { role: "مدير عام شئون الطلبة", name: "د/ سامية عبده" },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>تعديل أسماء مسؤولي بوابة</h3>

      <div style={{ marginBottom: '15px' }}>
        <label>اختر القسم: </label>
        <select style={{ padding: '5px', width: '100%' }}>
          <option>القسم 1</option>
          <option>القسم 2</option>
          <option>القسم 3</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>المسمى الوظيفي</th>
            <th style={thStyle}>الاسم</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td style={tdStyle}>{row.role}</td>
              <td style={tdStyle}>{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '15px' }}>
        <label>السنة الحالية: </label>
        <input type="text" value="2025" readOnly style={{ padding: '5px', width: '100%' }} />
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={buttonStyle}>حفظ</button>
        <button style={{ ...buttonStyle, marginLeft: '10px' }}>خروج</button>
      </div>
    </div>

    
  );
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f0f0f0',
  textAlign: 'center'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center'
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};


export default OfficialInTheRegion