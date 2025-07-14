import { configureStore } from '@reduxjs/toolkit';
import facultySlice from './FacultyReducers'
import sectorSlice from './SectorReducers'
import generalSlice from './GeneralAdReducer'
import subAdSlice from './SubAdReducer'
import jobDegreeSlice from './FinintialDegeeReducer'
import fincialDegreeSlice from './FinintialDegeeTypeReducer'
import departmentSlice from './DepartmentReducer'


export const store = configureStore({
  reducer: {
      faculty: facultySlice,
      sectors: sectorSlice,
      generalSlice: generalSlice,
      subAdSlice: subAdSlice,
      fincialDegree: jobDegreeSlice,
      fincialDegreeType: fincialDegreeSlice,
      department: departmentSlice
  },
})
