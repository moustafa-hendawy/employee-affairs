import { configureStore } from '@reduxjs/toolkit';
import facultySlice from './FacultyReducers'
import sectorSlice from './SectorReducers'


export const store = configureStore({
  reducer: {
      faculty: facultySlice,
      sectors: sectorSlice
  },
})
