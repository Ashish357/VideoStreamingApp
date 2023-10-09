import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    homeVideos: [],
    activeCategory: ''
  },
  reducers: {
    addHomeVideos: (state, action) => {
      state.homeVideos.splice(150, 20);
      const { videos, category } = action.payload;
      // Create a set to keep track of video IDs in the current state
      const currentVideoIds = new Set(state.homeVideos.map(video => video.id));

      // Filter out videos that are not already in the state
      const newVideos = videos.filter(video => !currentVideoIds.has(video.id));
      state.homeVideos = category === state.activeCategory ? [...state.homeVideos, ...newVideos] : newVideos;
      state.activeCategory = category;
    }
  }
})

export const { addHomeVideos } = videoSlice.actions;
export default videoSlice.reducer;