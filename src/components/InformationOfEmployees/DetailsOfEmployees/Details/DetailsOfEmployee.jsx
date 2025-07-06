import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExperienceDisplay from "./SectionOfDetails/expertinceDisplay";
import JobInformationDisplay from "./SectionOfDetails/jobInformationDetails";
import PersonalInformationDisplay from "./SectionOfDetails/personalInformationDetails";
import AllowanceDetails from "./SectionOfDetails/allowanceDetails";
import FinicialZema from "./SectionOfDetails/finicialZema";
import YearReportDetails from "./SectionOfDetails/yearReportDetails";
import LagnaDetails from "./SectionOfDetails/lagnaDetails";
import SalaryDetails from "./SectionOfDetails/salaryDetails";
import ThanksLetter from "./SectionOfDetails/thanksLetter";
import MilitaryState from "./SectionOfDetails/militaryState";
import PenaltyDetails from "./SectionOfDetails/penaltyDetails";
import YearReportLawDetails from "./SectionOfDetails/yearReportLawDetails";
import VacationDetails from "./SectionOfDetails/vacationDetails";
import MandateDataDetails from "./SectionOfDetails/mandateDataDetails";
import TrainingDetails from "./SectionOfDetails/trainingDetails";
import JobDegredationDataDetails from "./SectionOfDetails/JobDegredationDataDetails";
import QualificationDetails from "./SectionOfDetails/QualificationDetails";

const DetailsOfEmployee = () => {
  const { nationalId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/Employee?nationalId=${nationalId}`
        );
        const data = await response.json();
        console.log("Employee details:", data);
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [nationalId]);

  return (
    <div className="mt-3 ">
      <h2 className="text-2xl font-bold mb-6 text-right mt-3.5 mr-3">
        تفاصيل الموظف
      </h2>
      {employee && (
        <div>
          {employee.map((emp, index) => (
            <div key={index}>
              <PersonalInformationDisplay formData={emp} />
              <JobInformationDisplay formData={emp} />
              <ExperienceDisplay formData={emp} />
              <AllowanceDetails empId={emp.nationalId} />
              <FinicialZema empId={emp.nationalId} />
              <YearReportDetails empId={emp.nationalId} />
              <LagnaDetails empId={emp.nationalId} />
              <SalaryDetails empId={emp.nationalId} />
              <ThanksLetter empId={emp.nationalId} />
              <MilitaryState empId={emp.nationalId} />
              <PenaltyDetails empId={emp.nationalId} />
              <YearReportLawDetails empId={emp.nationalId} />
              <VacationDetails empId={emp.nationalId} />
              <MandateDataDetails empId={emp.nationalId} />
              <TrainingDetails empId={emp.nationalId} />
              <JobDegredationDataDetails empId={emp.nationalId} />
              <QualificationDetails empId={emp.nationalId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailsOfEmployee;
