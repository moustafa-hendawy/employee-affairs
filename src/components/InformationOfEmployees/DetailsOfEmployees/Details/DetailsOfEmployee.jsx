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

const sections = [
  {
    key: "personal",
    label: "البيانات الشخصية",
    Component: PersonalInformationDisplay,
  },
  { key: "job", label: "البيانات الوظيفية", Component: JobInformationDisplay },
  {
    key: "experience",
    label: " بيانات خاصه بالخبره والانتداب",
    Component: ExperienceDisplay,
  },
  { key: "allowance", label: "      العلاوات", Component: AllowanceDetails },
  { key: "finicial", label: "  بيانات الذمة المالية", Component: FinicialZema },
  {
    key: "yearReport",
    label: "        بيانات سنة التقارير",
    Component: YearReportDetails,
  },
  { key: "lagna", label: "        بيانات اللجنة", Component: LagnaDetails },
  { key: "salary", label: "        بيانات المرتب", Component: SalaryDetails },
  {
    key: "thanks",
    label: "        بيانات خطابات الشكر",
    Component: ThanksLetter,
  },
  {
    key: "military",
    label: "        بيانات الموقف العسكري",
    Component: MilitaryState,
  },
  {
    key: "penalty",
    label: "        بيانات الجزاءات",
    Component: PenaltyDetails,
  },
  {
    key: "yearLaw",
    label: "   بيانات تقارير السنة ",
    Component: YearReportLawDetails,
  },
  {
    key: "vacation",
    label: "        بيانات الاجازات",
    Component: VacationDetails,
  },
  {
    key: "mandate",
    label: "        بيانات الانتداب",
    Component: MandateDataDetails,
  },
  {
    key: "degredation",
    label: "        بيانات الترقيات",
    Component: JobDegredationDataDetails,
  },
  {
    key: "qualification",
    label: "        بيانات المؤهلات",
    Component: QualificationDetails,
  },
  {
    key: "training",
    label: "        بيانات التدريب",
    Component: TrainingDetails,
  },
];

const DetailsOfEmployee = () => {
  const { nationalId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [openSections, setOpenSections] = useState(new Set());

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/Employee?nationalId=${nationalId}`
        );
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [nationalId]);

  const toggleSection = (key) => {
    const updatedSections = new Set(openSections);
    if (updatedSections.has(key)) {
      updatedSections.delete(key);
    } else {
      updatedSections.add(key);
    }
    setOpenSections(updatedSections);
  };

  return (
    <div className="mt-6 px-4">
      <div className="text-3xl font-bold mb-8 text-right font-bold  text-gray-800">
        تفاصيل الموظف
      </div>
      {employee &&
        employee.map((emp, index) => (
          <div key={index}>
            {sections.map(({ key, label, Component }) => {
              const isOpen = openSections.has(key);
              return (
                <div
                  key={key}
                  className="mb-4 border rounded-lg shadow-sm overflow-hidden"
                >
                  <div
                    className="bg-gray-100 hover:bg-gray-200 cursor-pointer px-5 py-3 flex justify-between items-center"
                    onClick={() => toggleSection(key)}
                  >
                    <span className="text-right  text-gray-800">{label}</span>
                    <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
                  </div>
                  {isOpen && (
                    <div className="p-5 bg-white">
                      {key === "personal" ||
                      key === "job" ||
                      key === "experience" ? (
                        <Component formData={emp} />
                      ) : (
                        <Component empId={emp.nationalId} />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default DetailsOfEmployee;
