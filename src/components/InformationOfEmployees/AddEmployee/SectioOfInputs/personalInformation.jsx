import { useEffect, useState } from "react";

const PersonalInformation = ({ formData, handleChange }) => {
  const [faculties, setFaculties] = useState([]);
  const [healthStates, setHealthStates] = useState([]);
  const [socialStates, setSocialStates] = useState([]);
  const [governrates, setGovernrates] = useState([]);

  const extractDataFromNationalId = (nationalId) => {
    if (!/^\d{14}$/.test(nationalId)) return null;

    const centuryCode = nationalId.charAt(0);
    const year = nationalId.substring(1, 3);
    const month = nationalId.substring(3, 5);
    const day = nationalId.substring(5, 7);
    const genderDigit = parseInt(nationalId.charAt(12));

    let fullYear = "";
    if (centuryCode === "2") fullYear = `19${year}`;
    else if (centuryCode === "3") fullYear = `20${year}`;
    else return null;

    const birthDate = `${fullYear}-${month}-${day}`;
    const gender = genderDigit % 2 === 0 ? "1" : "0";

    return { birthDate, gender };
  };

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
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176D6A] text-right">
          إضافة جديد
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div className="mb-4 flex">
            <label className="block w-fit text-right font-medium mb-2 ml-2">
              {" "}
              <span className="text-red-500">*</span>
              الاسم
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4 flex">
            <label className="block w-fit whitespace-nowrap text-right font-medium mb-2 ml-2">
              {" "}
              <span className="text-red-500">*</span>
              الجهة
            </label>
            <select
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              required
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
              {" "}
              <span className="text-red-500">*</span>
              رقم الملف
            </label>
            <input
              type="text"
              name="fileId"
              value={formData.fileId}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
      </div>

      <div className="personal-information">
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176D6A] text-right">
          البيانات الشخصية
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              الرقم القومي
            </label>
            <input
              type="text"
              name="nationalId"
              required
              value={formData.nationalId}
              onChange={(e) => {
                const { name, value } = e.target;
                handleChange(e);

                const extracted = extractDataFromNationalId(value);
                if (extracted) {
                  handleChange({
                    target: { name: "birthDate", value: extracted.birthDate },
                  });
                  handleChange({
                    target: { name: "gender", value: extracted.gender },
                  });
                }
              }}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              الحالة الصحية
            </label>
            <select
              name="healthStateId"
              value={formData.healthStateId}
              onChange={handleChange}
              required
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

          {["2", "3"].includes(formData.healthStateId) && (
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
          )}

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              الحالة الاجتماعية
            </label>
            <select
              name="socialStateId"
              value={formData.socialStateId}
              onChange={handleChange}
              required
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

          {["2", "3", "4", "5"].includes(formData.socialStateId) && (
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
          )}

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              محل الميلاد
            </label>
            <input
              type="text"
              name="birthPlace"
              required
              value={formData.birthPlace}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>المحمول
            </label>
            <input
              type="text"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              onBlur={(e) => {
                if (e.target.value && !/^\d+$/.test(e.target.value)) {
                  alert("الرجاء إدخال أرقام فقط في حقل المحمول");
                }
              }}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              هاتف السكن
            </label>
            <input
              type="text"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              required
              onBlur={(e) => {
                if (e.target.value && !/^\d+$/.test(e.target.value)) {
                  alert("الرجاء إدخال أرقام فقط في حقل هاتف السكن");
                }
              }}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              الرقم التأميني
            </label>
            <input
              type="number"
              name="taminNo"
              value={formData.taminNo}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              المحافظة
            </label>
            <select
              name="governrateId"
              value={formData.governrateId}
              onChange={handleChange}
              required
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
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>المركز{" "}
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>القرية
            </label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span> العنوان
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
