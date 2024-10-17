//Static Imports
import { CartItem, CartResponse } from "@models/cartTypes";

export const handleMergeLocalCart = (
  cartItems: CartResponse | undefined,
  massAddToCart: any
) => {
  const newItems: CartItem[] = []; //Array to hold new items to be added
  const localItems = JSON.parse(localStorage.getItem("cart") || "[]"); //Fetch local cart items from local storage

  //Iterate through each local item to check if it's already in the server cart
  localItems?.forEach((item: any) => {
    const existingItem = cartItems?.items?.find(
      (cartItem) => cartItem.product?._id === item?.product?._id
    );
    //If the item is not found in the server cart, add it to newItems
    if (!existingItem) {
      newItems.push(item);
    }
  });

  //If there are new items, call massAddToCart to add them to the server cart
  if (newItems.length) {
    massAddToCart(newItems);
  }
};
