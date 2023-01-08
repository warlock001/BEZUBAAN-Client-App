import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const PromotionSlice = createSlice({
  name: 'promotions',
  initialState: {
    promotions: [],
  },
  reducers: {
    setPromotions(state, action) {
      state.promotions = action.payload;
    },
  },
});

export const {setPromotions} = PromotionSlice.actions;
export default PromotionSlice.reducer;
