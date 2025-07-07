const ExperienceDisplay = ({ formData }) => {
  return (
    <>
      <div className="experince-information w-[98%] mx-auto mt-3">
        <div className="text-[15px] text-white mb-6 p-3 bg-[#176d6a] text-right">
          بيانات خاصه بالخبره والانتداب
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rtl">
          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ الخبره
            </label>
            <div className="flex gap-2">
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.experanceDate}
              </span>
              <span className="p-2 w-1/2 border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.experanceDateTxt}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              رقم قرار الخبرة
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.experanceDN}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              مده مؤقته
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.yearEmp}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              مجالات الخبره
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.experanceDomain}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تسلسل درحات القيد
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.boundDegree}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ نهاية الخدمه
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.workEndDate}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              رقم القرار
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.workEndDec}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-right font-medium mb-1">
              تاريخ القرار
            </label>
            <div>
              <span className="p-2 w-full block border border-gray-300 rounded-md bg-gray-100 text-right">
                {formData.workEndDeDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceDisplay;
