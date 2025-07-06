import { useState, useEffect } from "react";

const SalaryDetails = ({ empId }) => {
  const [salaryData, setSalaryData] = useState([]);
  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Salary`);
        const data = await response.json();
        console.log("Salary data:", data);
        setSalaryData(data);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };

    fetchSalaryData();
  }, []);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-blue-500 text-right ">
          بيانات الراتب
        </div>

        {salaryData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> أجر وظيفي</th>
                  <th className="px-4 py-2 border"> أجر مكمل</th>
                  <th className="px-4 py-2 border"> حافز تعويضي </th>
                  <th className="px-4 py-2 border"> أساسي 6/30 </th>
                  <th className="px-4 py-2 border">الحافز الثابت 100%</th>
                  <th className="px-4 py-2 border">مكافأة امتحانات</th>
                  <th className="px-4 py-2 border">كل البدالات</th>
                  <th className="px-4 py-2 border">بدلات اخري</th>
                  <th className="px-4 py-2 border">جملة المكافآت</th>
                  <th className="px-4 py-2 border">ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {salaryData
                  .filter((item) => item.empId == empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {item.agr_Wasefy || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.agr_Mokamel || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.hafez_Taawedy || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.m_asasy30 || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.hafez_Thabet || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.moKafat_Emt7anat || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.all_Badalt || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.badalat_Okhra || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.all_Mok || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.notes || "لا توجد بيانات"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">لا توجد بيانات متاحة</p>
        )}
      </div>
    </>
  );
};

export default SalaryDetails;
