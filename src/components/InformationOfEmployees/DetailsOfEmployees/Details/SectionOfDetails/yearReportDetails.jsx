import { useState, useEffect } from "react";

const YearReportDetails = ({ empId }) => {
  const [yearReports, setYearReports] = useState([]);
  const [yearReportsGrade, setYearReportsGrade] = useState([]);

  useEffect(() => {
    const fetchYearReports = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/YearReport`
        );
        const data = await response.json();
        setYearReports(data);
      } catch (error) {
        console.error("Error fetching year report data:", error);
      }
    };

    fetchYearReports();
  }, []);

  useEffect(() => {
    const fetchYearReportsGrade = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/YearReportGrade`
        );
        const data = await response.json();
        setYearReportsGrade(data);
      } catch (error) {
        console.error("Error fetching year report grade data:", error);
      }
    };

    fetchYearReportsGrade();
  }, []);

  const filteredData = yearReports
    .filter((item) => item.empId === empId)
    .sort((a, b) => a.code - b.code);

  return (
    <div className="w-[98%] mx-auto mt-3">
      <div className="text-[15px] text-white   p-3 bg-blue-500 text-right ">
        بيانات سنة التقارير
      </div>

      {filteredData.length > 0 ? (
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">م</th>
                <th className="px-4 py-2 border">سنة التقرير</th>
                <th className="px-4 py-2 border">
                  الدرجة التي حصل عليها الموظف
                </th>
                <th className="px-4 py-2 border">التقدير</th>
                <th className="px-4 py-2 border">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    {item.year || "لا توجد بيانات"}
                  </td>
                  <td className="px-4 py-2 border">
                    {item.degree || "لا توجد بيانات"}
                  </td>
                  <td className="px-4 py-2 border">
                    {yearReportsGrade.find((type) => type.id === item.gradeId)
                      ?.name || "لا توجد بيانات"}
                  </td>
                  <td className="px-4 py-2 border">
                    {item.notes || "لا توجد ملاحظات"}
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
  );
};

export default YearReportDetails;
