import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebar: false,
  },
  reducers: {
    setSidebar(state, action) {
      state.sidebar = action.payload;
    },
  },
});

export const {setSidebar} = SidebarSlice.actions;
export default SidebarSlice.reducer;
