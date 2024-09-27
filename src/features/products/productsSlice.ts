import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/prodctsType";
import { CartItem } from "../../types/cartTypes";
// import { productsApi } from "./productsApi";

interface ProductsState {
  products: Product[];
  searchTerm: string;
  selectedProduct: Product;
  checkedOutItems: CartItem[];
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
  checkedOutItems: [],
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
    setChceckedOut(state, action: PayloadAction<CartItem[]>) {
      state.checkedOutItems = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedProduct, setChceckedOut } =
  productsSlice.actions;
export default productsSlice.reducer;
