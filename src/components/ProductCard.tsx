import React from "react";

// MUI Imports
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
  CircularProgress,
  Snackbar,
  Alert,
  Rating,
} from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "../store/redux/productsSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "@store/index";
import useAddToCart from "../hooks/useAddToCart";
import { usePopup } from "../store/context/LoginPopupContext";
import { Product } from "@models/prodctsType";
import { PRODUCT_MESSAGES } from "@constants/index";
import { useRouter } from "next/navigation";

// TypeScript interface for ProductCard props
interface ProductCardProps {
  product: Product;
}

// Styled Components
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

const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
  },
}));

const OutOfStockText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.error.main,
  fontWeight: "bold",
}));

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  //redux-state
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isInCart = cartItems.find((item) => item.product?._id === product._id);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth?.token);
  //hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const { openModal } = usePopup();
  const {
    handleAddToCart,
    snackbarMessage,
    snackbarSeverity,
    openSnackbar,
    handleSnackbarClose,
    isLoading,
  } = useAddToCart();

  //Handle product selection and navigation
  const handleProductSelect = () => {
    dispatch(setSelectedProduct(product));
    router.push(`/products/${product._id}`);
  };

  return (
    <>
      <StyledCard onClick={handleProductSelect}>
        <Box position="relative">
          <StyledCardMedia image={product.imageUrl} title={product.name} />
          <Chip
            label={
              (product?.stock || 0) > 0
                ? PRODUCT_MESSAGES.stock.inStock
                : PRODUCT_MESSAGES.stock.outOfStock
            }
            color={(product?.stock || 0) > 0 ? "success" : "error"}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
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

          <Box display="flex" alignItems="center" mb={1}>
            <Rating
              value={product.rating}
              precision={0.5} // Allows half-star ratings
              readOnly
              size="small"
            />
            <Typography variant="body2" ml={1}>
              ({product.rating})
            </Typography>
          </Box>

          <Typography variant="h6" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>

          {(product?.stock || 0) > 0 ? (
            <AddToCartButton
              variant="contained"
              color="primary"
              fullWidth
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <ShoppingCartIcon />
                )
              }
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product, router.push, isLoggedIn, openModal);
              }}
            >
              {isInCart
                ? PRODUCT_MESSAGES.button.goToCart
                : PRODUCT_MESSAGES.button.addToCart}
              {/* If products not in cart then add to cart else go to cart */}
            </AddToCartButton>
          ) : (
            <OutOfStockText>Out of Stock</OutOfStockText>
          )}
        </CardContent>
      </StyledCard>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
