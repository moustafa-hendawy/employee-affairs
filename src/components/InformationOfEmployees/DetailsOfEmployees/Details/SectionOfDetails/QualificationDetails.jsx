import { useEffect, useState } from "react";

const QualificationDetails = ({ empId }) => {
  const [qualificationData, setQualificationData] = useState([]);
  const [qualGrade, setQualGrade] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);

  useEffect(() => {
    const fetchQualificationData = async () => {
      const response = await fetch(
        `http://193.227.24.29:5000/api/Qualification`
      );
      const data = await response.json();
      setQualificationData(data);
    };

    fetchQualificationData();
  }, [empId]);

  useEffect(() => {
    const fetchQualGrade = async () => {
      const response = await fetch(`http://193.227.24.29:5000/api/QualGrade`);
      const data = await response.json();
      setQualGrade(data);
    };

    fetchQualGrade();
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      const response = await fetch(`http://193.227.24.29:5000/api/Certificate`);
      const data = await response.json();
      setCertificates(data);
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    const fetchEducationLevels = async () => {
      const response = await fetch(
        `http://193.227.24.29:5000/api/EducationalLevel`
      );
      const data = await response.json();
      setEducationLevels(data);
    };

    fetchEducationLevels();
  }, []);

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white   p-3 bg-[#176d6a] text-right ">
          بيانات المؤهلات العلمية
        </div>

        {qualificationData &&
        qualificationData.filter((item) => item.nationalID == empId).length >
          0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>

                  <th className="px-4 py-2 border"> المستوي العلمي</th>
                  <th className="px-4 py-2 border"> المؤهل الدراسي </th>
                  <th className="px-4 py-2 border"> التخصص</th>
                  <th className="px-4 py-2 border"> التقدير</th>
                  <th className="px-4 py-2 border"> جهة الحصول علي المؤهل</th>
                  <th className="px-4 py-2 border"> رقم القرار </th>
                  <th className="px-4 py-2 border"> تاريخ القرار </th>
                  <th className="px-4 py-2 border"> تاريخ التخرج</th>
                  <th className="px-4 py-2 border"> اخر مؤهل حاصل عليه</th>
                </tr>
              </thead>
              <tbody>
                {qualificationData
                  .filter((item) => item.nationalID === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {educationLevels.find(
                          (level) =>
                            level.id ==
                            certificates.find(
                              (cert) => cert.id == item.certificateID
                            )?.educationLevelId
                        )?.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {certificates.find(
                          (cert) => cert.id == item.certificateID
                        )?.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.specialization || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {qualGrade.find((grade) => grade.id == item.qualGradeID)
                          ?.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.qualPlace || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border">
                        {item.decisionNumber || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionDate || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.graduationDate || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.lastQual ? "نعم" : "لا" || "لا توجد بيانات"}
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

export default QualificationDetails;
