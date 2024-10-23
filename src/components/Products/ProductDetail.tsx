"use client";
// React Imports
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Chip,
  Button,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
// 3rd Party Imports
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/system";
import Image from "next/image";
// Static Imports
import { RootState } from "@store/index";
import { setCheckedOut } from "@store/redux/productsSlice";
import useAddToCart from "@hooks/useAddToCart";
import { usePopup } from "@store/context/LoginPopupContext";
import { PRODUCT_MESSAGES } from "@constants/index";
import { Product } from "@models/prodctsType";
import { useRouter } from "next/navigation";

const ProductImageWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  height: 400,
  [theme.breakpoints.down("sm")]: {
    height: 300,
  },
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
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

const ProductDetailPage = ({ product }: { product: Product | undefined }) => {
  // Redux states
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  const theme = useSelector((state: RootState) => state.theme.theme);
  // Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  const checkedOutItems = useSelector(
    (state: RootState) => state.products.checkedOutItems
  );
  const { openModal } = usePopup();

  const {
    handleAddToCart,
    snackbarMessage,
    snackbarSeverity,
    openSnackbar,
    handleSnackbarClose,
  } = useAddToCart(); // Custom hook for cart handling

  // Variables
  const isInCart = cartItems.find((item) => item.product?._id === product?._id);
  const isInCheckoutItems = checkedOutItems.find(
    (item) => item.product._id === product?._id
  );

  // Effect to handle checkout items
  useEffect(() => {
    if (isInCheckoutItems) {
      const newItems = checkedOutItems.filter(
        (item) => item.product?._id !== product?._id
      );
      dispatch(setCheckedOut(newItems)); // Update checked out items
    }
  }, [isInCheckoutItems, checkedOutItems, product?._id, dispatch]);
  // Error handling
  // if (error) {
  //   return <Typography variant="h6">{PRODUCT_MESSAGES.error.loadProduct}</Typography>;
  // }
  if(!product){
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <ProductImageWrapper>
                <Image
                  src={product?.imageUrl}
                  alt={product?.name}
                  layout="fill" 
                  objectFit="cover" 
                />
              </ProductImageWrapper>
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
                label={
                  (product?.stock || 0) > 0
                    ? PRODUCT_MESSAGES.stock.inStock
                    : PRODUCT_MESSAGES.stock.outOfStock
                }
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
                // startIcon={
                //   isLoading ? (
                //     <CircularProgress size={24} />
                //   ) : (
                //     <ShoppingCartIcon />
                //   )
                // }
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product, router, isLoggedIn, openModal);
                }}
                // disabled={product?.stock === 0 || isLoading} // Disable button if out of stock or loading
              >
                {isInCart
                  ? PRODUCT_MESSAGES.button.goToCart
                  : PRODUCT_MESSAGES.button.addToCart}
              </ActionButton>
            </Box>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={PRODUCT_MESSAGES.snackbar.autoHideDuration}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage} {/* Snackbar message */}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default ProductDetailPage;
