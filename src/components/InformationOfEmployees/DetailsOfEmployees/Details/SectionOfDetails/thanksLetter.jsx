import { useState, useEffect } from "react";

const ThanksLetter = ({ empId }) => {
  const [thanksLetterData, setThanksLetterData] = useState([]);

  useEffect(() => {
    const fetchThanksLetterData = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/ThanksLetter`
        );
        const data = await response.json();
        console.log("Thanks letter data:", data);
        setThanksLetterData(data);
      } catch (error) {
        console.error("Error fetching thanks letter data:", error);
      }
    };

    fetchThanksLetterData();
  }, []);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-blue-500 text-right ">
          بيانات خطابات الشكر
        </div>

        {thanksLetterData.filter((item) => item.empId === empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> خطاب الشكر </th>
                  <th className="px-4 py-2 border">الجهة الموجه منها الخطاب</th>
                  <th className="px-4 py-2 border">تاريخ القرار</th>
                  <th className="px-4 py-2 border">رقم القرار</th>
                </tr>
              </thead>
              <tbody>
                {thanksLetterData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {item.letterName || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.geha || "لا توجد جهة"}
                      </td>

                      <td className="px-4 py-2 border">
                        {item.decisionDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا يوجد رقم قرار"}
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

export default ThanksLetter;
