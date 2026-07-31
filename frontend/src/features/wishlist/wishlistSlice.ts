import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from '../../types';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.items = payload;
      } else if (payload && Array.isArray(payload.data)) {
        state.items = payload.data;
      } else {
        state.items = [];
      }
      state.isLoading = false;
      state.error = null;
    },
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setWishlist, setWishlistLoading } = wishlistSlice.actions;
export default wishlistSlice.reducer;
