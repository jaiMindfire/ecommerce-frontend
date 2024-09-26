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
import LoadingGrid from "../loaders/LoadingProducts";
import NoDataFound from "../components/NoDataFound";

const ProductListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const search = useSelector((state: RootState) => state.products.searchTerm);
  const location = useLocation();
  const limit = 8;
  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useGetProductsQuery({ search, page, limit });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      {isFetching ? (
        <LoadingGrid/>
      ) : error ? (
        <Typography color="error">Error loading products</Typography>
      ) : products?.data?.length ? (
        <>
          <Grid container spacing={3}>
            {products?.data?.map((product) => (
              <Grid item xs={12} sm={6} md={5} lg={3} key={product._id}>
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
        <NoDataFound />
      )}
    </Box>
  );
};

export default ProductListPage;
