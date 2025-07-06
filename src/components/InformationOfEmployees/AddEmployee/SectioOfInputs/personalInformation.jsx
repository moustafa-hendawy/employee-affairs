import { useEffect, useState } from "react";

const PersonalInformation = ({ formData, handleChange }) => {
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
        console.error("حدث خطأ أثناء جلب  الحالات الاجتماعية:", error)
      );
  }, []);

  return (
    <>
      <div className="add-employee">
        <div className="text-[15px] text-white mb-6 p-3 bg-blue-500 text-right">
          إضافة جديد
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div className="mb-4 flex">
            <label className="block w-fit text-right font-medium mb-2 ml-2">
              الاسم
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4 flex">
            <label className="block w-fit whitespace-nowrap text-right font-medium mb-2 ml-2">
              الجهة
            </label>
            <select
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">اختر جهة</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex">
            <label className="block w-fit whitespace-nowrap text-right font-medium mb-2 ml-2">
              رقم الملف
            </label>
            <input
              type="text"
              name="fileId"
              value={formData.fileId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
      </div>

      <div className="personal-information">
        <div className="text-[15px] text-white mb-6 p-3 bg-blue-500 text-right">
          البيانات الشخصية
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-right font-medium mb-1">
              الرقم القومي
            </label>
            <input
              type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الحالة الصحية
            </label>
            <select
              name="healthStateId"
              value={formData.healthStateId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">اختر حالة صحية</option>
              {healthStates.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              نوع الإعاقة
            </label>
            <input
              type="text"
              name="disabilityType"
              value={formData.disabilityType}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الحالة الاجتماعية
            </label>
            <select
              name="socialStateId"
              value={formData.socialStateId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">اختر حالة اجتماعية</option>
              {socialStates.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              عدد أفراد الأسرة
            </label>
            <input
              type="text"
              name="disabilityFamilyMember"
              value={formData.disabilityFamilyMember}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              محل الميلاد
            </label>
            <input
              type="text"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ الميلاد
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">المحمول</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              هاتف السكن
            </label>
            <input
              type="text"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">النوع</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">اختر النوع</option>
              <option value="0">ذكر</option>
              <option value="1">أنثى</option>
            </select>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              الرقم التأميني
            </label>
            <input
              type="text"
              name="taminNo"
              value={formData.taminNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              المحافظة
            </label>
            <select
              name="governrateId"
              value={formData.governrateId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">اختر محافظة</option>
              {governrates.map((governrate) => (
                <option key={governrate.id} value={governrate.id}>
                  {governrate.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">المركز</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">القرية</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">العنوان</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
