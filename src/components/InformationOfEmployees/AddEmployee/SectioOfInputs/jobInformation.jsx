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

  const handleSectorChange = (e) => {
    const value = e.target.value;
    setSectorId(value);
    setGeneralId("");
    setFormData((prev) => ({
      ...prev,
      subAdId: "",
      departmentId: "",
    }));
  };

  const handleGeneralChange = (e) => {
    const value = e.target.value;
    setGeneralId(value);
    setFormData((prev) => ({
      ...prev,
      subAdId: "",
      departmentId: "",
    }));
  };

  const handleJobGroupChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      jobGroupId: value,
      jobSubGroupId: "",
      jobNameId: "",
    }));
  };

  const handleJobSubGroupChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      jobSubGroupId: value,
      jobNameId: "",
    }));
  };

  const handleJobNameChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      jobNameId: value,
    }));
  };

  return (
    <>
      <div className="job-information">
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176D6A] text-right">
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
          <div className="text-[15px] text-white mb-6 p-3 bg-[#176D6A] text-right">
            الهيكل التنظيمي للموظف
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rtl">
            <div>
              <label className="block text-right font-medium mb-1">
                1- القطاع التنظيمي
              </label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                onChange={handleSectorChange}
              >
                <option value="">اختر قطاع</option>
                {sectors.map((sector) => (
                  <option key={sector.code} value={sector.code}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>

            {sectoreId !== "" && sectoreId !== "0" && (
              <div>
                <label className="block text-right font-medium mb-1">
                  2- الإدارة العامة أو الوحدة التابعة للقطاع
                </label>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  onChange={handleGeneralChange}
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
            )}

            {generalId !== "" && generalId !== "0" && (
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
                  <option value="">اختر اداره فرعية</option>
                  {subAds
                    .filter((subAd) => subAd.generalAdId == generalId)
                    .map((subAd) => (
                      <option key={subAd.id} value={subAd.id}>
                        {subAd.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {formData.subAdId !== "" && (
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
                  <option value="">اختر قسم</option>
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
            )}

            {/* المجموعات الوظيفية */}
            {/* المجموعات الوظيفية */}
            <div>
              <label className="block text-right font-medium mb-1">
                المجموعات الوظيفية
              </label>
              <select
                name="jobGroupId"
                value={formData.jobGroupId}
                onChange={handleJobGroupChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option value="">اختر مجموعة وظيفية</option>
                {jobGroups.map((jobGroup) => (
                  <option key={jobGroup.id} value={jobGroup.id}>
                    {jobGroup.name}
                  </option>
                ))}
              </select>
            </div>

            {/* المجموعات النوعية */}
            {formData.jobGroupId !== "" && (
              <div>
                <label className="block text-right font-medium mb-1">
                  المجموعات النوعية
                </label>
                <select
                  name="jobSubGroupId"
                  value={formData.jobSubGroupId}
                  onChange={handleJobSubGroupChange}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                >
                  <option value="">اختر مجموعة نوعية</option>
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
            )}

            {/* مسمي الوظيفة */}
            {formData.jobSubGroupId !== "" && (
              <div>
                <label className="block text-right font-medium mb-1">
                  مسمي الوظيفة الحالية
                </label>
                <select
                  name="jobNameId"
                  value={formData.jobNameId}
                  onChange={handleJobNameChange}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                >
                  <option value="">اختر مسمي وظيفي</option>
                  {jobNames
                    .filter(
                      (jobName) =>
                        jobName.jobSubGroupId == formData.jobSubGroupId
                    )
                    .map((jobName) => (
                      <option key={jobName.id} value={jobName.id}>
                        {jobName.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

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
          <div className="bg-[#176D6A] text-white p-4 rounded-lg ">
            <div className="block text-right font-medium mb-1 ">
              المده المحتفظ بها للموظف
            </div>
            <div className="inputs flex justify-between">
              <div>
                <label className="mb-1 text-white semi-bold">يوم</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="reservedDays"
                  value={formData.reservedDays}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-1 text-white semi-bold">شهر</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="reservedMonths"
                  value={formData.reservedMonths}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-1 text-white semi-bold">سنة</label>
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
