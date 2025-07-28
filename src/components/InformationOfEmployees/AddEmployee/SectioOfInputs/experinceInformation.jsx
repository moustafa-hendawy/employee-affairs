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
              {" "}
              <span className="text-red-500">*</span>
              تاريخ الخبره
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="experanceDate"
                value={formData.experanceDate}
                required
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                name="experanceDateTxt"
                value={formData.experanceDateTxt}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              رقم قرار الخبرة
            </label>
            <div>
              <input
                type="number"
                name="experanceDN"
                required
                value={formData.experanceDN}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              مده مؤقته
            </label>
            <div>
              <input
                type="text"
                name="yearEmp"
                required
                value={formData.yearEmp}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              تسلسل درحات القيد
            </label>
            <div>
              <input
                type="text"
                name="boundDegree"
                required
                value={formData.boundDegree}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              تاريخ نهاية الخدمه
            </label>
            <div>
              <input
                type="date"
                name="workEndDate"
                required
                value={formData.workEndDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-right font-medium mb-1">
              {" "}
              <span className="text-red-500">*</span>
              رقم القرار
            </label>
            <div>
              <input
                required
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
              {" "}
              <span className="text-red-500">*</span>
              تاريخ القرار
            </label>
            <div>
              <input
                required
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
              {" "}
              <span className="text-red-500">*</span>
              مجالات الخبره
            </label>
            <div>
              <textarea
                name="experanceDomain"
                required
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
