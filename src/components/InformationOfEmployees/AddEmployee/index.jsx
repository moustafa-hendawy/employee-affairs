import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonalInformation from "./SectioOfInputs/personalInformation";
import JobInformation from "./SectioOfInputs/jobInformation";
import ExperienceInformation from "./SectioOfInputs/experinceInformation";

const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Initialize with empty state
  const [formData, setFormData] = useState({
    nationalId: "",
    fileId: "",
    name: "",
    facultyId: 0,
    jobGroupId: "",
    jobSubGroupId: "",
    jobNameId: "",
    subAdId: "",
    departmentId: 0,
    isExist: true,
    existaceCaseId: 0,
    nonExistanceTypeId: 0,
    taminNo: 0,
    appointDate: "",
    workEndDate: "",
    gender: 0,
    birthDate: "",
    birthPlace: "",
    tel: "",
    mobile: "",
    workDate: "",
    healthStateId: 0,
    appointDN: 0,
    experanceDate: "",
    experanceDN: 0,
    serial: 1003,
    socialStateId: 0,
    governrateId: 0,
    address: "",
    workDateFt: "",
    reAppointDate: "",
    combinationDate: "",
    appointDateTxt: "",
    workDateTxt: "",
    workDateFtTxt: "",
    reAppointDateTxt: "",
    combinationDateTxt: "",
    experanceDateTxt: "",
    boundDegree: "",
    experanceDomain: "",
    workEndDec: 0,
    workEndDeDate: "",
    yearBuy: "",
    fJobDate: "",
    city: "",
    village: "",
    yearEmp: "",
    lastBalance: 0,
    currentBalance: 0,
    lastYearBalance: 0,
    sickBalance: 0,
    reservedDays: 0,
    reservedMonths: 0,
    reservedYears: 0,
    disabilityType: "",
    disabilityFamilyMember: "",
    degreeDate: "",
    currentDegree: false,
    fincialDegreeDate: "",
    fincialDegreeId: 0,
  });

  // Helper function to format dates for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  // Fetch employee data when component mounts or id changes
  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!id) return; // Don't fetch if no id (new employee)

      setLoading(true);
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/Employee?NationalId=${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Process the data properly

        setFormData(data[0]);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        alert("حدث خطأ في تحميل بيانات الموظف: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]); // Only depend on id, not formData

  const handleSubmit = async () => {
    try {
      const cleanedData = {
        ...formData,
        facultyId: parseInt(formData.facultyId) || 0,
        jobGroupId: parseInt(formData.jobGroupId) || 0,
        jobSubGroupId: parseInt(formData.jobSubGroupId) || 0,
        jobNameId: parseInt(formData.jobNameId) || 0,
        subAdId: parseInt(formData.subAdId) || 0,
        departmentId: parseInt(formData.departmentId) || 0,
        existaceCaseId: parseInt(formData.existaceCaseId) || 0,
        taminNo: parseInt(formData.taminNo) || 0,
        appointDN: parseInt(formData.appointDN) || 0,
        experanceDN: parseInt(formData.experanceDN) || 0,
        healthStateId: parseInt(formData.healthStateId) || 0,
        socialStateId: parseInt(formData.socialStateId) || 0,
        governrateId: parseInt(formData.governrateId) || 0,
        workEndDec: parseInt(formData.workEndDec) || 0,
        reservedDays: parseInt(formData.reservedDays) || 0,
        reservedMonths: parseInt(formData.reservedMonths) || 0,
        reservedYears: parseInt(formData.reservedYears) || 0,
        fincialDegreeId: parseInt(formData.fincialDegreeId) || 0,
        gender: parseInt(formData.gender) || 0,
        nonExistanceTypeId: formData.nonExistanceTypeId || 0,
        serial: formData.serial || Math.floor(Math.random() * 10000) + 1000,
        code: formData.code || 0,
        lastBalance: formData.lastBalance || 0,
        currentBalance: formData.currentBalance || 0,
        lastYearBalance: formData.lastYearBalance || 0,
        sickBalance: formData.sickBalance || 0,
        degreeDate:
          formData.degreeDate ||
          formData.fincialDegreeDate ||
          formData.appointDate ||
          "",
      };

      // Remove empty date fields
      const dateFields = [
        "appointDate",
        "workEndDate",
        "birthDate",
        "workDate",
        "experanceDate",
        "workDateFt",
        "reAppointDate",
        "combinationDate",
        "workEndDeDate",
        "fJobDate",
        "fincialDegreeDate",
        "degreeDate",
      ];

      dateFields.forEach((field) => {
        if (!cleanedData[field]) {
          delete cleanedData[field];
        }
      });

      // Remove empty string fields
      const optionalStringFields = [
        "yearBuy",
        "city",
        "village",
        "appointDateTxt",
        "workDateTxt",
        "workDateFtTxt",
        "reAppointDateTxt",
        "combinationDateTxt",
        "experanceDateTxt",
        "boundDegree",
        "experanceDomain",
        "disabilityType",
        "disabilityFamilyMember",
      ];

      optionalStringFields.forEach((field) => {
        if (cleanedData[field] === "") {
          delete cleanedData[field];
        }
      });

      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://193.227.24.29:5000/api/Employee/UpdateEmployee/${id}`
        : "http://193.227.24.29:5000/api/Employee";
      console.log(cleanedData[0]);
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        let errorMessage;
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await response.json();
            errorMessage =
              errorData.message ||
              errorData.error ||
              `HTTP error! status: ${response.status}`;
            console.error("JSON Error Details:", errorData);
          } catch {
            errorMessage = `HTTP error! status: ${response.status}`;
          }
        } else {
          try {
            const errorText = await response.text();
            errorMessage =
              errorText || `HTTP error! status: ${response.status}`;
            console.error("Text Error Details:", errorText);
          } catch {
            errorMessage = `HTTP error! status: ${response.status}`;
          }
        }

        throw new Error(errorMessage);
      }

      const result = response;
      console.log("Success:", result);
      alert(id ? "تم تحديث البيانات بنجاح!" : "تم حفظ البيانات بنجاح!");
      navigate(-1); // Go back after successful submission
    } catch (error) {
      console.error("Full Error:", error);
      alert("حدث خطأ في حفظ البيانات: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">جاري تحميل البيانات...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[90%] mx-auto p-4" dir="rtl">
      <div className="w-full p-4 flex justify-between" dir="rtl">
        <h2 className="text-2xl font-bold mb-6 text-right">
          {id ? "تعديل موظف" : "اضافة موظف"}
        </h2>
        <button
          className="bg-[#176D6A] text-white px-4 py-2 hover:opacity-90"
          style={{ borderRadius: "6px" }}
          onClick={() => navigate(-1)}
        >
          العودة
        </button>
      </div>

      <PersonalInformation formData={formData} handleChange={handleChange} />
      <JobInformation
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
      />
      <ExperienceInformation formData={formData} handleChange={handleChange} />

      <div className="mt-6 text-left">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {id ? "تحديث" : "حفظ"}
        </button>
      </div>
    </div>
  );
};

export default Index;
