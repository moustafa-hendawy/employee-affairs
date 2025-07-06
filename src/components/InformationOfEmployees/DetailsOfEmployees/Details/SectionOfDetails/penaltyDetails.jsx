import { useState, useEffect } from "react";

const PenaltyDetails = ({ empId }) => {
  const [penaltyData, setPenaltyData] = useState(null);
  const [penaltyDataCase, setPenaltyDataCase] = useState(null);
  const [penaltyDataType, setPenaltyDataType] = useState(null);

  useEffect(() => {
    const fetchPenaltyData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Penalty`);
        const data = await response.json();
        console.log("Penalty data:", data);
        setPenaltyData(data);
      } catch (error) {
        console.error("Error fetching penalty data:", error);
      }
    };

    fetchPenaltyData();
  }, [empId]);
  useEffect(() => {
    const fetchPenaltyDataCase = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/PenaltyCase`
        );
        const data = await response.json();
        console.log("Penalty data:", data);
        setPenaltyDataCase(data);
      } catch (error) {
        console.error("Error fetching penalty data case:", error);
      }
    };

    fetchPenaltyDataCase();
  }, [empId]);
  useEffect(() => {
    const fetchPenaltyDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/PenaltyType`
        );
        const data = await response.json();
        console.log("Penalty data:", data);
        setPenaltyDataType(data);
      } catch (error) {
        console.error("Error fetching penalty data type:", error);
      }
    };

    fetchPenaltyDataType();
  }, [empId]);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-blue-500 text-right ">
          بيانات الجزاءات
        </div>

        {penaltyData &&
        penaltyData.filter((item) => item.empId === empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> نوع الجزاء</th>

                  <th className="px-4 py-2 border">تاريخ بداية الجزاء</th>
                  <th className="px-4 py-2 border"> تاريخ نهاية الجزاء</th>
                  <th className="px-4 py-2 border"> رقم القرار</th>
                  <th className="px-4 py-2 border"> تتاريخ القرار</th>
                  <th className="px-4 py-2 border"> الاعفاء من الجزاء</th>
                  <th className="px-4 py-2 border">
                    {" "}
                    تاريخ الاعفاء من الجزاء{" "}
                  </th>
                  <th className="px-4 py-2 border">
                    {" "}
                    رقم قرار الاعفاء من الجزاء{" "}
                  </th>
                  <th className="px-4 py-2 border"> سبب الغاء الجزاء</th>
                  <th className="px-4 py-2 border"> حالة الجزاء</th>
                </tr>
              </thead>
              <tbody>
                {penaltyData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {penaltyDataType?.find(
                          (type) => type.id === item.penaltyTypeId
                        )?.name || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.startDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.endDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.decisionDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.isCanceled ? "نعم" : "لا" || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.cancelationDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.cancelationDecisionNo || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.cancelationReason || "لا يوجد سبب"}
                      </td>
                      <td className="px-4 py-2 border">
                        {penaltyDataCase?.find(
                          (caseItem) => caseItem.id == item.penaltyCaseId
                        )?.name || "لا توجد حالة"}
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

export default PenaltyDetails;
