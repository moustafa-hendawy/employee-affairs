import { useEffect, useState } from "react";

const PersonalInformationDisplay = ({ nationalId }) => {
  const [faculties, setFaculties] = useState([]);
  const [healthStates, setHealthStates] = useState([]);
  const [socialStates, setSocialStates] = useState([]);
  const [governrates, setGovernrates] = useState([]);

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/Employee?nationalId=${nationalId}`
        );
        const data = await response.json();
        setEmployee(data[0] || {});
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [nationalId]);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/Faculty")
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error("حدث خطأ أثناء جلب الكليات:", error));
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/HealthState")
      .then((res) => res.json())
      .then((data) => setHealthStates(data))
      .catch((error) => console.error("حدث خطأ أثناء جلب حالات الصحة:", error));
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/Governrate")
      .then((res) => res.json())
      .then((data) => setGovernrates(data))
      .catch((error) => console.error("حدث خطأ أثناء جلب المحافظات:", error));
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/SocialState")
      .then((res) => res.json())
      .then((data) => setSocialStates(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب الحالات الاجتماعية:", error)
      );
  }, []);

  // دالة مساعدة للحصول على اسم العنصر من الـ ID
  const getNameById = (id, array) => {
    const item = array.find((item) => item.id == id);
    return item ? item.name : "غير محدد";
  };

  return (
    <>
      <div className="personal-information w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176d6a] text-right">
          البيانات الشخصية
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-right font-medium mb-1">الاسم</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee.name || "غير محدد"}
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-right font-medium mb-1">الجهة</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {getNameById(employee?.facultyId, faculties)}
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-right font-medium mb-1">
              رقم الملف
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.fileId || "غير محدد"}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-right font-medium mb-1">
              الرقم القومي
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.nationalId || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الحالة الصحية
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {getNameById(employee?.healthStateId, healthStates)}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              نوع الإعاقة
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.disabilityType || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الحالة الاجتماعية
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {getNameById(employee?.socialStateId, socialStates)}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              عدد أفراد الأسرة
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.disabilityFamilyMember || "0"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              محل الميلاد
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.birthPlace || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ الميلاد
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.birthDate || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">المحمول</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.mobile || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              هاتف السكن
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.tel || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">النوع</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.gender == "0"
                ? "ذكر"
                : employee?.gender == "1"
                ? "أنثى"
                : "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الرقم التأميني
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.taminNo || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              المحافظة
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {getNameById(employee?.governrateId, governrates)}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">المركز</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.city || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">القرية</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.village || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">العنوان</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {employee?.address || "غير محدد"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformationDisplay;
