import { useState, useEffect } from "react";

const TrainingDetails = ({ empId }) => {
  const [trainingData, setTrainingData] = useState([]);

  useEffect(() => {
    // Fetch training data from API or other source
    const fetchTrainingData = async () => {
      const response = await fetch("http://193.227.24.29:5000/api/Training");
      const data = await response.json();
      setTrainingData(data);
    };

    fetchTrainingData();
  }, []);

  return (
    <>
      <>
        <div className="w-[98%] mx-auto mt-3">
          <div className="text-[15px] text-white   p-3 bg-blue-500 text-right ">
            بيانات الدورات التدريبية
          </div>

          {trainingData &&
          trainingData.filter((item) => item.nationalId == empId).length > 0 ? (
            <div className="overflow-x-auto bg-white p-4 rounded shadow">
              <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">م</th>

                    <th className="px-4 py-2 border"> اسم الدورة</th>
                    <th className="px-4 py-2 border"> مكان انعقاد الدورة </th>
                    <th className="px-4 py-2 border"> تاريخ بداية الدورة</th>
                    <th className="px-4 py-2 border"> تاريخ نهاية الدورة</th>
                    <th className="px-4 py-2 border"> التقدير</th>
                    <th className="px-4 py-2 border"> ملاحظات</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingData
                    .filter((item) => item.nationalId == empId)
                    .sort((a, b) => a.code - b.code)
                    .map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{item.courseName}</td>
                        <td className="px-4 py-2 border">
                          {item.place || "لا يوجد مكان"}
                        </td>
                        <td className="px-4 py-2 border">
                          {item.startDate || "لا يوجد تاريخ"}
                        </td>
                        <td className="px-4 py-2 border">
                          {item.endDate || "لا يوجد تاريخ"}
                        </td>
                        <td className="px-4 py-2 border">
                          {item.grade || "لا يوجد تقدير"}
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
            <p className="text-center text-gray-500 mt-6">
              لا توجد بيانات متاحة
            </p>
          )}
        </div>
      </>
    </>
  );
};

export default TrainingDetails;
