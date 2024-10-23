import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "src/store/redux/cartSlice";
import { addItemToCart, selectCartItems } from "@store/redux/cartSlice";
import { CartItem } from "@models/cartTypes";
import { Product } from "@models/prodctsType";
import { RootState } from "@store/index";
import { testStore } from "./testStore";
import { Provider } from "react-redux";
import ProductCard from "@components/Products/ProductCard";
import { fireEvent, render, screen } from "@testing-library/react";
import { PopupProvider } from "@store/context/LoginPopupContext";
import { MemoryRouter } from "react-router-dom";
import { PRODUCT_MESSAGES } from "@constants/index";

describe("Cart Slice", () => {
  let mockStore: ReturnType<typeof configureStore>;

  // mock product to add to the cart
  const mockProduct: Product = {
    _id: "66fd837e921c14536bf96da7",
    name: "GoPro HERO10 Black",
    description: "Capture incredible moments in stunning 5.3K video.",
    price: 399.99,
    imageUrl:
      "https://m.media-amazon.com/images/I/61A31TlXnuL._AC_UF1000,1000_QL80_.jpg",
    stock: 45,
    rating: 1.7,
  };

  const mockCartItem: CartItem = {
    product: mockProduct,
    quantity: 1,
  };

  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();

    // Setup the store with cartReducer
    mockStore = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  it("should add item to the cart", () => {
    // Dispatch the addItemToCart action
    mockStore.dispatch(addItemToCart(mockCartItem));

    // Get the updated cart items from the state
    const cartItems = selectCartItems(mockStore.getState() as RootState);

    // Expect the cart to have the added product
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].product._id).toEqual(mockProduct._id);
    expect(cartItems[0].quantity).toEqual(1);

    // Expect the cart to be saved in localStorage
    const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(localStorageCart).toHaveLength(1);
    expect(localStorageCart[0].product._id).toEqual(mockProduct._id);
  });

  it("should not add duplicate items to the cart", () => {
    // Add the same item twice
    mockStore.dispatch(addItemToCart(mockCartItem));
    mockStore.dispatch(addItemToCart(mockCartItem));

    const cartItems = selectCartItems(mockStore.getState() as RootState);
    expect(cartItems).toHaveLength(1); // No duplicate item should be added
  });

  it('should dispatch addItemToCart when the "Add to Cart" button is clicked', () => {
    const dispatchSpy = jest.spyOn(testStore, "dispatch");
    render(
      <Provider store={testStore}>
        <PopupProvider>
          <MemoryRouter>
            <ProductCard product={mockProduct} />
          </MemoryRouter>
        </PopupProvider>
      </Provider>
    );

    // button element
    const addButton = screen.getByText(PRODUCT_MESSAGES.button.addToCart);

    // button click
    fireEvent.click(addButton);

    // Ensure addItemToCart was called with correct parameters
    expect(dispatchSpy).toHaveBeenCalledWith({
      payload: {
        product: {
          _id: "66fd837e921c14536bf96da7",
          description: "Capture incredible moments in stunning 5.3K video.",
          imageUrl:
            "https://m.media-amazon.com/images/I/61A31TlXnuL._AC_UF1000,1000_QL80_.jpg",
          name: "GoPro HERO10 Black",
          price: 399.99,
          rating: 1.7,
          stock: 45,
        },
        quantity: 1,
      },
      type: "cart/addItemToCart",
    });
    // Button text should change after adding to cart
    expect(addButton).toHaveTextContent(PRODUCT_MESSAGES.button.goToCart);
  });
});
