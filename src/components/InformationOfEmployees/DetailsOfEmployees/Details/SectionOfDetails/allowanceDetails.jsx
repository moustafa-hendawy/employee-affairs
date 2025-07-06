import { useState, useEffect } from "react";

const AllowanceDetails = ({ empId }) => {
  const [allowanceData, setAllowanceData] = useState(null);
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  useEffect(() => {
    const fetchAllowanceDetails = async () => {
      try {
        const response = await fetch(`http://193.227.24.29:5000/api/Allowance`);
        const data = await response.json();
        console.log("Allowance details:", data);
        setAllowanceData(data);
      } catch (error) {
        console.error("Error fetching allowance details:", error);
      }
    };

    fetchAllowanceDetails();
  }, [empId]);

  useEffect(() => {
    if (allowanceData) {
      const AllowanceType = async () => {
        try {
          const response = await fetch(
            `http://193.227.24.29:5000/api/AllowanceType`
          );
          const data = await response.json();
          console.log("Allowance types:", data);
          setAllowanceTypes(data);
        } catch (error) {
          console.error("Error fetching allowance types:", error);
        }
      };

      AllowanceType();
    }
  }, [allowanceData]);

  return (
    <>
      <div className=" w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white mb-2 p-3 bg-blue-500 text-right">
          العلاوات
        </div>
        <div className="allowance-details">
          {allowanceData?.filter((allowance) => allowance.empId == empId)
            .length > 0 ? (
            <div className="overflow-x-auto bg-white p-4 rounded shadow">
              <table className="min-w-full bg-white shadow-md mt-1 rounded-lg ">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2 px-4 text-left border">م</th>
                    <th className="py-2 px-4 text-left border">نوع العلاوة</th>
                    <th className="py-2 px-4 text-left border"> رقم القرار</th>
                    <th className="py-2 px-4 text-left border">تاريخ القرار</th>
                  </tr>
                </thead>
                <tbody>
                  {allowanceData
                    .filter((allowance) => allowance.empId == empId)
                    .sort((a, b) => a.code - b.code)
                    .map((allowance, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-2 px-4 border">{index + 1}</td>
                        <td className="py-2 px-4 border">
                          {allowanceTypes.find(
                            (type) => type.id === allowance.allowanceTypeId
                          )?.name || "غير محدد"}
                        </td>
                        <td className="py-2 px-4 border">
                          {allowance.decisionNo}
                        </td>
                        <td className="py-2 px-4 border">
                          {allowance.decisionDate}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>لا توجد بيانات للعلاوات</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllowanceDetails;
