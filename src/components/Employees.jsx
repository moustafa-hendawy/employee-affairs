
import React from 'react'
import './employees.css';
import EmployeeTable from './employeeTable';
import BackToMenu from './BackToMenu';

function Employees() {
  return (
   <>
    <div className='employees'>
        <div className='header'>
            <div className="header-img">
                <img className='employee-image' src='img/logor.png' alt=''/>
                <img className='human' src='img/imgl.png' alt=''/>
            </div>
            <hr />
        </div>
            <BackToMenu />
        <EmployeeTable />
    </div>
   </>

  )
}

export default Employees
