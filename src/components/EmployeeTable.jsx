import './employeeTable.css';
import React, { useEffect, useState } from "react";
import { getEmployeeData } from "../services/EmployeeService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import Pagination from "react-js-pagination";
// import Pagination from '@mui/material/Pagination';

const EmployeeTable = () => {
  const [fakeApi,setFakeApi] = useState([]);
  // const pageSize = 4;
  // const [pagination, setPagination] = useState({
  //   from: 0,
  //   to: pageSize
  // });
  // const handlePagination = (event, page) => {
  //   const from = (page - 1) * pageSize;
  //   const to = (page - 1) * pageSize + pageSize;
  //   setPagination({...pagination, from, to})
  // }

  useEffect(() => {
     getEmployeeData().then((data) => 
    {
      console.log(data);
      setFakeApi(data);
    }
    );

  },[])
  

  return (
    // <div className="employee-table">
    //   <table className="table-employee" border="1" style={{ width: "100%", textAlign: "center" }}>
    //     <thead>
    //       <tr>
    //         <th>الاسم</th>
    //         <th>الوظيفة</th>
    //         <th>الادارة</th>
    //         <th>العمر</th>
    //         <th>تاريخ شغل الوظيفة</th>
    //         <th>الاساسي</th>
    //         <th>المتغير</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //     {fakeApi.map((product,i) => 
    //        (
    //         <tr key={product.id}>
    //           <td>{product.name}</td> 
    //           {/* <td>{product.price}</td>
    //           <td>{product.description}</td> */}
           
    //       </tr>
    //       )
    //     )}
    //       {/* {employees.map((employee, index) => (
    //         <tr key={index}>
    //           <td>{employee.name}</td>
    //           <td>{employee.position}</td>
    //           <td>{employee.office}</td>
    //           <td>{employee.age}</td>
    //           <td>{employee.startDate}</td>
    //           <td>{employee.salary}</td>
    //           <td>{employee.additional}</td>
    //         </tr>
    //       ))} */}
    //     </tbody>
    //   </table>
    //   {/* <Pagination  itemsCountPerPage={10}
    //       totalItemsCount={450}
    //       pageRangeDisplayed={5} />  */}

    //   <Pagination onChange={handlePagination} count={Math.ceil(fakeApi.length/pageSize)} color="primary" />
          
    //          </div>

    <div className="card--">
            <DataTable value={fakeApi} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="الاسم"></Column>
                <Column field="title" header="الوظيفة"></Column>
                <Column field="price" header="الإدارة"></Column>
                <Column field="description" header="العمر"></Column>/
 {/* /               <Column field="rate" header="تاريخ شغل الوظيفة"></Column> */}
                <Column field="count" header="الأساسي"></Column>
                <Column field="quantity" header="المتغير"></Column>
            </DataTable>
        </div>
  );
}; 

export default EmployeeTable;
