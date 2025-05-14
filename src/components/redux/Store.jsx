import { configureStore } from '@reduxjs/toolkit';
import facultySlice from './Reducers'

export const store = configureStore({
  reducer: {
      faculty: facultySlice
  },
})
