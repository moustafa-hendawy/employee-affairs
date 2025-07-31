import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const LagnaDetails = ({ empId }) => {
  const [lagnaData, setLagnaData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    memberType: "",
    decisionNo: "",
    decisionDate: "",
    code: 0,
  });

  useEffect(() => {
    const fetchLagnaData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Lagna`);
        const data = await response.json();

        setLagnaData(data);
      } catch (error) {
        console.error("Error fetching lagna data:", error);
      }
    };

    fetchLagnaData();
  }, [empId]);

  const handleAddClick = () => {
    setFormData({
      name: "",
      memberType: "",
      decisionNo: "",
      decisionDate: "",
      code: 0,
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      name: item.name,
      memberType: item.memberType,
      decisionNo: item.decisionNo,
      decisionDate: item.decisionDate,
      code: item.code,
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
          `http://193.227.24.29:5000/api/Lagna/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = lagnaData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/Lagna`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(`http://193.227.24.29:5000/api/Lagna`);
        const newData = await updatedData.json();

        setLagnaData(newData);
        setShowForm(false);
        setFormData({
          name: "",
          memberType: "",
          decisionNo: "",
          decisionDate: "",
          code: 0,
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
      "هل أنت متأكد أنك تريد حذف هذه اللجنة؟"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/Lagna/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = lagnaData.filter((item) => item.id !== id);
        setLagnaData(updated);
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
          <span> بيانات اللجنة</span>
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
              <div className="w-full ">
                <label
                  htmlFor="year"
                  className="block mb-1 text-sm text-gray-700"
                >
                  اسم اللجنة
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="أدخل اسم اللجنة "
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
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
                  htmlFor="degree"
                  className="block mb-1 text-sm text-gray-700"
                >
                  الصفة داخل اللجنة
                </label>
                <input
                  id="memberType"
                  type="text"
                  name="memberType"
                  placeholder="أدخل   الصفة داخل اللجنة"
                  value={formData.memberType || ""}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="decisionNo"
                  className="block mb-1 text-sm text-gray-700"
                >
                  رقم قرار اللجنة
                </label>
                <input
                  id="decisionNo"
                  type="number"
                  name="decisionNo"
                  placeholder="أدخل رقم قرار اللجنة"
                  value={formData.decisionNo || ""}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="decisionDate"
                  className="block mb-1 text-sm text-gray-700"
                >
                  تاريخ قرار اللجنة
                </label>
                <input
                  id="decisionDate"
                  type="date"
                  name="decisionDate"
                  placeholder="أدخل تاريخ قرار اللجنة"
                  value={formData.decisionDate || ""}
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

        {lagnaData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> اسم اللجنة</th>
                  <th className="px-4 py-2 border"> الصفة داخل اللجنة</th>
                  <th className="px-4 py-2 border">رقم قرار اللجنة</th>
                  <th className="px-4 py-2 border">تاريخ القرار</th>
                  <th className="py-2 px-4 border">الخيارات</th>
                </tr>
              </thead>
              <tbody>
                {lagnaData
                  .filter((item) => item.empId == empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {item.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.memberType || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا توجد ملاحظات"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionDate || "لا توجد ملاحظات"}
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

export default LagnaDetails;
