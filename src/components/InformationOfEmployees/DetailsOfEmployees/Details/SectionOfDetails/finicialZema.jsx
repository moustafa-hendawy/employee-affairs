import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const FinicialZema = ({ empId }) => {
  const [financialData, setFinancialData] = useState([]);
  const [f, setF] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    code: 0,
    requiredZemaNo: 0,
    finicialZemaTypeId: 0,
    lastDecisionDate: "",
    newSubmissionDate: "",
    submitted: false,
    submissionDate: "",
    graftGoingDate: "",
    graftComingDate: "",
    notes: "",
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/FinicialZema`
        );
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchFinancialData();
  }, []);

  useEffect(() => {
    const fetchFinancialDataType = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/FinicialZemaType`
        );
        const data = await response.json();
        setF(data);
      } catch (error) {
        console.error("Error fetching financial data types:", error);
      }
    };

    fetchFinancialDataType();
  }, []);

  const handleAddClick = () => {
    setFormData({
      code: 0,
      requiredZemaNo: 0,
      finicialZemaTypeId: 0,
      lastDecisionDate: "",
      newSubmissionDate: "",
      submitted: false,
      submissionDate: "",
      graftGoingDate: "",
      graftComingDate: "",
      notes: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      code: item.code,
      requiredZemaNo: item.requiredZemaNo,
      finicialZemaTypeId: item.finicialZemaTypeId,
      lastDecisionDate: item.lastDecisionDate,
      newSubmissionDate: item.newSubmissionDate,
      submitted: item.submitted,
      submissionDate: item.submissionDate,
      graftGoingDate: item.graftGoingDate,
      graftComingDate: item.graftComingDate,
      notes: item.notes,
    });
    setIsEditMode(true);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
          `http://193.227.24.29:5000/api/FinicialZema/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = financialData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/FinicialZema`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/FinicialZema`
        );
        const newData = await updatedData.json();
        setFinancialData(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          requiredZemaNo: 0,
          finicialZemaTypeId: 0,
          lastDecisionDate: "",
          newSubmissionDate: "",
          submitted: false,
          submissionDate: "",
          graftGoingDate: "",
          graftComingDate: "",
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
      "هل أنت متأكد أنك تريد حذف هذه العلاوة؟"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://193.227.24.29:5000/api/FinicialZema/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = financialData.filter((item) => item.id !== id);
        setFinancialData(updated);
      } else {
        console.error("فشل في الحذف من السيرفر");
      }
    } catch (error) {
      console.error("خطأ أثناء الحذف:", error);
    }
  };

  const filteredData = financialData
    .filter((item) => item.empId === empId)
    .sort((a, b) => a.code - b.code);

  return (
    <div className="w-[98%] mx-auto mt-3">
      <div className="text-[15px] text-white mb-2 p-3 bg-[#176d6a] text-right flex justify-between items-center">
        <span>بيانات الذمة المالية</span>
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                نوع الذمة المالية
              </label>
              <select
                name="finicialZemaTypeId"
                value={formData.finicialZemaTypeId}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              >
                <option value="">اختر نوع الذمة</option>
                {f.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                عدد الإقرارات المطلوبة
              </label>
              <input
                type="number"
                name="requiredZemaNo"
                value={formData.requiredZemaNo}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                تاريخ آخر إقرار
              </label>
              <input
                type="date"
                name="lastDecisionDate"
                value={formData.lastDecisionDate}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                تاريخ المطالبة الجديد
              </label>
              <input
                type="date"
                name="newSubmissionDate"
                value={formData.newSubmissionDate}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">تم التقديم؟</label>
              <input
                type="checkbox"
                name="submitted"
                checked={formData.submitted}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                تاريخ التقديم
              </label>
              <input
                type="date"
                name="submissionDate"
                value={formData.submissionDate}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                تاريخ الذهاب للكسب
              </label>
              <input
                type="date"
                name="graftGoingDate"
                value={formData.graftGoingDate}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                تاريخ العودة من الكسب
              </label>
              <input
                type="date"
                name="graftComingDate"
                value={formData.graftComingDate}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium">ملاحظات</label>
              <input
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

      {filteredData.length > 0 && (
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <table className="min-w-full bg-white border text-right rtl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border whitespace-nowrap">م</th>
                <th className="py-2 px-4 border whitespace-nowrap">
                  عدد الإقرارات المطلوبة
                </th>
                <th className="py-2 px-4 border whitespace-nowrap">النوع</th>
                <th className="py-2 px-4 border whitespace-nowrap">
                  تاريخ آخر إقرار
                </th>
                <th className="py-2 px-4 border whitespace-nowrap">
                  تاريخ المطالبة
                </th>
                <th className="py-2 px-4 border whitespace-nowrap">
                  تم التقديم
                </th>
                <th className="py-2 px-4 border whitespace-nowrap">
                  تاريخ التقديم
                </th>
                <th className="py-2 px-4 border whitespace-nowrap">
                  ذهاب للكسب
                </th>
                <th className="py-2 px-4 border whitespace-nowrap">
                  عودة من الكسب
                </th>
                <th className="py-2 px-4 border whitespace-nowrap">ملاحظات</th>
                <th className="py-2 px-4 border whitespace-nowrap">خيارات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {item.requiredZemaNo || "لا توجد"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {f.find((type) => type.id === item.finicialZemaTypeId)
                      ?.name || "لا توجد"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {item.lastDecisionDate || "—"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {item.newSubmissionDate || "—"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {item.submitted ? "نعم" : "لا"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {item.submissionDate || "—"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {item.graftGoingDate || "—"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {item.graftComingDate || "—"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {item.notes || "—"}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
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
      )}
    </div>
  );
};

export default FinicialZema;
