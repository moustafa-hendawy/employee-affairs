import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SalaryDetails = ({ empId }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: 0,
    agr_Wasefy: 0,
    agr_Mokamel: 0,
    hafez_Taawedy: 0,
    m_asasy30: 0,
    hafez_Thabet: 0,
    moKafat_Emt7anat: 0,
    all_Badalt: 0,
    badalat_Okhra: 0,
    all_Mok: 0,
    notes: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Salary`);
        const data = await response.json();

        setSalaryData(data);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };

    fetchSalaryData();
  }, []);
  const handleAddClick = () => {
    setFormData({
      code: 0,
      agr_Wasefy: 0,
      agr_Mokamel: 0,
      hafez_Taawedy: 0,
      m_asasy30: 0,
      hafez_Thabet: 0,
      moKafat_Emt7anat: 0,
      all_Badalt: 0,
      badalat_Okhra: 0,
      all_Mok: 0,
      notes: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      code: 0,
      agr_Wasefy: item.agr_Wasefy,
      agr_Mokamel: item.agr_Mokamel,
      hafez_Taawedy: item.hafez_Taawedy,
      m_asasy30: item.m_asasy30,
      hafez_Thabet: item.hafez_Thabet,
      moKafat_Emt7anat: item.moKafat_Emt7anat,
      all_Badalt: item.all_Badalt,
      badalat_Okhra: item.badalat_Okhra,
      all_Mok: item.all_Mok,
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
          `http://193.227.24.29:5000/api/Salary/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = salaryData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/Salary`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(`http://193.227.24.29:5000/api/Salary`);
        const newData = await updatedData.json();

        setSalaryData(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          agr_Wasefy: 0,
          agr_Mokamel: 0,
          hafez_Taawedy: 0,
          m_asasy30: 0,
          hafez_Thabet: 0,
          moKafat_Emt7anat: 0,
          all_Badalt: 0,
          badalat_Okhra: 0,
          all_Mok: 0,
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
      "هل أنت متأكد أنك تريد حذف هذا الراتب ؟ "
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/Salary/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = salaryData.filter((item) => item.id !== id);
        setSalaryData(updated);
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
          <span> بيانات الراتب</span>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  أجر وظيفي
                </label>
                <input
                  type="number"
                  name="agr_Wasefy"
                  value={formData.agr_Wasefy}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  أجر مكمل
                </label>
                <input
                  type="number"
                  name="agr_Mokamel"
                  value={formData.agr_Mokamel}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  حافز تعويضي
                </label>
                <input
                  type="number"
                  name="hafez_Taawedy"
                  value={formData.hafez_Taawedy}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  أساسي 6/30
                </label>
                <input
                  type="number"
                  name="m_asasy30"
                  value={formData.m_asasy30}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  الحافز الثابت
                </label>
                <input
                  type="number"
                  name="hafez_Thabet"
                  value={formData.hafez_Thabet}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  مكافأة امتحانات
                </label>
                <input
                  type="number"
                  name="moKafat_Emt7anat"
                  value={formData.moKafat_Emt7anat}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  كل البدلات
                </label>
                <input
                  type="number"
                  name="all_Badalt"
                  value={formData.all_Badalt}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  بدلات أخرى
                </label>
                <input
                  type="number"
                  name="badalat_Okhra"
                  value={formData.badalat_Okhra}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  جملة المكافآت
                </label>
                <input
                  type="number"
                  name="all_Mok"
                  value={formData.all_Mok}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm text-gray-700 mb-1">
                  ملاحظات
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="border p-2 rounded w-full"
                ></textarea>
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

        {salaryData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> أجر وظيفي</th>
                  <th className="px-4 py-2 border"> أجر مكمل</th>
                  <th className="px-4 py-2 border"> حافز تعويضي </th>
                  <th className="px-4 py-2 border"> أساسي 6/30 </th>
                  <th className="px-4 py-2 border">الحافز الثابت 100%</th>
                  <th className="px-4 py-2 border">مكافأة امتحانات</th>
                  <th className="px-4 py-2 border">كل البدالات</th>
                  <th className="px-4 py-2 border">بدلات اخري</th>
                  <th className="px-4 py-2 border">جملة المكافآت</th>
                  <th className="px-4 py-2 border">ملاحظات</th>
                  <th className="py-2 px-4 border">الخيارات</th>
                </tr>
              </thead>
              <tbody>
                {salaryData
                  .filter((item) => item.empId == empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {item.agr_Wasefy || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.agr_Mokamel || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.hafez_Taawedy || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.m_asasy30 || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.hafez_Thabet || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.moKafat_Emt7anat || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.all_Badalt || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.badalat_Okhra || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.all_Mok || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.notes || "لا توجد بيانات"}
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

export default SalaryDetails;
