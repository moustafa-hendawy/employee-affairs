import React from 'react'
import EmployeeTable from './employeeTable'
import BackToMenu from './BackToMenu'

function Employees() {
  return (
    <div className="p-2">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <img
            className="w-[190px] h-[60px]"
            src="img/logor.png"
            alt=""
          />
          <img
            className="w-[190px] h-[60px]"
            src="img/imgl.png"
            alt=""
          />
        </div>

        {/* خط مزخرف أسفل الهيدر */}
        <div className="w-full my-2 h-[3px] bg-gradient-to-r from-transparent via-black/30 to-transparent"></div>
      </div>

      <BackToMenu />
      <EmployeeTable />


    </div>
  )
}

export default Employees
