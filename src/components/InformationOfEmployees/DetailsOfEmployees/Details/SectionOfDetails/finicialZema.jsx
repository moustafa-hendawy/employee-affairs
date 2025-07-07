import { useState, useEffect } from "react";

const FinicialZema = ({ empId }) => {
  const [financialData, setFinancialData] = useState([]);
  const [f, setF] = useState([]);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/FinicialZema`
        );
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchFinancialData();
  }, []);

  useEffect(() => {
    const fetchFinancialDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/FinicialZemaType`
        );
        const data = await response.json();
        setF(data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchFinancialDataType();
  }, []);

  const filteredData = financialData
    .filter((item) => item.empId === empId)
    .sort((a, b) => a.code - b.code);

  return (
    <div className="w-[98%] mx-auto mt-3">
      <div className="text-[15px] text-white mb-2 p-3 bg-[#176d6a] text-right">
        بيانات الذمة المالية
      </div>

      {filteredData.length > 0 ? (
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <table className="min-w-full mt-1 bg-white border border-gray-300 text-right rtl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border">م</th>
                <th className="py-2 px-4 border">عدد الإقرارات المطلوبة</th>
                <th className="py-2 px-4 border">النوع</th>
                <th className="py-2 px-4 border">تاريخ آخر إقرار</th>
                <th className="py-2 px-4 border">تاريخ المطالبة</th>
                <th className="py-2 px-4 border">تم تقديم الإقرار</th>
                <th className="py-2 px-4 border">تاريخ تقديم الإقرار</th>
                <th className="py-2 px-4 border">تاريخ الذهاب للكسب</th>
                <th className="py-2 px-4 border">تاريخ العودة من الكسب</th>
                <th className="py-2 px-4 border">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">
                    {item.requiredZemaNo || "لا توجد بيانات"}
                  </td>
                  <td className="py-2 px-4 border">
                    {f.find((type) => type.id === item.finicialZemaTypeId)
                      ?.name || "لا توجد بيانات"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.lastDecisionDate || "لا توجد بيانات"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.newSubmissionDate || "لا توجد بيانات"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.submitted ? "نعم" : "لا"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.submissionDate || "لا توجد بيانات"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.graftGoingDate || "لا توجد بيانات"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.graftComingDate || "لا توجد بيانات"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.notes || "لا توجد ملاحظات"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          لا توجد بيانات مالية متاحة
        </p>
      )}
    </div>
  );
};

export default FinicialZema;
