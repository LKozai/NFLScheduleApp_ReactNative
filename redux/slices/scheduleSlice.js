import { createSlice } from '@reduxjs/toolkit';

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedule: [], // schedule array to store the NFL schedule after the API fetch
    selectedWeek: 7, // default week set to Week 7 (can be updated for each current week)
    favourites: [],    // array to store the user's favourite games
  },
  reducers: {
    fetchSchedule: (state, action) => {
      state.schedule = action.payload; // fill out the schedule using API data
    },
    setWeek: (state, action) => {
      state.selectedWeek = action.payload;  // action to update the selected week
    },
    addFavourite: (state, action) => {
      state.favourites.push(action.payload); // adding a game to the favourites array
    },
    removeFavourite: (state, action) => {
      // removing a game from favourites using its game id
      state.favourites = state.favourites.filter(game => game.id !== action.payload);
    },
  },
});

export const { fetchSchedule, setWeek, addFavourite, removeFavourite } = scheduleSlice.actions;

export default scheduleSlice.reducer;
