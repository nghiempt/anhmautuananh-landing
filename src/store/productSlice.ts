import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  selectedProductId: string | null;
}

const initialState: ProductState = {
  selectedProductId: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProductId: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload;
    },
    clearSelectedProductId: (state) => {
      state.selectedProductId = null;
    },
  },
});

export const { setSelectedProductId, clearSelectedProductId } =
  productSlice.actions;
export default productSlice.reducer;
