import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const [jobGroups, setJobGroups] = useState([]);
  const [jobNames, setJobNames] = useState([]);
  const [jobSubGroups, setJobSubGroups] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [fincialDegrees, setFincialDegrees] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    jobNameId: 0,
    jobSubGroupId: 0,
    jobGroupId: 0,
    facultyId: 0,
    nationalId: 0,
    name: "",
    nationalId: "",
    currentDegree: false,
    mobile: "",
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("http://193.227.24.29:5000/api/Faculty")
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error("حدث خطأ أثناء جلب الكليات:", error));
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (form.facultyId) params.append("facultyId", form.facultyId);
    if (form.name.trim() !== "") params.append("name", form.name.trim());
    if (form.nationalId.trim() !== "")
      params.append("nationalId", form.nationalId.trim());
    if (form.mobile.trim() !== "") params.append("mobile", form.mobile.trim());
    params.append("currentDegree", form.currentDegree);

    // منطق إرسال البيانات حسب الاختيارات
    if (form.jobGroupId && form.jobSubGroupId && form.jobNameId) {
      params.append("jobNameId", form.jobNameId);
    } else if (form.jobGroupId && form.jobSubGroupId) {
      params.append("jobSubGroupId", form.jobSubGroupId);
    } else if (form.jobGroupId) {
      params.append("jobGroupId", form.jobGroupId);
    }

    const url = `http://193.227.24.29:5000/api/Employee?${params.toString()}`;
    console.log("جاري جلب البيانات من:", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      })
      .catch((error) => console.error("حدث خطأ أثناء جلب البيانات:", error));
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 flex justify-between" dir="rtl">
        <h2 className="text-2xl font-bold mb-6 text-right">تفاصيل الموظفين </h2>
        <button
          className="bg-[#176D6A] text-white px-4 py-2  hover:opacity-90"
          style={{ borderRadius: "6px" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          العودة
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-4 " dir="rtl">
        <div
          style={{
            border: "1px solid green",
            padding: "1rem",
            borderRadius: "0.375rem",
            marginBottom: "20px",
          }}
        >
          {/* الجهة */}
          <div className="flex items-center mb-4">
            <label className="w-48 text-right font-medium">الجهة</label>
            <select
              name="facultyId"
              value={form.facultyId}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
            >
              <option value="">إختر الجهة</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>

          {/* المجموعات الوظيفية */}
          {form.facultyId != "" && (
            <div className="flex items-center mb-4">
              <label className="w-48 text-right font-medium">
                المجموعات الوظيفية
              </label>
              <select
                name="jobGroupId"
                value={form.jobGroupId}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
              >
                <option value="">اختر مجموعة وظيفية</option>
                {jobGroups.map((jobGroup) => (
                  <option key={jobGroup.id} value={jobGroup.id}>
                    {jobGroup.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* المجموعات النوعية */}
          {form.jobGroupId != "" && (
            <div className="flex items-center mb-4">
              <label className="w-48 text-right font-medium">
                المجموعات النوعية
              </label>
              <select
                name="jobSubGroupId"
                value={form.jobSubGroupId}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
              >
                <option value="">اختر مجموعة نوعية</option>
                {jobSubGroups
                  .filter((subGroup) => subGroup.jobGroupId == form.jobGroupId)
                  .map((subGroup) => (
                    <option key={subGroup.id} value={subGroup.id}>
                      {subGroup.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* مسمي الوظيفة الحالية */}
          {form.jobSubGroupId != "" && (
            <div className="flex items-center mb-4">
              <label className="w-48 text-right font-medium">
                مسمي الوظيفة الحالية
              </label>
              <select
                name="jobNameId"
                value={form.jobNameId}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
              >
                <option value="">اختر مسمي وظيفي</option>
                {jobNames
                  .filter(
                    (jobName) => jobName.jobSubGroupId == form.jobSubGroupId
                  )
                  .map((jobName) => (
                    <option key={jobName.id} value={jobName.id}>
                      {jobName.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* الدرجة الوظيفية */}
          {form.jobNameId != "" && (
            <div className="flex items-center mb-4">
              <label className="w-48 text-right font-medium">
                الدرجة الوظيفية
              </label>
              <select
                name="fincialDegreeId"
                value={form.fincialDegreeId}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
              >
                <option value="">اختر درجة وظيفية</option>
                {fincialDegrees.map((fincialDegree) => (
                  <option key={fincialDegree.id} value={fincialDegree.id}>
                    {fincialDegree.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center mb-4">
          <label className="w-48 text-right font-medium">الاسم</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-48 text-right font-medium">الرقم القومي</label>
          <input
            type="text"
            name="nationalId"
            value={form.nationalId}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="w-48 text-right font-medium">رقم الهاتف</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 text-left" dir="rtl">
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          ابحث
        </button>
      </div>

      <div className="w-full mx-auto p-4 mt-6 " dir="rtl">
        <h3 className="text-xl font-bold mb-4 text-right">نتائج البحث</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-right font-semibold">م</th>
              <th className="px-6 py-3 border-b text-right font-semibold">
                اسم الموظف
              </th>
              <th className="px-6 py-3 border-b text-right font-semibold">
                الرقم القومي
              </th>
              <th className="px-6 py-3 border-b text-right font-semibold">
                الجهة
              </th>
              <th className="px-6 py-3 border-b text-right font-semibold">
                الدرجة الوظيفية
              </th>
              <th className="px-6 py-3 border-b text-right font-semibold">
                {" "}
                تاريخ الدرجة
              </th>
              <th className="px-6 py-3 border-b text-right font-semibold">
                المجموعة الوظيفية
              </th>
              <th className="px-6 py-3 border-b text-right font-semibold">
                المجموعة النوعية
              </th>
              <th className="px-6 py-3 border-b text-right font-semibold">
                المسمى الوظيفي
              </th>

              <th className="px-6 py-3 border-b text-right font-semibold">
                التفاصيل
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  لا توجد نتائج مطابقة.
                </td>
              </tr>
            ) : (
              searchResults.map((employee, i) => (
                <tr key={employee.nationalId} className="hover:bg-gray-100">
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    {i + 1 || "غير محدد"}
                  </td>
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    {employee.name}
                  </td>
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    {employee.nationalId}
                  </td>
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    {faculties.find(
                      (faculty) => faculty.id === employee.facultyId
                    )?.name || "غير محدد"}
                  </td>
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    {fincialDegrees.find(
                      (degree) => degree.id === employee.fincialDegreeId
                    )?.name || "غير محدد"}
                  </td>
                  <td className="px-6 py-3 border-b whitespace-nowrap text-black font-semibold">
                    {employee.fincialDegreeDate || "غير محدد"}
                  </td>
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    {jobGroups.find((group) => group.id === employee.jobGroupId)
                      ?.name || "غير محدد"}
                  </td>
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    {jobSubGroups.find(
                      (subGroup) => subGroup.id === employee.jobSubGroupId
                    )?.name || "غير محدد"}
                  </td>
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    {" "}
                    {jobNames.find((job) => job.id === employee.jobNameId)
                      ?.name || "غير محدد"}
                  </td>
                  <td className="px-6 py-3 border-b text-black font-semibold">
                    <Link
                      to={`/details/${employee.nationalId}`}
                      className="text-blue-600"
                      style={{ textDecoration: "none", color: "#176d6a" }}
                    >
                      التفاصيل
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
