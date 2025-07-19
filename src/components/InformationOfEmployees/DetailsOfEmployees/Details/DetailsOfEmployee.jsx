import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
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
    label: " بيانات خاصه بالخبره ",
    Component: ExperienceDisplay,
  },
  { key: "allowance", label: "      العلاوات", Component: AllowanceDetails },
  { key: "finicial", label: "  بيانات الذمة المالية", Component: FinicialZema },
  {
    key: "yearReport",
    label: " بيانات التقارير السنوية ",
    Component: YearReportDetails,
  },
  { key: "lagna", label: "        بيانات اللجنة", Component: LagnaDetails },
  { key: "salary", label: "        بيانات المرتب", Component: SalaryDetails },
  {
    key: "thanks",
    label: "بيانات خطابات الشكر",
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
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [openSections, setOpenSections] = useState(new Set());

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `http://193.227.24.29:5000/api/Employee?nationalId=${nationalId}`
        );
        const data = await response.json();
        setEmployee(data[0]);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [nationalId]);

  const toggleSection = (key) => {
    const updatedSections = new Set(openSections);
    if (key == "personal") {
      updatedSections.add(key);
    } else if (updatedSections.has(key)) {
      updatedSections.delete(key);
    } else {
      updatedSections.add(key);
    }
    setOpenSections(updatedSections);
  };

  const handleDelete = async () => {
    if (window.confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
      try {
        const updatedEmployee = {
          ...employee,
          isExist: true,
        };

        const response = await fetch(
          `http://193.227.24.29:5000/api/Employee/UpdateEmployee/${nationalId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEmployee),
          }
        );

        const resText = await response.text();
        console.log("Response:", resText);

        if (response.ok) {
          setEmployee(updatedEmployee);
          alert("تم حذف الموظف بنجاح");
        } else {
          alert("حدث خطأ أثناء حذف الموظف: " + resText);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("حدث خطأ أثناء حذف الموظف");
      }
    }
  };

  return (
    <div className="mt-6 px-4">
      <div className=" mb-8   flex justify-between">
        <div className="text-3xl text-right font-bold text-gray-800">
          {" "}
          تفاصيل الموظف
        </div>

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
      <div>
        <div className="mb-4 border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-100 px-5 py-3 flex justify-between items-center">
            <span className="text-right text-gray-800">البيانات الشخصية</span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => navigate(`/edit/${nationalId}`)}
                className="text-blue-600 p-1 hover:bg-blue-100 rounded"
              >
                <FaEdit size={16} />
              </button>
              <button
                onClick={() => handleDelete()}
                className="text-red-600 p-1 hover:bg-red-100 rounded"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
          <div className="p-5 bg-white">
            <PersonalInformationDisplay nationalId={nationalId} />
          </div>
        </div>

        {sections
          .filter(({ key }) => key !== "personal")
          .map(({ key, label, Component }) => {
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
                    {key === "job" || key === "experience" ? (
                      <Component nationalId={nationalId} />
                    ) : (
                      <Component empId={nationalId} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailsOfEmployee;
