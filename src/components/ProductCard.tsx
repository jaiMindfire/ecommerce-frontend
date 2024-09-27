import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  styled,
  Box,
  Tooltip,
  Chip,
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
  maxWidth: 250,
  margin: "0 auto",
  padding: theme.spacing(2),
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: "56.25%",
  borderRadius: 8,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

export const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
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
  const isInCart = cartItems.find((item) => item.product?._id === product._id);

  const handleProductSelect = () => {
    dispatch(setSelectedProduct(product));
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    dispatch(addItemToCart({ product, quantity: 1 }));
    if (isInCart) {
      navigate("/cart");
    } else {
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
      <Box position="relative">
        <StyledCardMedia image={product.imageUrl} title={product.name} />
        <Chip
          label={(product?.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
          color={(product?.stock || 0) > 0 ? "success" : "error"}
          sx={{
            position: "absolute",
            top: 8,
            right: 8, // Adjusts the position to the top-right corner
          }}
        />
      </Box>
      <CardContent>
        <Tooltip title={product.name}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h3"
            height="50px"
            textOverflow="ellipsis"
          >
            {product.name.length > 20
              ? `${product.name.substring(0, 20)}...`
              : product.name}
          </Typography>
        </Tooltip>
        {/* <Typography variant="body2" color="text.secondary" paragraph>
          {product.description.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
        </Typography> */}
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price.toFixed(2)}
        </Typography>
        <AddToCartButton
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          disabled={product?.stock === 0}
        >
          {isInCart ? "Go To Cart" : "Add To Cart"}
        </AddToCartButton>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
