import { useEffect, useState } from "react";

const PersonalInformationDisplay = ({ formData }) => {
  const [faculties, setFaculties] = useState([]);
  const [healthStates, setHealthStates] = useState([]);
  const [socialStates, setSocialStates] = useState([]);
  const [governrates, setGovernrates] = useState([]);

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
              {formData.name || "غير محدد"}
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-right font-medium mb-1">الجهة</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {getNameById(formData.facultyId, faculties)}
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-right font-medium mb-1">
              رقم الملف
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.fileId || "غير محدد"}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-right font-medium mb-1">
              الرقم القومي
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.nationalId || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الحالة الصحية
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {getNameById(formData.healthStateId, healthStates)}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              نوع الإعاقة
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.disabilityType || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الحالة الاجتماعية
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {getNameById(formData.socialStateId, socialStates)}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              عدد أفراد الأسرة
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.disabilityFamilyMember || "0"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              محل الميلاد
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.birthPlace || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ الميلاد
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.birthDate || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">المحمول</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.mobile || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              هاتف السكن
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.tel || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">النوع</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.gender == "0"
                ? "ذكر"
                : formData.gender == "1"
                ? "أنثى"
                : "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الرقم التأميني
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.taminNo || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              المحافظة
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {getNameById(formData.governrateId, governrates)}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">المركز</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.city || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">القرية</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.village || "غير محدد"}
            </span>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">العنوان</label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.address || "غير محدد"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformationDisplay;
