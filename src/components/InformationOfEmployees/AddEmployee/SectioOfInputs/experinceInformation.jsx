const ExperienceInformation = ({ formData, handleChange }) => {
  return (
    <>
      <div className="experince-information mt-3">
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176D6A] text-right">
          بيانات خاصه بالخبره
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rtl">
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ الخبره
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="experanceDate"
                value={formData.experanceDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                name="experanceDateTxt"
                value={formData.experanceDateTxt}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-right font-medium mb-1">
              رقم قرار الخبرة
            </label>
            <div>
              <input
                type="number"
                name="experanceDN"
                value={formData.experanceDN}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              مده مؤقته
            </label>
            <div>
              <input
                type="text"
                name="yearEmp"
                value={formData.yearEmp}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تسلسل درحات القيد
            </label>
            <div>
              <input
                type="text"
                name="boundDegree"
                value={formData.boundDegree}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ نهاية الخدمه
            </label>
            <div>
              <input
                type="date"
                name="workEndDate"
                value={formData.workEndDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-right font-medium mb-1">
              رقم القرار
            </label>
            <div>
              <input
                type="number"
                name="workEndDec"
                value={formData.workEndDec}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ القرار
            </label>
            <div>
              <input
                type="date"
                name="workEndDeDate"
                value={formData.workEndDeDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              مجالات الخبره
            </label>
            <div>
              <textarea
                name="experanceDomain"
                value={formData.experanceDomain}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceInformation;
