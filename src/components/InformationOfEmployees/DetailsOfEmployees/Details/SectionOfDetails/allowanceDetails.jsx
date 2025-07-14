import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllowanceDetails = ({ empId }) => {
  const [allowanceData, setAllowanceData] = useState([]);
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    allowanceTypeId: "",
    decisionNo: "",
    decisionDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allowRes, typeRes] = await Promise.all([
          fetch(`http://193.227.24.29:5000/api/Allowance`),
          fetch(`http://193.227.24.29:5000/api/AllowanceType`),
        ]);
        const [allowData, typeData] = await Promise.all([
          allowRes.json(),
          typeRes.json(),
        ]);
        setAllowanceData(allowData);
        setAllowanceTypes(typeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddClick = () => {
    setFormData({
      allowanceTypeId: "",
      decisionNo: "",
      decisionDate: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      allowanceTypeId: item.allowanceTypeId,
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
          `http://193.227.24.29:5000/api/Allowance/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        payload.code = allowanceData.length + 1;
        response = await fetch(`http://193.227.24.29:5000/api/Allowance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const updatedData = await fetch(
          `http://193.227.24.29:5000/api/Allowance`
        );
        const newData = await updatedData.json();
        setAllowanceData(newData);
        setShowForm(false);
        setFormData({
          code: 0,
          allowanceTypeId: "",
          decisionNo: "",
          decisionDate: "",
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
        `http://193.227.24.29:5000/api/Allowance/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updated = allowanceData.filter((item) => item.id !== id);
        setAllowanceData(updated);
      } else {
        console.error("فشل في الحذف من السيرفر");
      }
    } catch (error) {
      console.error("خطأ أثناء الحذف:", error);
    }
  };

  return (
    <div className="w-[98%] mx-auto mt-3">
      <div className="text-[15px] text-white mb-2 p-3 bg-[#176d6a] text-right flex justify-between items-center">
        <span>العلاوات</span>
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
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label
                htmlFor="allowanceTypeId"
                className="block mb-1 text-sm text-gray-700"
              >
                نوع العلاوة
              </label>
              <select
                id="allowanceTypeId"
                name="allowanceTypeId"
                value={formData.allowanceTypeId}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              >
                <option value="">اختر نوع العلاوة</option>
                {allowanceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="decisionNo"
                className="block mb-1 text-sm text-gray-700"
              >
                رقم القرار
              </label>
              <input
                id="decisionNo"
                type="text"
                name="decisionNo"
                placeholder="رقم القرار"
                value={formData.decisionNo}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="w-full">
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

            <div className="w-full">
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

      <div className="allowance-details">
        {allowanceData?.filter((a) => a.empId == empId).length > 0 ? (
          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full bg-white shadow-md mt-1 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 border">م</th>
                  <th className="py-2 px-4 border">نوع العلاوة</th>
                  <th className="py-2 px-4 border">رقم القرار</th>
                  <th className="py-2 px-4 border">تاريخ القرار</th>
                  <th className="py-2 px-4 border">الخيارات</th>
                </tr>
              </thead>
              <tbody>
                {allowanceData
                  .filter((a) => a.empId == empId)
                  .sort((a, b) => a.code - b.code)
                  .map((allowance, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">
                        {allowanceTypes.find(
                          (type) => type.id == allowance.allowanceTypeId
                        )?.name || "غير محدد"}
                      </td>
                      <td className="py-2 px-4 border">
                        {allowance.decisionNo}
                      </td>
                      <td className="py-2 px-4 border">
                        {allowance.decisionDate}
                      </td>
                      <td className="py-2 px-4 border">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(allowance)}
                            className="text-blue-600 p-1 hover:bg-blue-100 rounded"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(allowance.id)}
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
          <p className="text-right bg-white p-4 rounded shadow">
            لا توجد بيانات للعلاوات
          </p>
        )}
      </div>
    </div>
  );
};

export default AllowanceDetails;
