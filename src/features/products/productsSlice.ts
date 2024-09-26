import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/prodctsType";
// import { productsApi } from "./productsApi";

interface ProductsState {
  products: Product[];
  searchTerm: string;
  selectedProduct: Product;
}

const initialState: ProductsState = {
  products: [],
  searchTerm: "",
  selectedProduct: {
    _id: "",
    description: "",
    stock: 0,
    imageUrl: "",
    name: "",
    price: 0,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
