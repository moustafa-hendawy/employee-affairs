import { useState } from "react";
import PersonalInformation from "./SectioOfInputs/personalInformation";
import JobInformation from "./SectioOfInputs/jobInformation";
import ExperienceInformation from "./SectioOfInputs/experinceInformation";

const Index = () => {
  const [formData, setFormData] = useState({
    nationalId: "",
    fileId: "",
    name: "",
    facultyId: 0,
    jobGroupId: 0,
    jobSubGroupId: 0,
    jobNameId: 0,
    subAdId: 0,
    departmentId: 0,
    isExist: false,
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

  const handleSubmit = async () => {
    try {
      const cleanedData = {
        ...formData,
        facultyId: parseInt(formData.facultyId) || 1,
        jobGroupId: parseInt(formData.jobGroupId) || 1,
        jobSubGroupId: parseInt(formData.jobSubGroupId) || 1,
        jobNameId: parseInt(formData.jobNameId) || 1,
        subAdId: parseInt(formData.subAdId) || 1,
        departmentId: parseInt(formData.departmentId) || 1,
        existaceCaseId: parseInt(formData.existaceCaseId) || 1,
        taminNo: parseInt(formData.taminNo) || 1,
        appointDN: parseInt(formData.appointDN) || 1,
        experanceDN: parseInt(formData.experanceDN) || 1,
        healthStateId: parseInt(formData.healthStateId) || 1,
        socialStateId: parseInt(formData.socialStateId) || 1,
        governrateId: parseInt(formData.governrateId) || 1,
        disabilityFamilyMember: parseInt(formData.disabilityFamilyMember) || 0,
        workEndDec: parseInt(formData.workEndDec) || 1,
        reservedDays: parseInt(formData.reservedDays) || 1,
        reservedMonths: parseInt(formData.reservedMonths) || 1,
        reservedYears: parseInt(formData.reservedYears) || 1,
        fincialDegreeId: parseInt(formData.fincialDegreeId) || 1,
        gender: parseInt(formData.gender) || 1,
        nonExistanceTypeId: formData.nonExistanceTypeId || 1,
        serial: formData.serial || Math.floor(Math.random() * 10000) + 1000,
        code: formData.code || 1,
        lastBalance: formData.lastBalance || 200,
        currentBalance: formData.currentBalance || 300,
        lastYearBalance: formData.lastYearBalance || 400,
        sickBalance: formData.sickBalance || 0,
        degreeDate:
          formData.degreeDate ||
          formData.fincialDegreeDate ||
          formData.appointDate ||
          "2020-01-01",
      };

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
      ];

      dateFields.forEach((field) => {
        if (
          cleanedData[field] === "" ||
          cleanedData[field] === null ||
          cleanedData[field] === undefined
        ) {
          delete cleanedData[field];
        }
      });

      const optionalStringFields = ["yearBuy", "city", "village"];
      optionalStringFields.forEach((field) => {
        if (cleanedData[field] === "") {
          delete cleanedData[field];
        }
      });

      console.log("Cleaned Data:", cleanedData);

      const response = await fetch("http://193.227.24.29:5000/api/Employee", {
        method: "POST",
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
          } catch (jsonError) {
            errorMessage = `HTTP error! status: ${response.status}`;
          }
        } else {
          try {
            const errorText = await response.text();
            errorMessage =
              errorText || `HTTP error! status: ${response.status}`;
            console.error("Text Error Details:", errorText);
          } catch (textError) {
            errorMessage = `HTTP error! status: ${response.status}`;
          }
        }

        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      console.log("Success:", result);
      alert("تم حفظ البيانات بنجاح!");
    } catch (error) {
      console.error("Full Error:", error);
      alert("حدث خطأ في حفظ البيانات: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="max-w-[90%] mx-auto p-4" dir="rtl">
        <PersonalInformation formData={formData} handleChange={handleChange} />
        <JobInformation
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
        <ExperienceInformation
          formData={formData}
          handleChange={handleChange}
        />
        <div className="mt-6 text-left">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            حفظ
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
