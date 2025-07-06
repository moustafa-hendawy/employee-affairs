import { useEffect, useState } from "react";

const LagnaDetails = ({ empId }) => {
  const [lagnaData, setLagnaData] = useState([]);

  useEffect(() => {
    const fetchLagnaData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Lagna`);
        const data = await response.json();
        console.log("Lagna data:", data);
        setLagnaData(data);
      } catch (error) {
        console.error("Error fetching lagna data:", error);
      }
    };

    fetchLagnaData();
  }, [empId]);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-blue-500 text-right ">
          بيانات اللجنة
        </div>

        {lagnaData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> اسم اللجنة</th>
                  <th className="px-4 py-2 border"> الصفة داخل اللجنة</th>
                  <th className="px-4 py-2 border">رقم قرار اللجنة</th>
                  <th className="px-4 py-2 border">تاريخ القرار</th>
                </tr>
              </thead>
              <tbody>
                {lagnaData
                  .filter((item) => item.empId == empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {item.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.memberType || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا توجد ملاحظات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionDate || "لا توجد ملاحظات"}
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

export default LagnaDetails;
