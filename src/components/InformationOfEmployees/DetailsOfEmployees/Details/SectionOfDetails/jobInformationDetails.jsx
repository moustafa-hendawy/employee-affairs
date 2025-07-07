import { useEffect, useState } from "react";

const JobInformationDisplay = ({ formData }) => {
  const [sectors, setSectors] = useState([]);
  const [generalAds, setGeneralAds] = useState([]);
  const [subAds, setSubAds] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [jobGroups, setJobGroups] = useState([]);
  const [jobSubGroups, setJobSubGroups] = useState([]);
  const [jobNames, setJobNames] = useState([]);
  const [fincialDegrees, setFincialDegrees] = useState([]);
  const [existaceCases, setExistaceCases] = useState([]);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/Sector")
      .then((res) => res.json())
      .then((data) => setSectors(data))
      .catch((error) => console.error("حدث خطأ أثناء جلب القطاعات:", error));
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/GeneralAd")
      .then((res) => res.json())
      .then((data) => setGeneralAds(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب الادارات العامة:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/SubAd")
      .then((res) => res.json())
      .then((data) => setSubAds(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب الادارات الفرعية:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/Department")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("حدث خطأ أثناء جلب الأقسام:", error));
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/JobGroup")
      .then((res) => res.json())
      .then((data) => setJobGroups(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب مجموعات الوظائف:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/JobSubGroup")
      .then((res) => res.json())
      .then((data) => setJobSubGroups(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب مجموعات الوظائف الفرعية:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/JobNames")
      .then((res) => res.json())
      .then((data) => setJobNames(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب أسماء الوظائف:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/FincialDegrees")
      .then((res) => res.json())
      .then((data) => setFincialDegrees(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب الدرجات الوظيفية:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/ExistaceCase")
      .then((res) => res.json())
      .then((data) => setExistaceCases(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب حالات الوجود:", error)
      );
  }, []);

  const selectedSubAd = subAds.find((item) => item.id == formData.subAdId);
  const selectedGeneralAd = generalAds.find(
    (item) => item.id == selectedSubAd?.generalAdId
  );
  const selectedSector = sectors.find(
    (item) => item.code == selectedGeneralAd?.sectorID
  );

  // دالة مساعدة للحصول على اسم العنصر من الـ ID
  const getNameById = (id, array) => {
    const item = array.find((item) => item.id == id);
    return item ? item.name : "غير محدد";
  };

  return (
    <>
      <div className="job-information w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176d6a] text-right">
          البيانات الوظيفية
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-right font-medium mb-1">
              رقم قرار التعيين
            </label>
            <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
              {formData.appointDN || "غير محدد"}
            </span>
          </div>

          {/* تاريخ التعيين + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ التعيين
            </label>
            <div className="flex gap-2">
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.appointDate || "غير محدد"}
              </span>
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.appointDateTxt || "غير محدد"}
              </span>
            </div>
          </div>

          {/* تاريخ إعادة التعيين + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ إعادة التعيين
            </label>
            <div className="flex gap-2">
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.reAppointDate || "غير محدد"}
              </span>
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.reAppointDateTxt || "غير محدد"}
              </span>
            </div>
          </div>

          {/* تاريخ التعيين بالضم + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ التعيين بالضم
            </label>
            <div className="flex gap-2">
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.combinationDate || "غير محدد"}
              </span>
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.combinationDateTxt || "غير محدد"}
              </span>
            </div>
          </div>

          {/* تاريخ استلام العمل أول مرة + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ استلام العمل أول مرة
            </label>
            <div className="flex gap-2">
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.workDateFt || "غير محدد"}
              </span>
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.workDateFtTxt || "غير محدد"}
              </span>
            </div>
          </div>

          {/* تاريخ استلام العمل بالجامعة + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ استلام العمل بالجامعة
            </label>
            <div className="flex gap-2">
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.workDate || "غير محدد"}
              </span>
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.workDateTxt || "غير محدد"}
              </span>
            </div>
          </div>
        </div>

        <div className="structure-of-employee">
          <div className="text-[15px] text-white mb-6 p-3 bg-[#176d6a] text-right">
            الهيكل التنظيمي للموظف
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rtl">
            <div>
              <label className="block text-right font-medium mb-1">
                1- القطاع التنظيمي
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {selectedSector?.name || "غير محدد"}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                2- الإدارة العامة أو الوحدة التابعة للقطاع
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {selectedGeneralAd?.name || "غير محدد"}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                3- الإدارة الفرعية
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {selectedSubAd?.name || "غير محدد"}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                4- القسم
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {getNameById(formData.departmentId, departments)}
              </span>
            </div>

            {/* المجموعات الوظيفية */}
            <div>
              <label className="block text-right font-medium mb-1">
                المجموعات الوظيفية
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {getNameById(formData.jobGroupId, jobGroups)}
              </span>
            </div>

            {/* المجموعات النوعية */}
            <div>
              <label className="block text-right font-medium mb-1">
                المجموعات النوعية
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {getNameById(formData.jobSubGroupId, jobSubGroups)}
              </span>
            </div>

            {/* مسمي الوظيفة */}
            <div>
              <label className="block text-right font-medium mb-1">
                مسمي الوظيفة الحالية
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {getNameById(formData.jobNameId, jobNames)}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                الدرجة الوظيفية
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {getNameById(formData.fincialDegreeId, fincialDegrees)}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                تاريخ الدرجة
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.fincialDegreeDate || "غير محدد"}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                لديه الدرجة الحالية ؟
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.currentDegree ? "نعم" : "لا"}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                تاريخ الوظيفة المسكن عليها
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.fJobDate || "غير محدد"}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                الوجود في العمل
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.isExist ? "نعم" : "لا"}
              </span>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                حالة الموظف
              </label>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {getNameById(formData.existaceCaseId, existaceCases)}
              </span>
            </div>
          </div>

          <div className="text-[15px] text-white mb-6 p-3 bg-[#176d6a] text-right">
            <div className="block text-right font-medium mb-1 ">
              المده المحتفظ بها للموظف
            </div>
            <div className="inputs flex justify-between text-black">
              <div>
                <label className="mb-1 text-white semi-bold">يوم</label>
                <span className="px-4 py-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                  {formData.reservedDays || "0"}
                </span>
              </div>
              <div>
                <label className="mb-1 text-white semi-bold">شهر</label>
                <span className="px-4 py-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                  {formData.reservedMonths || "0"}
                </span>
              </div>
              <div>
                <label className="mb-1 text-white semi-bold">سنة</label>
                <span className="px-4 py-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                  {formData.reservedYears || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobInformationDisplay;
