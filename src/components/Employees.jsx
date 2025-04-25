
import React from 'react'
import './employees.scss';
import EmployeeTable from './employeeTable';

function Employees() {
  return (
   <>
    <div className='employees'>
        <div className='header'>
            <div className="header-img">
                <img className='employee-image' src='img/logor.png' alt=''/>
                <img className='human' src='img/imgl.png' alt=''/>
            </div>
            <div className="border">

            </div>
        </div>
        <EmployeeTable />
    </div>
   </>

  )
}

export default Employees
