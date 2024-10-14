import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { useGetProductsQuery } from "@services/productsApi";
import ProductCard from "../components/ProductCard";
import LoadingGrid from "../components/loaders/LoadingProducts";
import NoDataFound from "../components/NoDataFound";

const ProductListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const search = useSelector((state: RootState) => state.products.searchTerm);
  const limit = 8;

  const { priceRange, selectedCategory, selectedRating } = useSelector(
    (state: RootState) => state.products
  );

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

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setPage(1);
    setProductsList([]);
    setHasMore(true);
  }, [search, priceRange, selectedCategory, selectedRating]);

  useEffect(() => {
    if (products?.data) {
      setProductsList((prevProducts) => {
        if (page === 1) {
          return products.data;
        } else {
          const newProducts = products.data.filter(
            (newProduct) =>
              !prevProducts.some(
                (prevProduct) => prevProduct._id === newProduct._id
              )
          );
          return [...prevProducts, ...newProducts];
        }
      });
      if (products.data.length < limit) {
        setHasMore(false);
      }
    }
  }, [products, page, limit]);

  const handleScroll = () => {
    const container = listRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        !isFetching &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

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

      {error && <Typography color="error">Error loading products</Typography>}
    </Box>
  );
};

export default ProductListPage;
