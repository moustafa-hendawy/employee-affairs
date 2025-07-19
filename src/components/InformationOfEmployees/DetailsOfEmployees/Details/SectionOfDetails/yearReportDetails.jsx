import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const YearReportDetails = ({ empId }) => {
  const [yearReports, setYearReports] = useState([]);
  const [yearReportsGrade, setYearReportsGrade] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    year: "",
    degree: "",
    gradeId: "",
    notes: "",
  });

  useEffect(() => {
    const fetchYearReports = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/YearReport`
        );
        const data = await response.json();
        setYearReports(data);
      } catch (error) {
        console.error("Error fetching year report data:", error);
      }
    };

    fetchYearReports();
  }, []);

  useEffect(() => {
    const fetchYearReportsGrade = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/YearReportGrade`
        );
        const data = await response.json();
        setYearReportsGrade(data);
      } catch (error) {
        console.error("Error fetching year report grade data:", error);
      }
    };

    fetchYearReportsGrade();
  }, []);

  const handleAddClick = () => {
    setFormData({
      year: 0,
      degree: "",
      gradeId: "",
      notes: "",
      code: 0,
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      year: item.year,
      degree: item.degree,
      gradeId: item.gradeId,
      notes: item.notes,
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
          `http://193.227.24.29:5000/api/YearReport/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = yearReports.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/YearReport`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/YearReport`
        );
        const newData = await updatedData.json();
        setYearReports(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          year: 0,
          degree: "",
          gradeId: "",
          notes: "",
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
      "هل أنت متأكد أنك تريد حذف هذا التقرير "
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/YearReport/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = yearReports.filter((item) => item.id !== id);
        setYearReports(updated);
      } else {
        console.error("فشل في الحذف من السيرفر");
      }
    } catch (error) {
      console.error("خطأ أثناء الحذف:", error);
    }
  };

  const filteredData = yearReports
    .filter((item) => item.empId === empId)
    .sort((a, b) => a.code - b.code);

  return (
    <div className="w-[98%] mx-auto mt-3">
      <div className="text-[15px] text-white mb-2 p-3 bg-[#176d6a] text-right flex justify-between items-center">
        <span> بيانات التقارير السنوية</span>
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
                placeholder="ادخل الكود"
                value={formData.code}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="w-full md:w-[24%]">
              <label
                htmlFor="year"
                className="block mb-1 text-sm text-gray-700"
              >
                سنة التقرير
              </label>
              <input
                id="year"
                type="text"
                name="year"
                placeholder="أدخل سنة التقرير"
                value={formData.year || ""}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="w-full md:w-[24%]">
              <label
                htmlFor="degree"
                className="block mb-1 text-sm text-gray-700"
              >
                الدرجة
              </label>
              <input
                id="degree"
                type="number"
                name="degree"
                placeholder="أدخل الدرجة"
                value={formData.degree || ""}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="w-full md:w-[24%]">
              <label
                htmlFor="gradeId"
                className="block mb-1 text-sm text-gray-700"
              >
                التقدير
              </label>
              <select
                id="gradeId"
                name="gradeId"
                value={formData.gradeId || ""}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              >
                <option value="">اختر التقدير</option>
                {yearReportsGrade.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-[24%]">
              <label
                htmlFor="notes"
                className="block mb-1 text-sm text-gray-700"
              >
                الملاحظات
              </label>
              <input
                id="notes"
                type="text"
                name="notes"
                placeholder="أدخل ملاحظات"
                value={formData.notes || ""}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#176d6a] text-white px-4 py-2 rounded"
            >
              {isEditMode ? "تعديل" : "إضافة"}
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

      {filteredData.length > 0 ? (
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">م</th>
                <th className="px-4 py-2 border">سنة التقرير</th>
                <th className="px-4 py-2 border">
                  الدرجة التي حصل عليها الموظف
                </th>
                <th className="px-4 py-2 border">التقدير</th>
                <th className="px-4 py-2 border">ملاحظات</th>
                <th className="py-2 px-4 border">الخيارات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    {item.year || "لا توجد بيانات"}
                  </td>
                  <td className="px-4 py-2 border">
                    {item.degree || "لا توجد بيانات"}
                  </td>
                  <td className="px-4 py-2 border">
                    {yearReportsGrade.find((type) => type.id === item.gradeId)
                      ?.name || "لا توجد بيانات"}
                  </td>
                  <td className="px-4 py-2 border">
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
  );
};

export default YearReportDetails;
