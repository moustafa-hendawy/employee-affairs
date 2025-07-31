import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const VacationDetails = ({ empId }) => {
  const [vacationData, setVacationData] = useState(null);
  const [vacationDataType, setVacationDataType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: 0,
    ended: true,
    place: "",
    vacationTypeId: 0,
    startDate: "",
    endDate: "",
    returnDate: "",
    decisionNo: 0,
    decisionDate: "",
    notes: "",
  });

  useEffect(() => {
    const fetchVacationData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Vacation`);
        const data = await response.json();

        setVacationData(data);
      } catch (error) {
        console.error("Error fetching vacation data:", error);
      }
    };

    fetchVacationData();
  }, []);

  useEffect(() => {
    const fetchVacationDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/VacationType`
        );
        const data = await response.json();

        setVacationDataType(data);
      } catch (error) {
        console.error("Error fetching vacation data type:", error);
      }
    };

    fetchVacationDataType();
  }, [vacationData, empId]);

  const handleAddClick = () => {
    setFormData({
      code: 0,
      ended: true,
      place: "",
      vacationTypeId: 0,
      startDate: "",
      endDate: "",
      returnDate: "",
      decisionNo: 0,
      decisionDate: "",
      notes: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      code: item.code,
      ended: item.ended,
      place: item.place,
      vacationTypeId: item.vacationTypeId,
      startDate: item.startDate,
      endDate: item.endDate,
      returnDate: item.returnDate,
      decisionNo: item.decisionNo,
      decisionDate: item.decisionDate,
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
          `http://193.227.24.29:5000/api/Vacation/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = vacationData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/Vacation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/Vacation`
        );
        const newData = await updatedData.json();

        setVacationData(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          ended: true,
          place: "",
          vacationTypeId: 0,
          startDate: "",
          endDate: "",
          returnDate: "",
          decisionNo: 0,
          decisionDate: "",
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
      "هل أنت متأكد أنك تريد حذف هذه الاجازة   ؟"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/Vacation/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = vacationData.filter((item) => item.id !== id);
        setVacationData(updated);
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
          <span> بيانات الاجازات</span>
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
                  htmlFor="vacationTypeId"
                  className="block mb-1 text-sm text-gray-700"
                >
                  نوع الإجازة
                </label>
                <select
                  id="vacationTypeId"
                  name="vacationTypeId"
                  value={formData.vacationTypeId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر النوع</option>
                  {vacationDataType &&
                    vacationDataType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="place"
                  className="block mb-1 text-sm text-gray-700"
                >
                  الجهة
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
                  htmlFor="returnDate"
                  className="block mb-1 text-sm text-gray-700"
                >
                  تاريخ العودة
                </label>
                <input
                  id="returnDate"
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
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

              <div className="w-full md:w-[24%] flex items-center mt-6">
                <input
                  id="ended"
                  type="checkbox"
                  name="ended"
                  checked={formData.ended}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ended: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="ended" className="text-sm text-gray-700">
                  هل انتهت الإجازة؟
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

        {vacationData &&
        vacationData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border">هل انتهت الاجازة</th>

                  <th className="px-4 py-2 border"> نوع الاجازة </th>
                  <th className="px-4 py-2 border"> الجهة</th>
                  <th className="px-4 py-2 border"> تاريخ بداية الاجازة</th>
                  <th className="px-4 py-2 border"> تاريخ نهاية الاجازة</th>

                  <th className="px-4 py-2 border"> تاريخ العودة </th>
                  <th className="px-4 py-2 border"> رقم القرار </th>
                  <th className="px-4 py-2 border"> تاريخ القرار </th>

                  <th className="px-4 py-2 border"> ملاحظات </th>
                  <th className="py-2 px-4 border">الخيارات</th>
                </tr>
              </thead>
              <tbody>
                {vacationData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.ended ? "نعم" : "لا" || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {vacationDataType?.find(
                          (type) => type.id === item.vacationTypeId
                        )?.name || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.place || "لا يوجد جهة"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.startDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.endDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.returnDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.decisionDate || "لا يوجد تاريخ"}
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

export default VacationDetails;
