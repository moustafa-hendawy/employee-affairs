import { useState, useEffect } from "react";

const VacationDetails = ({ empId }) => {
  const [vacationData, setVacationData] = useState(null);
  const [vacationDataType, setVacationDataType] = useState(null);

  useEffect(() => {
    const fetchVacationData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Vacation`);
        const data = await response.json();
        console.log("Vacation data:", data);
        setVacationData(data);
      } catch (error) {
        console.error("Error fetching vacation data:", error);
      }
    };

    fetchVacationData();
  }, []);

  useEffect(() => {
    const fetchVacationDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/VacationType`
        );
        const data = await response.json();
        console.log("Vacation data type:", data);
        setVacationDataType(data);
      } catch (error) {
        console.error("Error fetching vacation data type:", error);
      }
    };

    fetchVacationDataType();
  }, [vacationData, empId]);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-[#176d6a] text-right ">
          بيانات الإجازات
        </div>

        {vacationData &&
        vacationData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border">هل انتهت الاجازة</th>

                  <th className="px-4 py-2 border"> نوع الاجازة </th>
                  <th className="px-4 py-2 border"> الجهة</th>
                  <th className="px-4 py-2 border"> تاريخ بداية الاجازة</th>
                  <th className="px-4 py-2 border"> تاريخ نهاية الاجازة</th>

                  <th className="px-4 py-2 border"> تاريخ العودة </th>
                  <th className="px-4 py-2 border"> رقم القرار </th>
                  <th className="px-4 py-2 border"> تاريخ القرار </th>

                  <th className="px-4 py-2 border"> ملاحظات </th>
                </tr>
              </thead>
              <tbody>
                {vacationData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.ended ? "نعم" : "لا" || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {vacationDataType?.find(
                          (type) => type.id === item.vacationTypeId
                        )?.name || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.place || "لا يوجد جهة"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.startDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.endDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.returnDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.decisionDate || "لا يوجد تاريخ"}
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
    </>
  );
};

export default VacationDetails;
