"use client";
// React Imports
import React, { useEffect, useState, useRef } from "react";
// 3rd Party Imports
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useSelector } from "react-redux";
// Static Imports
import { RootState } from "@store/index";
import ProductCard from "@components/ProductCard";
import LoadingGrid from "@components/ProductLoaderSkeleton/LoadingProducts";
import NoDataFound from "@components/NoDataFound";
import { LIMIT, SCROLL_THRESHOLD, PRODUCT_LIST } from "@constants/index";
import { PaginatedProductsResponse } from "@models/prodctsType";
import setParams from "@utils/setParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ThemeProvider } from "@mui/system";

const ProductListPage: React.FC<{
  products: PaginatedProductsResponse | undefined;
}> = ({ products }) => {
  // States
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // Redux states
  const search = useSelector((state: RootState) => state.products.searchTerm);
  const { priceRange, selectedCategory, selectedRating } = useSelector(
    (state: RootState) => state.products
  );
  const theme = useSelector((state: RootState) => state.theme.theme);
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const limit = LIMIT;

  // Refs
  const listRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setLoading(true);
    setPage(value);
    setParams(searchParams, value, replace, pathname, "page");
  };

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={listRef}
        sx={{
          p: 3,
          width: "100%",
          overflowY: "auto",
          maxHeight: "90vh",
          "&::-webkit-scrollbar": { width: "10px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
          },
        }}
      >
        {!loading ? (
          <>
            <Grid container spacing={3} width="100%">
              {products?.data?.map((product) => (
                <Grid item xs={12} sm={6} md={5} lg={3} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={Math.ceil(
                  (products?.pagination?.totalItems || 0) / limit
                )}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
        ) : null}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <LoadingGrid />
          </Box>
        )}

        {products?.data?.length === 0 && <NoDataFound />}

        {/* {error && (
        <Typography color="error">
          {PRODUCT_LIST.errorLoadingProducts}
        </Typography>
      )} */}
      </Box>
    </ThemeProvider>
  );
};

export default ProductListPage;
