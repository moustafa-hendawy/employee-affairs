import { configureStore } from '@reduxjs/toolkit';
import facultySlice from './FacultyReducers'
import sectorSlice from './SectorReducers'
import generalSlice from './GeneralAdReducer'

export const store = configureStore({
  reducer: {
      faculty: facultySlice,
      sectors: sectorSlice,
      generalSlice: generalSlice
  },
})
