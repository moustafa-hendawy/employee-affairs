import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PenaltyDetails = ({ empId }) => {
  const [penaltyData, setPenaltyData] = useState(null);
  const [penaltyDataCase, setPenaltyDataCase] = useState(null);
  const [penaltyDataType, setPenaltyDataType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: 0,
    penaltyTypeId: 0,
    penaltyCaseId: 0,
    startDate: "",
    endDate: "",
    decisionNo: 0,
    decisionDate: "",
    isCanceled: true,
    cancelationDate: "",
    cancelationDecisionNo: 0,
    cancelationReason: "",
  });

  useEffect(() => {
    const fetchPenaltyData = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Penalty`);
        const data = await response.json();

        setPenaltyData(data);
      } catch (error) {
        console.error("Error fetching penalty data:", error);
      }
    };

    fetchPenaltyData();
  }, [empId]);
  useEffect(() => {
    const fetchPenaltyDataCase = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/PenaltyCase`
        );
        const data = await response.json();

        setPenaltyDataCase(data);
      } catch (error) {
        console.error("Error fetching penalty data case:", error);
      }
    };

    fetchPenaltyDataCase();
  }, [empId]);
  useEffect(() => {
    const fetchPenaltyDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/PenaltyType`
        );
        const data = await response.json();

        setPenaltyDataType(data);
      } catch (error) {
        console.error("Error fetching penalty data type:", error);
      }
    };

    fetchPenaltyDataType();
  }, [empId]);

  const handleAddClick = () => {
    setFormData({
      code: 0,
      penaltyTypeId: 0,
      penaltyCaseId: 0,
      startDate: "",
      endDate: "",
      decisionNo: 0,
      decisionDate: "",
      isCanceled: true,
      cancelationDate: "",
      cancelationDecisionNo: 0,
      cancelationReason: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      code: item.code,
      penaltyTypeId: item.penaltyTypeId,
      penaltyCaseId: item.penaltyCaseId,
      startDate: item.startDate,
      endDate: item.endDate,
      decisionNo: item.decisionNo,
      decisionDate: item.decisionDate,
      isCanceled: item.isCanceled,
      cancelationDate: item.cancelationDate,
      cancelationDecisionNo: item.cancelationDecisionNo,
      cancelationReason: item.cancelationReason,
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
          `http://193.227.24.29:5000/api/Penalty/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = penaltyData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/Penalty`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/Penalty`
        );
        const newData = await updatedData.json();

        setPenaltyData(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          penaltyTypeId: 0,
          penaltyCaseId: 0,
          startDate: "",
          endDate: "",
          decisionNo: 0,
          decisionDate: "",
          isCanceled: true,
          cancelationDate: "",
          cancelationDecisionNo: 0,
          cancelationReason: "",
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
      "هل أنت متأكد أنك تريد حذف هذا الجزاء ؟"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/Penalty/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = penaltyData.filter((item) => item.id !== id);
        setPenaltyData(updated);
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
          <span> بيانات الجزاءات</span>
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
                <label className="block mb-1 text-sm text-gray-700">
                  نوع الجزاء
                </label>
                <select
                  name="penaltyTypeId"
                  value={formData.penaltyTypeId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="">اختر نوع الجزاء</option>
                  {penaltyDataType?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  حالة الجزاء
                </label>
                <select
                  name="penaltyCaseId"
                  value={formData.penaltyCaseId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="">اختر حالة الجزاء</option>
                  {penaltyDataCase?.map((penaltyCase) => (
                    <option key={penaltyCase.id} value={penaltyCase.id}>
                      {penaltyCase.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  تاريخ البداية
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  تاريخ النهاية
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
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
                  name="decisionNo"
                  value={formData.decisionNo}
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
                  تم الإلغاء؟
                </label>
                <select
                  name="isCanceled"
                  value={formData.isCanceled}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                >
                  <option value={true}>نعم</option>
                  <option value={false}>لا</option>
                </select>
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  تاريخ الإلغاء
                </label>
                <input
                  type="date"
                  name="cancelationDate"
                  value={formData.cancelationDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full md:w-[24%]">
                <label className="block mb-1 text-sm text-gray-700">
                  رقم قرار الإلغاء
                </label>
                <input
                  type="number"
                  name="cancelationDecisionNo"
                  value={formData.cancelationDecisionNo}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="w-full">
                <label className="block mb-1 text-sm text-gray-700">
                  سبب الإلغاء
                </label>
                <textarea
                  name="cancelationReason"
                  value={formData.cancelationReason}
                  onChange={handleInputChange}
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

        {penaltyData &&
        penaltyData.filter((item) => item.empId === empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full mt-1 text-right border border-gray-300 rtl">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">م</th>
                  <th className="px-4 py-2 border"> نوع الجزاء</th>

                  <th className="px-4 py-2 border">تاريخ بداية الجزاء</th>
                  <th className="px-4 py-2 border"> تاريخ نهاية الجزاء</th>
                  <th className="px-4 py-2 border"> رقم القرار</th>
                  <th className="px-4 py-2 border"> تتاريخ القرار</th>
                  <th className="px-4 py-2 border"> الاعفاء من الجزاء</th>
                  <th className="px-4 py-2 border">
                    {" "}
                    تاريخ الاعفاء من الجزاء{" "}
                  </th>
                  <th className="px-4 py-2 border">
                    {" "}
                    رقم قرار الاعفاء من الجزاء{" "}
                  </th>
                  <th className="px-4 py-2 border"> سبب الغاء الجزاء</th>
                  <th className="px-4 py-2 border"> حالة الجزاء</th>
                  <th className="py-2 px-4 border">الخيارات</th>
                </tr>
              </thead>
              <tbody>
                {penaltyData
                  .filter((item) => item.empId === empId)
                  .sort((a, b) => a.code - b.code)
                  .map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {penaltyDataType?.find(
                          (type) => type.id === item.penaltyTypeId
                        )?.name || "لا توجد بيانات"}
                      </td>

                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.startDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.endDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.decisionNo || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.decisionDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.isCanceled ? "نعم" : "لا" || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {item.cancelationDate || "لا يوجد تاريخ"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.cancelationDecisionNo || "لا يوجد رقم قرار"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item.cancelationReason || "لا يوجد سبب"}
                      </td>
                      <td className="px-4 py-2 border">
                        {penaltyDataCase?.find(
                          (caseItem) => caseItem.id == item.penaltyCaseId
                        )?.name || "لا توجد حالة"}
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

export default PenaltyDetails;
