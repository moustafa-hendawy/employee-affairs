import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MilitaryState = ({ empId }) => {
  const [militaryData, setMilitaryData] = useState(null);
  const [militaryDataType, setMilitaryDataType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: 0,
    militaryStateTypeId: 0,
    date: "",
    notes: "",
    currentMilitaryState: false,
  });

  useEffect(() => {
    const fetchMilitaryData = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/MilitaryState`
        );
        const data = await response.json();

        setMilitaryData(data);
      } catch (error) {
        console.error("Error fetching military data:", error);
      }
    };

    fetchMilitaryData();
  }, [empId]);

  useEffect(() => {
    const fetchMilitaryDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/MilitaryStateType`
        );
        const data = await response.json();

        setMilitaryDataType(data);
      } catch (error) {
        console.error("Error fetching military state type:", error);
      }
    };

    fetchMilitaryDataType();
  }, [empId]);

  const handleAddClick = () => {
    setFormData({
      code: 0,
      militaryStateTypeId: 0,
      date: "",
      notes: "",
      currentMilitaryState: false,
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      code: item.code,
      militaryStateTypeId: item.militaryStateTypeId,
      date: item.date,
      notes: item.notes,
      currentMilitaryState: item.currentMilitaryState,
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
          `http://193.227.24.29:5000/api/MilitaryState/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = militaryData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/MilitaryState`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/MilitaryState`
        );
        const newData = await updatedData.json();

        setMilitaryData(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          militaryStateTypeId: 0,
          date: "",
          notes: "",
          currentMilitaryState: false,
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
      "هل أنت متأكد أنك تريد حذف هذا الموقف العسكري ؟"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/MilitaryState/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = militaryData.filter((item) => item.id !== id);
        setMilitaryData(updated);
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
          <span> بيانات الموقف العسكري</span>
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
                  htmlFor="militaryStateTypeId"
                  className="block mb-1 text-sm text-gray-700"
                >
                  نوع الموقف من التجنيد
                </label>
                <select
                  id="militaryStateTypeId"
                  name="militaryStateTypeId"
                  value={formData.militaryStateTypeId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر النوع</option>
                  {militaryDataType &&
                    militaryDataType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="date"
                  className="block mb-1 text-sm text-gray-700"
                >
                  التاريخ
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%] flex items-center mt-6">
                <input
                  id="currentMilitaryState"
                  type="checkbox"
                  name="currentMilitaryState"
                  checked={formData.currentMilitaryState}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentMilitaryState: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="currentMilitaryState"
                  className="text-sm text-gray-700"
                >
                  الموقف الحالي
                </label>
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
                  placeholder="أدخل ملاحظات"
                  value={formData.notes}
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

        {militaryData &&
        militaryData.filter((item) => item.empId === empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> نوع الموقف من التجنيد</th>

                  <th className="px-4 py-2 border">التاريخ</th>
                  <th className="px-4 py-2 border"> الموقف الحالي</th>
                  <th className="px-4 py-2 border"> ملاحظات</th>
                  <th className="py-2 px-4 border">الخيارات</th>
                </tr>
              </thead>
              <tbody>
                {militaryData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {militaryDataType?.find(
                          (type) => type.id === item.militaryStateTypeId
                        )?.name || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border">
                        {item.date || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.currentMilitaryState
                          ? "نعم"
                          : "لا" || "لا يوجد رقم قرار"}
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
    </>
  );
};

export default MilitaryState;
