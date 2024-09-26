import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  styled,
} from "@mui/material";
import { Shop, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/products/productsApi";

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

const ProductDetailPage = () => {
  //   const product = useSelector((state: RootState) => state.products.selectedProduct);
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id || "");

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <ProductImage
              //   component="img"
              image={product?.imageUrl}
              //   alt={product.name}
            />
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
              startIcon={<ShoppingCartIcon />}
              disabled={product?.stock === 0}
            >
              Add to Cart
            </ActionButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailPage;
