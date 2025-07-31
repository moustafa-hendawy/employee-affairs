import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const QualificationDetails = ({ empId }) => {
  const [qualificationData, setQualificationData] = useState([]);
  const [qualGrade, setQualGrade] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: 0,
    specialization: "",
    qualPlace: "",
    decisionNumber: 0,
    decisionDate: "",
    graduationDate: "",
    lastQual: true,
    certificateID: 0,
    qualGradeID: 0,
  });

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

  const handleAddClick = () => {
    setFormData({
      code: 0,
      specialization: "",
      qualPlace: "",
      decisionNumber: 0,
      decisionDate: "",
      graduationDate: "",
      lastQual: true,
      certificateID: 0,
      qualGradeID: 0,
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      code: item.code,
      specialization: item.specialization,
      qualPlace: item.qualPlace,
      decisionNumber: item.decisionNumber,
      decisionDate: item.decisionDate,
      graduationDate: item.graduationDate,
      lastQual: item.lastQual,
      certificateID: item.certificateID,
      qualGradeID: item.qualGradeID,
    });
    setIsEditMode(true);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      nationalID: empId,
      id: editingId,
    };

    try {
      let response;
      if (isEditMode && editingId) {
        response = await fetch(`http://193.227.24.29:5000/api/Qualification`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`http://193.227.24.29:5000/api/Qualification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/Qualification`
        );
        const newData = await updatedData.json();

        setQualificationData(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          specialization: "",
          qualPlace: "",
          decisionNumber: 0,
          decisionDate: "",
          graduationDate: "",
          lastQual: true,
          certificateID: 0,
          qualGradeID: 0,
        });
        setEditingId(null);
        setIsEditMode(false);
      } else {
        console.error("فشل الإرسال");
      }
    } catch (error) {
      console.error("خطأ أثناء الإرسال:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا التدرج   ؟"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/Qualification/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = qualificationData.filter((item) => item.id !== id);
        setQualificationData(updated);
      } else {
        console.error("فشل في الحذف من السيرفر");
      }
    } catch (error) {
      console.error("خطأ أثناء الحذف:", error);
    }
  };

  return (
    <>
      <div className="w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white mb-2 p-3 bg-[#176d6a] text-right flex justify-between items-center">
          <span> بيانات المؤهلات العلمية</span>
          <button
            onClick={handleAddClick}
            className="bg-white text-[#176d6a] px-3 py-1 rounded text-xl font-bold"
          >
            +
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <div className="flex gap-4 mb-4 flex-wrap">
              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="code"
                  className="block mb-1 text-sm text-gray-700"
                >
                  الكود
                </label>
                <input
                  id="code"
                  type="number"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  التخصص
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  جهة الحصول علي المؤهل
                </label>
                <input
                  type="text"
                  name="qualPlace"
                  value={formData.qualPlace}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  رقم القرار
                </label>
                <input
                  type="number"
                  name="decisionNumber"
                  value={formData.decisionNumber}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  تاريخ القرار
                </label>
                <input
                  type="date"
                  name="decisionDate"
                  value={formData.decisionDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  تاريخ التخرج
                </label>
                <input
                  type="date"
                  name="graduationDate"
                  value={formData.graduationDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  أخر مؤهل؟
                </label>
                <select
                  name="lastQual"
                  value={formData.lastQual}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastQual: e.target.value === "true",
                    }))
                  }
                  className="border p-2 rounded w-full"
                >
                  <option value={true}>نعم</option>
                  <option value={false}>لا</option>
                </select>
              </div>
              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  المستوى العلمي
                </label>
                <select
                  name="eduLevelID"
                  value={formData.eduLevelID}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر المستوى</option>
                  {educationLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  المؤهل الدراسي
                </label>
                <select
                  name="certificateID"
                  value={formData.certificateID}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر الشهادة</option>
                  {certificates.map((cert) => (
                    <option key={cert.id} value={cert.id}>
                      {cert.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  التقدير
                </label>
                <select
                  name="qualGradeID"
                  value={formData.qualGradeID}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر التقدير</option>
                  {qualGrade.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-left flex gap-4">
              <button
                type="submit"
                className="bg-[#176d6a] text-white px-4 py-2 rounded"
              >
                {isEditMode ? "تحديث" : "إضافة"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}

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
                  <th className="py-2 px-4 border">الخيارات</th>
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
                      <td className="py-2 px-4 border">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="text-blue-600 p-1 hover:bg-blue-100 rounded"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 p-1 hover:bg-red-100 rounded"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
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
