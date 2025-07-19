import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TrainingDetails = ({ empId }) => {
  const [trainingData, setTrainingData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    courseName: "",
    place: "",
    startDate: "",
    endDate: "",
    grade: "",
    notes: "",
    type: 0,
  });

  useEffect(() => {
    // Fetch training data from API or other source
    const fetchTrainingData = async () => {
      const response = await fetch("http://193.227.24.29:5000/api/Training");
      const data = await response.json();
      setTrainingData(data);
    };

    fetchTrainingData();
  }, []);

  const handleAddClick = () => {
    setFormData({
      courseName: "",
      place: "",
      startDate: "",
      endDate: "",
      grade: "",
      notes: "",
      type: 0,
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      courseName: item.courseName,
      place: item.place,
      startDate: item.startDate,
      endDate: item.endDate,
      grade: item.grade,
      notes: item.notes,
      type: item.type,
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
      nationalId: empId,
    };

    try {
      let response;
      if (isEditMode && editingId) {
        response = await fetch(
          `http://193.227.24.29:5000/api/Training/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = trainingData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/Training`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/Training`
        );
        const newData = await updatedData.json();

        setTrainingData(newData);
        setShowForm(false);
        setFormData({
          courseName: "",
          place: "",
          startDate: "",
          endDate: "",
          grade: "",
          notes: "",
          type: 0,
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
      "هل أنت متأكد أنك تريد حذف هذا التدريب   ؟"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/Training/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = trainingData.filter((item) => item.id !== id);
        setTrainingData(updated);
      } else {
        console.error("فشل في الحذف من السيرفر");
      }
    } catch (error) {
      console.error("خطأ أثناء الحذف:", error);
    }
  };

  return (
    <>
      <>
        <div className="w-[98%] mx-auto mt-3">
          <div className="text-[15px] text-white mb-2 p-3 bg-[#176d6a] text-right flex justify-between items-center">
            <span> بيانات التدريب</span>
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
                    htmlFor="courseName"
                    className="block mb-1 text-sm text-gray-700"
                  >
                    اسم الدورة
                  </label>
                  <input
                    id="courseName"
                    type="text"
                    name="courseName"
                    placeholder="ادخل اسم الدورة"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div className="w-full md:w-[24%]">
                  <label
                    htmlFor="place"
                    className="block mb-1 text-sm text-gray-700"
                  >
                    الجهة / المكان
                  </label>
                  <input
                    id="place"
                    type="text"
                    name="place"
                    placeholder="ادخل الجهة"
                    value={formData.place}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div className="w-full md:w-[24%]">
                  <label
                    htmlFor="startDate"
                    className="block mb-1 text-sm text-gray-700"
                  >
                    تاريخ البداية
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div className="w-full md:w-[24%]">
                  <label
                    htmlFor="endDate"
                    className="block mb-1 text-sm text-gray-700"
                  >
                    تاريخ النهاية
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div className="w-full md:w-[24%]">
                  <label
                    htmlFor="grade"
                    className="block mb-1 text-sm text-gray-700"
                  >
                    التقدير
                  </label>
                  <input
                    id="grade"
                    type="text"
                    name="grade"
                    placeholder="ادخل التقدير"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div className="w-full md:w-[24%]">
                  <label
                    htmlFor="type"
                    className="block mb-1 text-sm text-gray-700"
                  >
                    النوع
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value={0}>اختر النوع</option>
                    <option value={1}>داخلي</option>
                    <option value={2}>خارجي</option>
                  </select>
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
                    placeholder="أدخل الملاحظات"
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

          {trainingData &&
          trainingData.filter((item) => item.nationalId == empId).length > 0 ? (
            <div className="overflow-x-auto bg-white p-4 rounded shadow">
              <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">م</th>

                    <th className="px-4 py-2 border"> اسم الدورة</th>
                    <th className="px-4 py-2 border"> مكان انعقاد الدورة </th>
                    <th className="px-4 py-2 border"> تاريخ بداية الدورة</th>
                    <th className="px-4 py-2 border"> تاريخ نهاية الدورة</th>
                    <th className="px-4 py-2 border"> التقدير</th>
                    <th className="px-4 py-2 border"> ملاحظات</th>
                    <th className="py-2 px-4 border">الخيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingData
                    .filter((item) => item.nationalId == empId)
                    .sort((a, b) => a.code - b.code)
                    .map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{item.courseName}</td>
                        <td className="px-4 py-2 border">
                          {item.place || "لا يوجد مكان"}
                        </td>
                        <td className="px-4 py-2 border">
                          {item.startDate || "لا يوجد تاريخ"}
                        </td>
                        <td className="px-4 py-2 border">
                          {item.endDate || "لا يوجد تاريخ"}
                        </td>
                        <td className="px-4 py-2 border">
                          {item.grade || "لا يوجد تقدير"}
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
            <p className="text-center text-gray-500 mt-6">
              لا توجد بيانات متاحة
            </p>
          )}
        </div>
      </>
    </>
  );
};

export default TrainingDetails;
