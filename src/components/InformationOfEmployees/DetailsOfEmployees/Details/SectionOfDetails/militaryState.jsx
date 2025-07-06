import { useState, useEffect } from "react";

const MilitaryState = ({ empId }) => {
  const [militaryData, setMilitaryData] = useState(null);
  const [militaryDataType, setMilitaryDataType] = useState(null);

  useEffect(() => {
    const fetchMilitaryData = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/MilitaryState`
        );
        const data = await response.json();
        console.log("Military data:", data);
        setMilitaryData(data);
      } catch (error) {
        console.error("Error fetching military data:", error);
      }
    };

    fetchMilitaryData();
  }, [empId]);

  useEffect(() => {
    const fetchMilitaryDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/MilitaryStateType`
        );
        const data = await response.json();
        console.log("Military data:", data);
        setMilitaryDataType(data);
      } catch (error) {
        console.error("Error fetching military state type:", error);
      }
    };

    fetchMilitaryDataType();
  }, [empId]);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-blue-500 text-right ">
          بيانات الموقف العسكري
        </div>

        {militaryData &&
        militaryData.filter((item) => item.empId === empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> نوع الموقف من التجنيد</th>

                  <th className="px-4 py-2 border">التاريخ</th>
                  <th className="px-4 py-2 border"> الموقف الحالي</th>
                  <th className="px-4 py-2 border"> ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {militaryData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {militaryDataType?.find(
                          (type) => type.id === item.militaryStateTypeId
                        )?.name || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border">
                        {item.date || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.currentMilitaryState
                          ? "نعم"
                          : "لا" || "لا يوجد رقم قرار"}
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

export default MilitaryState;
