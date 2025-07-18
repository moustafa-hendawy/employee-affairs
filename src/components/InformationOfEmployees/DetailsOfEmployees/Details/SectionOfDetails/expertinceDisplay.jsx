import { useState, useEffect } from "react";
const ExperienceDisplay = ({ nationalId }) => {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/Employee?nationalId=${nationalId}`
        );
        const data = await response.json();
        setEmployee(data[0] || {});
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [nationalId]);
  return (
    <>
      <div className="experince-information w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176d6a] text-right">
          بيانات خاصه بالخبره والانتداب
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rtl">
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ الخبره
            </label>
            <div className="flex gap-2">
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.experanceDate}
              </span>
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.experanceDateTxt}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              رقم قرار الخبرة
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.experanceDN}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              مده مؤقته
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.yearEmp}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              مجالات الخبره
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.experanceDomain}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تسلسل درحات القيد
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.boundDegree}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ نهاية الخدمه
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.workEndDate}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              رقم القرار
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.workEndDec}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ القرار
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {employee.workEndDeDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceDisplay;
