import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetProductsQuery } from "../features/products/productsApi";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";

const ProductListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const search = useSelector((state: RootState) => state.products.searchTerm);
  const location = useLocation();
  const limit = 4;
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({ search, page, limit });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error loading products</Typography>
      ) : location.pathname === "/" ? (
        <>
          <Grid container spacing={3}>
            {products?.data?.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil((products?.pagination?.totalItems || 0) / limit)}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </>
      ) : (
        <ProductDetailPage />
      )}
    </Box>
  );
};

export default ProductListPage;
