import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const JobDegredationDataDetails = ({ empId }) => {
  const [JobDegredationData, setJobDegredationData] = useState([]);
  const [financialDegrees, setFinancialDegrees] = useState([]);
  const [financialDegreesType, setFinancialDegreesType] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: 0,
    fincialDegreeId: 0,
    jobTypeId: 0,
    jobName: "",
    jobStartDate: "",
    jobEndDate: "",
    decisionNo: 0,
    decisionDate: "",
    notes: "",
    currentDegree: false,
    fincialDegreeDate: "",
  });

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
  const handleAddClick = () => {
    setFormData({
      code: 0,

      fincialDegreeId: 0,
      jobTypeId: 0,
      jobName: "",
      jobStartDate: "",
      jobEndDate: "",
      decisionNo: 0,
      decisionDate: "",
      notes: "",
      currentDegree: false,
      fincialDegreeDate: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      code: item.code,

      fincialDegreeId: item.fincialDegreeId,
      jobTypeId: item.jobTypeId,
      jobName: item.jobName,
      jobStartDate: item.jobStartDate,
      jobEndDate: item.jobEndDate,
      decisionNo: item.decisionNo,
      decisionDate: item.decisionDate,
      notes: item.notes,
      currentDegree: item.currentDegree,
      fincialDegreeDate: item.fincialDegreeDate,
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
      empId: empId,
    };

    try {
      let response;
      if (isEditMode && editingId) {
        response = await fetch(
          `http://193.227.24.29:5000/api/JobDegredationData/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await fetch(
          `http://193.227.24.29:5000/api/JobDegredationData`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/JobDegredationData`
        );
        const newData = await updatedData.json();

        setJobDegredationData(newData);
        setShowForm(false);
        setFormData({
          code: 0,

          fincialDegreeId: 0,
          jobTypeId: 0,
          jobName: "",
          jobStartDate: "",
          jobEndDate: "",
          decisionNo: 0,
          decisionDate: "",
          notes: "",
          currentDegree: false,
          fincialDegreeDate: "",
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
        `http://193.227.24.29:5000/api/JobDegredationData/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = JobDegredationData.filter((item) => item.id !== id);
        setJobDegredationData(updated);
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
          <span> بيانات التدرج الوظيفي</span>
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
                <label
                  htmlFor="fincialDegreeId"
                  className="block mb-1 text-sm text-gray-700"
                >
                  الدرجة المالية
                </label>
                <select
                  id="fincialDegreeId"
                  name="fincialDegreeId"
                  value={formData.fincialDegreeId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر الدرجة</option>
                  {financialDegrees.map((deg) => (
                    <option key={deg.id} value={deg.id}>
                      {deg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="jobTypeId"
                  className="block mb-1 text-sm text-gray-700"
                >
                  مسمى الوظيفة
                </label>
                <select
                  id="jobTypeId"
                  name="jobTypeId"
                  value={formData.jobTypeId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر الوظيفة</option>
                  {jobTitles.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="jobName"
                  className="block mb-1 text-sm text-gray-700"
                >
                  الوظيفة
                </label>
                <input
                  id="jobName"
                  type="text"
                  name="jobName"
                  value={formData.jobName}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="jobStartDate"
                  className="block mb-1 text-sm text-gray-700"
                >
                  تاريخ البدء
                </label>
                <input
                  id="jobStartDate"
                  type="date"
                  name="jobStartDate"
                  value={formData.jobStartDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="jobEndDate"
                  className="block mb-1 text-sm text-gray-700"
                >
                  تاريخ الانتهاء
                </label>
                <input
                  id="jobEndDate"
                  type="date"
                  name="jobEndDate"
                  value={formData.jobEndDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="decisionNo"
                  className="block mb-1 text-sm text-gray-700"
                >
                  رقم القرار
                </label>
                <input
                  id="decisionNo"
                  type="number"
                  name="decisionNo"
                  value={formData.decisionNo}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="decisionDate"
                  className="block mb-1 text-sm text-gray-700"
                >
                  تاريخ القرار
                </label>
                <input
                  id="decisionDate"
                  type="date"
                  name="decisionDate"
                  value={formData.decisionDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="notes"
                  className="block mb-1 text-sm text-gray-700"
                >
                  ملاحظات
                </label>
                <input
                  id="notes"
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%] flex items-center mt-6">
                <label
                  htmlFor="currentDegree"
                  className="mr-2 text-sm text-gray-700"
                >
                  الدرجة الحالية؟
                </label>
                <input
                  id="currentDegree"
                  type="checkbox"
                  name="currentDegree"
                  checked={formData.currentDegree}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentDegree: e.target.checked,
                    }))
                  }
                  className="h-4 w-4"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="fincialDegreeDate"
                  className="block mb-1 text-sm text-gray-700"
                >
                  تاريخ الحصول على الدرجة
                </label>
                <input
                  id="fincialDegreeDate"
                  type="date"
                  name="fincialDegreeDate"
                  value={formData.fincialDegreeDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
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

        {JobDegredationData &&
        JobDegredationData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border whitespace-nowrap">م</th>

                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    الدرجة المالية{" "}
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    الوظيفة{" "}
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    تاريخ البداية{" "}
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    تاريخ النهاية{" "}
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    رقم القرار{" "}
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    تاريخ القرار
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    الدرجة الحالية
                  </th>
                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    نوع الوظيفة
                  </th>

                  <th className="px-4 py-2 border whitespace-nowrap">
                    {" "}
                    ملاحظات
                  </th>
                  <th className="py-2 px-4 border">الخيارات</th>
                </tr>
              </thead>
              <tbody>
                {JobDegredationData.filter((item) => item.empId == empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {index + 1}
                      </td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {financialDegrees?.find(
                          (type) => type.id === item.fincialDegreeId
                        )?.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.jobName || "لا يوجد نوع"}
                      </td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.jobStartDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.jobEndDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.decisionNo || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.decisionDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.currentDegree ? "نعم" : "لا" || "لا يوجد درجة"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {jobTitles
                          .filter((title) => title.id == item.jobTypeId)
                          .map((title) => title.name)
                          .join(", ") || "لا يوجد وظيفة"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.notes || "لا توجد ملاحظات"}
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

export default JobDegredationDataDetails;
