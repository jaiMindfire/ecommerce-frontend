// React Imports
import React, { useEffect, useState, useRef } from "react";
// 3rd Party Imports
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
// Static Imports
import { RootState } from "@store/index";
import { useGetProductsQuery } from "@services/productsApi";
import ProductCard from "@components/ProductCard";
import LoadingGrid from "@components/ProductLoaderSkeleton/LoadingProducts";
import NoDataFound from "@components/NoDataFound";
import { LIMIT, SCROLL_THRESHOLD, PRODUCT_LIST } from "@constants/index";

const ProductListPage: React.FC = () => {
  // States
  const [page, setPage] = useState(1);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Redux states
  const search = useSelector((state: RootState) => state.products.searchTerm);
  const { priceRange, selectedCategory, selectedRating } = useSelector(
    (state: RootState) => state.products
  );

  // Hooks
  const limit = LIMIT;
  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    search,
    page,
    limit,
    priceRange,
    categories: selectedCategory,
    rating: selectedRating,
  });

  // Refs
  const listRef = useRef<HTMLDivElement>(null);

  // Function to handle infinite scroll
  const handleScroll = () => {
    const container = listRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (
        scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD &&
        !isFetching &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  // Function to update the product list
  const updateProductList = (newProducts: any[]) => {
    setProductsList((prevProducts) => {
      if (page === 1) {
        return newProducts;
      } else {
        const filteredProducts = newProducts.filter(
          (newProduct) =>
            !prevProducts.some(
              (prevProduct) => prevProduct._id === newProduct._id
            )
        );
        return [...prevProducts, ...filteredProducts];
      }
    });
  };

  // Effect to reset pagination and product list on filter changes
  useEffect(() => {
    setPage(1);
    setProductsList([]);
    setHasMore(true);
  }, [search, priceRange, selectedCategory, selectedRating]);

  // Effect to update product list based on fetched products
  useEffect(() => {
    if (products?.data) {
      updateProductList(products.data);
      if (products.data.length < limit) {
        setHasMore(false);
      }
    }
  }, [products, page, limit]);

  // Effect to handle scroll event listener
  useEffect(() => {
    const container = listRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isFetching, hasMore]);

  return (
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
      <Grid container spacing={3} width="100%">
        {productsList?.map((product) => (
          <Grid item xs={12} sm={6} md={5} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {isFetching && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <LoadingGrid />
        </Box>
      )}

      {!isFetching && productsList.length === 0 && <NoDataFound />}

      {error && (
        <Typography color="error">{PRODUCT_LIST.errorLoadingProducts}</Typography>
      )}
    </Box>
  );
};

export default ProductListPage;
