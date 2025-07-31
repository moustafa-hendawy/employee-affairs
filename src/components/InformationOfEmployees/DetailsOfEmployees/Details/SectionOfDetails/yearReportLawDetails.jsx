import { useEffect, useState } from "react";

const YearReportLawDetails = ({ empId }) => {
  const [yearReportLawDetails, setYearReportLawDetails] = useState(null);

  const fetchYearReportLawDetails = async () => {
    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/YearReportLaw`
      );
      const data = await response.json();

      setYearReportLawDetails(data);
    } catch (error) {
      console.error("Error fetching year report law details:", error);
    }
  };

  useEffect(() => {
    fetchYearReportLawDetails();
  }, [empId]);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-[#176d6a] text-right ">
          بيانات تقارير السنة
        </div>

        {yearReportLawDetails &&
        yearReportLawDetails.filter((item) => item.empId === empId).length >
          0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border">سنة التقرير</th>
                  <th className="px-4 py-2 border">
                    الدرجة التي حصل عليها الموظف
                  </th>

                  <th className="px-4 py-2 border"> الجهة</th>
                </tr>
              </thead>
              <tbody>
                {yearReportLawDetails
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.period || "لا يوجد تاريخ"}
                      </td>

                      <td className="px-4 py-2 border">
                        {item.grade || "لا يوجد درجة"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.geha || "لا يوجد جهة"}
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

export default YearReportLawDetails;
