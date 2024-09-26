import { Product } from "./prodctsType";

export interface CartItem {
    product: Product,
    quantity: number
  }

  export interface CartResponse {
    _id: string;
    items: Array<{
      product: Product;
      quantity: number;
    }>;
  }