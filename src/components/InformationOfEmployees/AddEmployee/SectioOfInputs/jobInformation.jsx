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

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [
          sectorsRes,
          generalAdsRes,
          subAdsRes,
          departmentsRes,
          jobGroupsRes,
          jobSubGroupsRes,
          jobNamesRes,
          fincialDegreesRes,
          existaceCasesRes,
        ] = await Promise.all([
          fetch("http://193.227.24.29:5000/api/Sector"),
          fetch("http://193.227.24.29:5000/api/GeneralAd"),
          fetch("http://193.227.24.29:5000/api/SubAd"),
          fetch("http://193.227.24.29:5000/api/Department"),
          fetch("http://193.227.24.29:5000/api/JobGroup"),
          fetch("http://193.227.24.29:5000/api/JobSubGroup"),
          fetch("http://193.227.24.29:5000/api/JobNames"),
          fetch("http://193.227.24.29:5000/api/FincialDegrees"),
          fetch("http://193.227.24.29:5000/api/ExistaceCase"),
        ]);

        const [
          sectorsData,
          generalAdsData,
          subAdsData,
          departmentsData,
          jobGroupsData,
          jobSubGroupsData,
          jobNamesData,
          fincialDegreesData,
          existaceCasesData,
        ] = await Promise.all([
          sectorsRes.json(),
          generalAdsRes.json(),
          subAdsRes.json(),
          departmentsRes.json(),
          jobGroupsRes.json(),
          jobSubGroupsRes.json(),
          jobNamesRes.json(),
          fincialDegreesRes.json(),
          existaceCasesRes.json(),
        ]);

        setSectors(sectorsData);
        setGeneralAds(generalAdsData);
        setSubAds(subAdsData);
        setDepartments(departmentsData);
        setJobGroups(jobGroupsData);
        setJobSubGroups(jobSubGroupsData);
        setJobNames(jobNamesData);
        setFincialDegrees(fincialDegreesData);
        setExistaceCases(existaceCasesData);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      }
    };

    fetchData();
  }, []);

  // Set initial sector and general ad values when data is loaded
  useEffect(() => {
    if (
      formData.subAdId &&
      subAds.length > 0 &&
      generalAds.length > 0 &&
      sectors.length > 0
    ) {
      // Find the selected subAd
      const selectedSubAd = subAds.find((item) => item.id == formData.subAdId);
      if (selectedSubAd) {
        // Find the corresponding general ad
        const selectedGeneralAd = generalAds.find(
          (item) => item.id == selectedSubAd.generalAdId
        );
        if (selectedGeneralAd) {
          setGeneralId(selectedGeneralAd.id.toString());

          // Find the corresponding sector
          const selectedSector = sectors.find(
            (item) => item.code == selectedGeneralAd.sectorID
          );
          if (selectedSector) {
            setSectorId(selectedSector.code.toString());
          }
        }
      }
    }
  }, [formData.subAdId, subAds, generalAds, sectors]);

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

  // Get selected items for display
  const selectedSubAd = subAds.find((item) => item.id == formData.subAdId);
  const selectedGeneralAd = generalAds.find(
    (item) => item.id == selectedSubAd?.generalAdId
  );
  const selectedSector = sectors.find(
    (item) => item.code == selectedGeneralAd?.sectorID
  );

  return (
    <>
      <div className="job-information">
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176D6A] text-right">
          البيانات الوظيفية
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              رقم قرار التعيين
            </label>
            <input
              type="number"
              required
              name="appointDN"
              value={formData.appointDN}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* تاريخ التعيين + نصه */}
          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              تاريخ التعيين
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                required
                name="appointDate"
                value={formData.appointDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                required
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
              {" "}
              <span className="text-red-500">*</span>
              تاريخ إعادة التعيين
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                required
                name="reAppointDate"
                value={formData.reAppointDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                required
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
              {" "}
              <span className="text-red-500">*</span>
              تاريخ التعيين بالضم
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                required
                name="combinationDate"
                value={formData.combinationDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                required
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
              {" "}
              <span className="text-red-500">*</span>
              تاريخ استلام العمل أول مرة
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                required
                name="workDateFt"
                value={formData.workDateFt}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                required
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
              {" "}
              <span className="text-red-500">*</span>
              تاريخ استلام العمل بالجامعة
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                required
                name="workDate"
                value={formData.workDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                required
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
                {" "}
                <span className="text-red-500">*</span>
                1- القطاع التنظيمي
              </label>
              <select
                required
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                onChange={handleSectorChange}
                value={sectoreId}
              >
                <option value="">اختر قطاع</option>
                {sectors.map((sector, index) => (
                  <option key={`sector-${index}`} value={sector.code}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>

            {sectoreId !== "" && sectoreId !== "0" && (
              <div>
                <label className="block text-right font-medium mb-1">
                  {" "}
                  <span className="text-red-500">*</span>
                  2- الإدارة العامة أو الوحدة التابعة للقطاع
                </label>
                <select
                  required
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  onChange={handleGeneralChange}
                  value={generalId}
                >
                  <option value="">اختر اداره</option>
                  {generalAds
                    .filter((ad) => ad.sectorID == sectoreId)
                    .map((ad, index) => (
                      <option key={`ad-${ad.id || index}`} value={ad.id}>
                        {ad.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {generalId !== "" && generalId !== "0" && (
              <div>
                <label className="block text-right font-medium mb-1">
                  {" "}
                  <span className="text-red-500">*</span>
                  3- الإدارة الفرعية
                </label>
                <select
                  required
                  name="subAdId"
                  value={formData.subAdId}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                >
                  <option value="">اختر اداره فرعية</option>
                  {subAds
                    .filter((subAd) => subAd.generalAdId == generalId)
                    .map((subAd, index) => (
                      <option
                        key={`subAd-${subAd.id || index}`}
                        value={subAd.id}
                      >
                        {subAd.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {formData.subAdId !== "" && formData.subAdId !== "0" && (
              <div>
                <label className="block text-right font-medium mb-1">
                  {" "}
                  <span className="text-red-500">*</span>
                  4- القسم
                </label>
                <select
                  required
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
                    .map((department, index) => (
                      <option
                        key={`department-${department.id || index}`}
                        value={department.id}
                      >
                        {department.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* المجموعات الوظيفية */}
            <div>
              <label className="block text-right font-medium mb-1">
                {" "}
                <span className="text-red-500">*</span>
                المجموعات الوظيفية
              </label>
              <select
                required
                name="jobGroupId"
                value={formData.jobGroupId}
                onChange={handleJobGroupChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option value="">اختر مجموعة وظيفية</option>
                {jobGroups.map((jobGroup, index) => (
                  <option
                    key={`jobGroup-${jobGroup.id || index}`}
                    value={jobGroup.id}
                  >
                    {jobGroup.name}
                  </option>
                ))}
              </select>
            </div>

            {/* المجموعات النوعية */}
            {formData.jobGroupId !== "" && formData.jobGroupId !== "0" && (
              <div>
                <label className="block text-right font-medium mb-1">
                  {" "}
                  <span className="text-red-500">*</span>
                  المجموعات النوعية
                </label>
                <select
                  required
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
                    .map((subGroup, index) => (
                      <option
                        key={`subGroup-${subGroup.id || index}`}
                        value={subGroup.id}
                      >
                        {subGroup.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* مسمي الوظيفة */}
            {formData.jobSubGroupId !== "" &&
              formData.jobSubGroupId !== "0" && (
                <div>
                  <label className="block text-right font-medium mb-1">
                    {" "}
                    <span className="text-red-500">*</span>
                    مسمي الوظيفة الحالية
                  </label>
                  <select
                    required
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
                      .map((jobName, index) => (
                        <option
                          key={`jobName-${jobName.id || index}`}
                          value={jobName.id}
                        >
                          {jobName.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

            <div>
              <label className="block text-right font-medium mb-1">
                {" "}
                <span className="text-red-500">*</span>
                الدرجة الوظيفية
              </label>
              <select
                required
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                name="fincialDegreeId"
                value={formData.fincialDegreeId}
                onChange={handleChange}
              >
                <option value="">اختر درجة وظيفية</option>
                {fincialDegrees.map((fincialDegree, index) => (
                  <option
                    key={`fincialDegree-${fincialDegree.id || index}`}
                    value={fincialDegree.id}
                  >
                    {fincialDegree.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-right font-medium mb-1">
                {" "}
                <span className="text-red-500">*</span>
                تاريخ الدرجة
              </label>
              <input
                type="date"
                required
                className="border border-gray-300 rounded-md p-2 w-full"
                name="fincialDegreeDate"
                value={formData.fincialDegreeDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-right font-medium mb-1">
                {" "}
                <span className="text-red-500">*</span>
                تاريخ الوظيفة المسكن عليها
              </label>
              <input
                type="date"
                required
                className="border border-gray-300 rounded-md p-2 w-full"
                name="fJobDate"
                value={formData.fJobDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-right font-medium mb-1">
                {" "}
                <span className="text-red-500">*</span>
                الوجود في العمل
              </label>
              <input
                type="checkbo requiredx"
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
                {" "}
                <span className="text-red-500">*</span>
                حالة الموظف
              </label>
              <select
                required
                name="existaceCaseId"
                value={formData.existaceCaseId}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option value="">اختر حالة الوجود</option>
                {existaceCases.map((caseItem, index) => (
                  <option
                    key={`case-${caseItem.id || index}`}
                    value={caseItem.id}
                  >
                    {caseItem.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-right font-medium mb-1 text-gray-800">
                المده المحتفظ بها للموظف
              </label>
              <div className="inputs flex justify-between gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-semibold text-gray-800">
                    {" "}
                    <span className="text-red-500">*</span>
                    يوم
                  </label>
                  <input
                    type="number"
                    required
                    className="border border-gray-300 rounded-md p-2 w-full text-black"
                    name="reservedDays"
                    value={formData.reservedDays}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-semibold text-gray-800">
                    {" "}
                    <span className="text-red-500">*</span>
                    شهر
                  </label>
                  <input
                    type="number"
                    required
                    className="border border-gray-300 rounded-md p-2 w-full text-black"
                    name="reservedMonths"
                    value={formData.reservedMonths}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-semibold text-gray-800">
                    {" "}
                    <span className="text-red-500">*</span>
                    سنة
                  </label>
                  <input
                    type="number"
                    required
                    className="border border-gray-300 rounded-md p-2 w-full text-black"
                    name="reservedYears"
                    value={formData.reservedYears}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobInformation;
