import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  styled,
  Box,
  Grid,
} from "@mui/material";
import { Product } from "../types/prodctsType";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../features/cart/cartSlice";
import { useAddToCartMutation } from "../features/cart/cartApi";
import { RootState } from "../redux/store";

interface ProductCardProps {
  product: Product;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: "75%",
  position: "relative",
});

export const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
  },
}));

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addToCart] = useAddToCartMutation();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleProductSelect = () => {
    dispatch(setSelectedProduct(product));
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    const existingItem = cartItems.find(
      (item) => item.product?._id === product._id
    );
    dispatch(addItemToCart({ product, quantity: 1 }));
    if (!existingItem) {
      addToCart({
        productId: product._id,
        quantity: 1,
        product,
      })
        .unwrap()
        .catch((err) => removeItemFromCart(product._id));
    }
  };

  return (
    <StyledCard onClick={handleProductSelect}>
      <StyledCardMedia
        image={product.imageUrl}
        title={product.name}
      ></StyledCardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price.toFixed(2)}
        </Typography>
        <AddToCartButton
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </AddToCartButton>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
