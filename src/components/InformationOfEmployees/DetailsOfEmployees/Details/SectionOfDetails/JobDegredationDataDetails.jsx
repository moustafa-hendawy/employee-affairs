import { useEffect, useState } from "react";

const JobDegredationDataDetails = ({ empId }) => {
  const [JobDegredationData, setJobDegredationData] = useState([]);
  const [financialDegrees, setFinancialDegrees] = useState([]);
  const [financialDegreesType, setFinancialDegreesType] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);

  useEffect(() => {
    const fetchJobDegredationData = async () => {
      const response = await fetch(
        "http://193.227.24.29:5000/api/JobDegredationData"
      );
      const data = await response.json();
      setJobDegredationData(data);
    };

    fetchJobDegredationData();
  }, []);

  useEffect(() => {
    const fetchFinancialDegrees = async () => {
      const response = await fetch(
        "http://193.227.24.29:5000/api/FincialDegrees"
      );
      const data = await response.json();
      setFinancialDegrees(data);
    };

    fetchFinancialDegrees();
  }, []);

  useEffect(() => {
    const fetchFinancialDegreesType = async () => {
      const response = await fetch(
        "http://193.227.24.29:5000/api/FincialDegreeType"
      );
      const data = await response.json();
      setFinancialDegreesType(data);
    };

    fetchFinancialDegreesType();
  }, []);

  useEffect(() => {
    const fetchJobTitles = async () => {
      const response = await fetch("http://193.227.24.29:5000/api/JobType");
      const data = await response.json();
      setJobTitles(data);
    };

    fetchJobTitles();
  }, []);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-blue-500 text-right ">
          بيانات تخفيض الدرجة الوظيفية
        </div>

        {JobDegredationData &&
        JobDegredationData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>

                  <th className="px-4 py-2 border"> الدرجة المالية </th>
                  <th className="px-4 py-2 border"> الوظيفة </th>
                  <th className="px-4 py-2 border"> تاريخ البداية </th>
                  <th className="px-4 py-2 border"> تاريخ النهاية </th>
                  <th className="px-4 py-2 border"> رقم القرار </th>
                  <th className="px-4 py-2 border"> تاريخ القرار</th>
                  <th className="px-4 py-2 border"> الدرجة الحالية</th>
                  <th className="px-4 py-2 border"> نوع الوظيفة</th>

                  <th className="px-4 py-2 border"> ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {JobDegredationData.filter((item) => item.empId == empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>

                      <td className="px-4 py-2 border">
                        {financialDegrees?.find(
                          (type) => type.id === item.fincialDegreeId
                        )?.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.jobName || "لا يوجد نوع"}
                      </td>

                      <td className="px-4 py-2 border">
                        {item.jobStartDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.jobEndDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.currentDegree ? "نعم" : "لا" || "لا يوجد درجة"}
                      </td>
                      <td className="px-4 py-2 border">
                        {jobTitles
                          .filter((title) => title.id == item.jobTypeId)
                          .map((title) => title.name)
                          .join(", ") || "لا يوجد وظيفة"}
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

export default JobDegredationDataDetails;
