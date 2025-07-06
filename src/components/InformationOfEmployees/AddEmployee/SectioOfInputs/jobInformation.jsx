import { useEffect, useState } from "react";

const JobInformation = ({ formData, handleChange, setFormData }) => {
  const [sectors, setSectors] = useState([]);
  const [generalAds, setGeneralAds] = useState([]);
  const [subAds, setSubAds] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [jobGroups, setJobGroups] = useState([]);
  const [jobSubGroups, setJobSubGroups] = useState([]);
  const [jobNames, setJobNames] = useState([]);
  const [fincialDegrees, setFincialDegrees] = useState([]);
  const [existaceCases, setExistaceCases] = useState([]);
  const [sectoreId, setSectorId] = useState("");
  const [generalId, setGeneralId] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  const [jobDegredation, setJobDegredation] = useState([]);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/Sector")
      .then((res) => res.json())
      .then((data) => setSectors(data))
      .catch((error) => console.error("حدث خطأ أثناء جلب  القطاعات:", error));
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/GeneralAd")
      .then((res) => res.json())
      .then((data) => setGeneralAds(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب  الادارات العامة:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/SubAd")
      .then((res) => res.json())
      .then((data) => setSubAds(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب  الادارات الفرعية:", error)
      );
  }, []);
  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/Department")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("حدث خطأ أثناء جلب  الأقسام:", error));
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/JobGroup")
      .then((res) => res.json())
      .then((data) => setJobGroups(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب  مجموعات الوظائف:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/JobSubGroup")
      .then((res) => res.json())
      .then((data) => setJobSubGroups(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب  مجموعات الوظائف الفرعية:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/JobNames")
      .then((res) => res.json())
      .then((data) => setJobNames(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب  أسماء الوظائف:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/FincialDegrees")
      .then((res) => res.json())
      .then((data) => setFincialDegrees(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب  الدرجات الوظيفية:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/ExistaceCase")
      .then((res) => res.json())
      .then((data) => setExistaceCases(data))
      .catch((error) =>
        console.error("حدث خطأ أثناء جلب  حالات الوجود:", error)
      );
  }, []);

  return (
    <>
      <div className="job-information">
        <div className="text-[15px] text-white mb-6 p-3 bg-blue-500 text-right">
          البيانات الوظيفية
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-right font-medium mb-1">
              رقم قرار التعيين
            </label>
            <input
              type="number"
              name="appointDN"
              value={formData.appointDN}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* تاريخ التعيين + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ التعيين
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="appointDate"
                value={formData.appointDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                name="appointDateTxt"
                value={formData.appointDateTxt}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
            </div>
          </div>

          {/* تاريخ إعادة التعيين + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ إعادة التعيين
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="reAppointDate"
                value={formData.reAppointDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                name="reAppointDateTxt"
                value={formData.reAppointDateTxt}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
            </div>
          </div>

          {/* تاريخ التعيين بالضم + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ التعيين بالضم
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="combinationDate"
                value={formData.combinationDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                name="combinationDateTxt"
                value={formData.combinationDateTxt}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
            </div>
          </div>

          {/* تاريخ استلام العمل أول مرة + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ استلام العمل أول مرة
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="workDateFt"
                value={formData.workDateFt}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                name="workDateFtTxt"
                value={formData.workDateFtTxt}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
            </div>
          </div>

          {/* تاريخ استلام العمل بالجامعة + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ استلام العمل بالجامعة
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="workDate"
                value={formData.workDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                name="workDateTxt"
                value={formData.workDateTxt}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
            </div>
          </div>
        </div>

        <div className="structure-of-employee">
          <div className="text-[15px] text-white mb-6 p-3 bg-blue-500 text-right">
            الهيكل التنظيمي للموظف
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rtl">
            <div>
              <label className="block text-right font-medium mb-1">
                1- القطاع التنظيمي
              </label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                onChange={(e) => setSectorId(e.target.value)}
              >
                <option>اختر قطاع</option>
                {sectors.map((sector) => (
                  <option key={sector.code} value={sector.code}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                2- الإدارة العامة أو الوحدة التابعة للقطاع
              </label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                onChange={(e) => setGeneralId(e.target.value)}
              >
                <option value="">اختر اداره</option>
                {generalAds
                  .filter((ad) => ad.sectorID == sectoreId)
                  .map((ad) => (
                    <option key={ad.id} value={ad.id}>
                      {ad.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                3- الإدارة الفرعية
              </label>
              <select
                name="subAdId"
                value={formData.subAdId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option>اختر اداره فرعية</option>
                {subAds
                  .filter((subAd) => subAd.generalAdId == generalId)
                  .map((subAd) => (
                    <option key={subAd.id} value={subAd.id}>
                      {subAd.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                4- القسم
              </label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option>اختر قسم</option>
                {departments
                  .filter(
                    (department) => department.subAdID == formData.subAdId
                  )
                  .map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* المجموعات الوظيفية */}
            <div>
              <label className="block text-right font-medium mb-1">
                المجموعات الوظيفية
              </label>
              <select
                name="jobGroupId"
                value={formData.jobGroupId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option>اختر مجموعة وظيفية</option>
                {jobGroups.map((jobGroup) => (
                  <option key={jobGroup.id} value={jobGroup.id}>
                    {jobGroup.name}
                  </option>
                ))}
              </select>
            </div>

            {/* المجموعات النوعية */}
            <div>
              <label className="block text-right font-medium mb-1">
                المجموعات النوعية
              </label>
              <select
                name="jobSubGroupId"
                value={formData.jobSubGroupId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option>اختر مجموعة نوعية</option>
                {jobSubGroups
                  .filter(
                    (subGroup) => subGroup.jobGroupId == formData.jobGroupId
                  )
                  .map((subGroup) => (
                    <option key={subGroup.id} value={subGroup.id}>
                      {subGroup.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* مسمي الوظيفة */}
            <div>
              <label className="block text-right font-medium mb-1">
                مسمي الوظيفة الحالية
              </label>
              <select
                name="jobNameId"
                value={formData.jobNameId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option>اختر مسمي وظيفي</option>
                {jobNames
                  .filter(
                    (jobName) => jobName.jobSubGroupId == formData.jobSubGroupId
                  )
                  .map((jobName) => (
                    <option key={jobName.id} value={jobName.id}>
                      {jobName.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                الدرجة الوظيفية
              </label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                name="fincialDegreeId"
                value={formData.fincialDegreeId}
                onChange={handleChange}
              >
                <option>اختر درجة وظيفية</option>
                {fincialDegrees.map((fincialDegree) => (
                  <option key={fincialDegree.id} value={fincialDegree.id}>
                    {fincialDegree.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-right font-medium mb-1">
                تاريخ الدرجة
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 w-full"
                name="fincialDegreeDate"
                value={formData.fincialDegreeDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                لديه الدرجة الحالية ؟
              </label>
              <input
                type="checkbox"
                className="border border-gray-300 rounded-md p-2 w-full"
                name="currentDegree"
                checked={formData.currentDegree}
                onChange={(e) =>
                  setFormData({ ...formData, currentDegree: e.target.checked })
                }
              />
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                تاريخ الوظيفة المسكن عليها
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 w-full"
                name="fJobDate"
                value={formData.fJobDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-right font-medium mb-1">
                الوجود في العمل
              </label>
              <input
                type="checkbox"
                className="border border-gray-300 rounded-md p-2 w-full"
                name="isExist"
                checked={formData.isExist}
                onChange={(e) =>
                  setFormData({ ...formData, isExist: e.target.checked })
                }
              />
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                حالة الموظف
              </label>
              <select
                name="existaceCaseId"
                value={formData.existaceCaseId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option value="">اختر حالة الوجود</option>
                {existaceCases.map((caseItem) => (
                  <option key={caseItem.id} value={caseItem.id}>
                    {caseItem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-[#717f98] text-white p-4 rounded-lg ">
            <div className="block text-right font-medium mb-1 ">
              المده المحتفظ بها للموظف
            </div>
            <div className="inputs flex justify-between">
              <div>
                <label>يوم</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="reservedDays"
                  value={formData.reservedDays}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="ml-2">شهر</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="reservedMonths"
                  value={formData.reservedMonths}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="ml-2">سنة</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="reservedYears"
                  value={formData.reservedYears}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobInformation;
