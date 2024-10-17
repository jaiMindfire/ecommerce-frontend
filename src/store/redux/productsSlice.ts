import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/prodctsType";
import { CartItem } from "../../models/cartTypes";

interface ProductsState {
  products: Product[]; // Array of products
  searchTerm: string; // Current search term for filtering products
  selectedProduct: Product; // Currently selected product for detailed view
  checkedOutItems: CartItem[]; // Array of items that have been checked out
  priceRange: number[]; // Price range for filtering products
  selectedCategory: string[]; // Array of selected categories for filtering products
  selectedRating: number; // Selected rating for filtering products
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

// Create a slice for product-related actions and state
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action to set the search term
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },

    // Action to set the currently selected product
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },

    // Action to set the checked out items, these items will be used to decide when to revalidate the cache of
    // current Product detail page, to show fresh stock.
    setCheckedOut(state, action: PayloadAction<CartItem[]>) {
      state.checkedOutItems = action.payload;
    },

    // Action to set the price range for filtering
    setPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
    },

    // Action to set the selected categories for filtering
    setSelectedCategory(state, action: PayloadAction<string[]>) {
      state.selectedCategory = action.payload;
    },

    // Action to set the selected rating for filtering
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
