import { useState, useEffect } from "react";

const MandateDataDetails = ({ empId }) => {
  const [mandateData, setMandateData] = useState(null);
  const [mandateDataType, setMandateDataType] = useState(null);
  const [facultyData, setFacultyData] = useState(null);

  useEffect(() => {
    const fetchMandateData = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/MandateData`
        );
        const data = await response.json();
        setMandateData(data);
      } catch (error) {
        console.error("Error fetching mandate data:", error);
      }
    };

    fetchMandateData();
  }, [empId]);

  useEffect(() => {
    const fetchMandateDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/MandateType`
        );
        const data = await response.json();
        setMandateDataType(data);
      } catch (error) {
        console.error("Error fetching mandate data:", error);
      }
    };

    fetchMandateDataType();
  }, [empId]);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Faculty`);
        const data = await response.json();
        setFacultyData(data);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchFacultyData();
  }, [empId]);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-[#176d6a] text-right ">
          بيانات الانتداب
        </div>

        {mandateData &&
        mandateData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>

                  <th className="px-4 py-2 border"> الجهة</th>
                  <th className="px-4 py-2 border"> قائمة جهة الانتداب</th>
                  <th className="px-4 py-2 border"> منتدب</th>
                  <th className="px-4 py-2 border"> نوع الانتداب</th>
                  <th className="px-4 py-2 border">
                    الوظيفة المنتدب (عليها / اليها ) بالقرار رقم
                  </th>
                  <th className="px-4 py-2 border"> رقم قرار الندب</th>
                  <th className="px-4 py-2 border"> تاريخ قرار الندب</th>
                  <th className="px-4 py-2 border"> تاريخ بداية الانتداب</th>
                  <th className="px-4 py-2 border"> تاريخ نهاية الانتداب</th>
                </tr>
              </thead>
              <tbody>
                {mandateData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.geha || "لا يوجد جهة"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {facultyData?.find(
                          (faculty) => faculty.id == item.facultyId
                        )?.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.isMandated ? "نعم" : "لا" || " لا يوجد بيانات "}
                      </td>
                      <td className="px-4 py-2 border">
                        {mandateDataType?.find(
                          (type) => type.id == item.mandateTypeId
                        )?.name || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.mandateJob || "لا يوجد وظيفة"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.decisionDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.startDate || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.endDate || "لا يوجد تاريخ"}
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

export default MandateDataDetails;
