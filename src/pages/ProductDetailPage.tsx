import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Chip,
  Button,
  styled,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "@services/productsApi";
import { addItemToCart, removeItemFromCart } from "../store/redux/cartSlice";
import { useAddToCartMutation } from "@services/cartApi";
import { setCheckedOut } from "../store/redux/productsSlice";
import useAddToCart from "../hooks/useAddToCart";
import { usePopup } from "../store/context/LoginPopupContext";

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 400,
  [theme.breakpoints.down("sm")]: {
    height: 300,
  },
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const ProductDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading: isLoadingProduct,
    refetch,
  } = useGetProductByIdQuery(id || "");
  const checkedOutItems = useSelector(
    (state: RootState) => state.products.checkedOutItems
  );
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  const isInCart = cartItems.find((item) => item.product?._id === product?._id);

  const { openModal } = usePopup();

  const isInCheckoutItems = checkedOutItems.find(
    (item) => item.product._id === product?._id
  );

  useEffect(() => {
    console.log(isInCheckoutItems, "dddd");
    if (isInCheckoutItems) {
      refetch();
      const newItems = checkedOutItems.filter(
        (item) => item.product?._id !== product?._id
      );
      dispatch(setCheckedOut(newItems));
    }
  }, []);

  const {
    handleAddToCart,
    snackbarMessage,
    snackbarSeverity,
    openSnackbar,
    handleSnackbarClose,
  } = useAddToCart();

  if (isLoadingProduct) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">Failed to load product.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <ProductImage image={product?.imageUrl} title={product?.name} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product?.name}
          </Typography>
          <PriceTypography color="primary" gutterBottom>
            ${product?.price.toFixed(2)}
          </PriceTypography>
          <Typography variant="body1" paragraph>
            {product?.description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip
              label={(product?.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
              color={(product?.stock || 0) > 0 ? "success" : "error"}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {product?.stock || 0} items left
            </Typography>
          </Box>
          <Box>
            <ActionButton
              variant="contained"
              color="primary"
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <ShoppingCartIcon />
                )
              }
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product, navigate, isLoggedIn, openModal);
              }}
              disabled={product?.stock === 0 || isLoading}
            >
              {isInCart ? "Go To Cart" : "Add To Cart"}
            </ActionButton>
          </Box>
        </Grid>
      </Grid>

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
    </Box>
  );
};

export default ProductDetailPage;
