import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/prodctsType";
import { CartItem } from "../../models/cartTypes";

interface ProductsState {
  products: Product[];
  searchTerm: string;
  selectedProduct: Product;
  checkedOutItems: CartItem[];
  priceRange: number[];
  selectedCategory: string[];
  selectedRating: number;
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
    rating: 0,
  },
  checkedOutItems: [],
  priceRange: [0, 1000],
  selectedCategory: [],
  selectedRating: 0,
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
    setCheckedOut(state, action: PayloadAction<CartItem[]>) {
      state.checkedOutItems = action.payload;
    },
    setPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string[]>) {
      state.selectedCategory = action.payload;
    },
    setSelectedRating(state, action: PayloadAction<number>) {
      state.selectedRating = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setSelectedProduct,
  setCheckedOut,
  setPriceRange,
  setSelectedCategory,
  setSelectedRating,
} = productsSlice.actions;

export default productsSlice.reducer;
