import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './slices/scheduleSlice'; // import the schedule slice reducer

// create + configure the Redux store
const store = configureStore({
  reducer: {
    schedule: scheduleReducer, // attach scheduleReducer to the 'schedule' key in the Redux store
  },
});

export default store;