import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MandateDataDetails = ({ empId }) => {
  const [mandateData, setMandateData] = useState(null);
  const [mandateDataType, setMandateDataType] = useState(null);
  const [facultyData, setFacultyData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: 0,
    mandateTypeId: 0,
    facultyId: 0,
    isMandated: false,
    geha: "",
    mandateJob: "",
    decisionNo: 0,
    decisionDate: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchMandateData = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/MandateData`
        );
        const data = await response.json();
        setMandateData(data);
      } catch (error) {
        console.error("Error fetching mandate data:", error);
      }
    };

    fetchMandateData();
  }, [empId]);

  useEffect(() => {
    const fetchMandateDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/MandateType`
        );
        const data = await response.json();
        setMandateDataType(data);
      } catch (error) {
        console.error("Error fetching mandate data:", error);
      }
    };

    fetchMandateDataType();
  }, [empId]);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Faculty`);
        const data = await response.json();
        setFacultyData(data);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchFacultyData();
  }, [empId]);

  const handleAddClick = () => {
    setFormData({
      code: 0,
      mandateTypeId: 0,
      facultyId: 0,
      isMandated: false,
      geha: "",
      mandateJob: "",
      decisionNo: 0,
      decisionDate: "",
      startDate: "",
      endDate: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      code: item.code,
      mandateTypeId: item.mandateTypeId,
      facultyId: item.facultyId,
      isMandated: item.isMandated,
      geha: item.geha,
      mandateJob: item.mandateJob,
      decisionNo: item.decisionNo,
      decisionDate: item.decisionDate,
      startDate: item.startDate,
      endDate: item.endDate,
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
    console.log(payload);

    try {
      let response;
      if (isEditMode && editingId) {
        response = await fetch(
          `http://193.227.24.29:5000/api/MandateData/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = mandateData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/MandateData`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/MandateData`
        );
        const newData = await updatedData.json();

        setMandateData(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          mandateTypeId: 0,
          facultyId: 0,
          isMandated: false,
          geha: "",
          mandateJob: "",
          decisionNo: 0,
          decisionDate: "",
          startDate: "",
          endDate: "",
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
      "هل أنت متأكد أنك تريد حذف هذا الانتداب   ؟"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/MandateData/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = mandateData.filter((item) => item.id !== id);
        setMandateData(updated);
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
          <span> بيانات الانتداب</span>
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
                  htmlFor="mandateTypeId"
                  className="block mb-1 text-sm text-gray-700"
                >
                  نوع الانتداب
                </label>
                <select
                  id="mandateTypeId"
                  name="mandateTypeId"
                  value={formData.mandateTypeId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر النوع</option>
                  {mandateDataType &&
                    mandateDataType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="facultyId"
                  className="block mb-1 text-sm text-gray-700"
                >
                  الكلية
                </label>
                <select
                  id="facultyId"
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>اختر الكلية</option>
                  {facultyData &&
                    facultyData.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="geha"
                  className="block mb-1 text-sm text-gray-700"
                >
                  الجهة
                </label>
                <input
                  id="geha"
                  type="text"
                  name="geha"
                  placeholder="ادخل الجهة"
                  value={formData.geha}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="isMandated"
                  className="block mb-1 text-sm text-gray-700"
                >
                  منتدب ؟
                </label>
                <input
                  id="isMandated"
                  type="checkbox"
                  name="isMandated"
                  value={formData.isMandated}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label
                  htmlFor="mandateJob"
                  className="block mb-1 text-sm text-gray-700"
                >
                  وظيفة المنتدب
                </label>
                <input
                  id="mandateJob"
                  type="text"
                  name="mandateJob"
                  placeholder="ادخل الوظيفة"
                  value={formData.mandateJob}
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

        {mandateData &&
        mandateData.filter((item) => item.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>

                  <th className="px-4 py-2 border"> الجهة</th>
                  <th className="px-4 py-2 border"> قائمة جهة الانتداب</th>
                  <th className="px-4 py-2 border"> منتدب</th>
                  <th className="px-4 py-2 border"> نوع الانتداب</th>
                  <th className="px-4 py-2 border">
                    الوظيفة المنتدب (عليها / اليها ) بالقرار رقم
                  </th>
                  <th className="px-4 py-2 border"> رقم قرار الندب</th>
                  <th className="px-4 py-2 border"> تاريخ قرار الندب</th>
                  <th className="px-4 py-2 border"> تاريخ بداية الانتداب</th>
                  <th className="px-4 py-2 border"> تاريخ نهاية الانتداب</th>
                  <th className="py-2 px-4 border">الخيارات</th>
                </tr>
              </thead>
              <tbody>
                {mandateData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.geha || "لا يوجد جهة"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {facultyData?.find(
                          (faculty) => faculty.id == item.facultyId
                        )?.name || "لا توجد بيانات"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.isMandated ? "نعم" : "لا" || " لا يوجد بيانات "}
                      </td>
                      <td className="px-4 py-2 border">
                        {mandateDataType?.find(
                          (type) => type.id == item.mandateTypeId
                        )?.name || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.mandateJob || "لا يوجد وظيفة"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.decisionDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.startDate || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.endDate || "لا يوجد تاريخ"}
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

export default MandateDataDetails;
