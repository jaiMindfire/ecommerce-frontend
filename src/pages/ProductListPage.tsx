import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetProductsQuery } from "../features/products/productsApi";
import ProductCard from "../components/ProductCard";
import LoadingGrid from "../loaders/LoadingProducts";
import NoDataFound from "../components/NoDataFound";

const ProductListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const search = useSelector((state: RootState) => state.products.searchTerm);
  const limit = 8;

  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    search,
    page,
    limit,
  });


  useEffect(() => {
    setPage(1);
    setProductsList([]);
    setHasMore(true);
  }, [search]);


  useEffect(() => {
    if (products?.data) {
      setProductsList((prevProducts) => {
        if (page === 1) {
          return products.data;
        } else {

          const newProducts = products.data.filter(
            (newProduct) =>
              !prevProducts.some((prevProduct) => prevProduct._id === newProduct._id)
          );
          return [...prevProducts, ...newProducts];
        }
      });
      if (products.data.length < limit) {
        setHasMore(false); // No more data to fetch
      }
    }
  }, [products, page, limit]);

  // Infinite scroll event
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight  &&
      !isFetching &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, hasMore]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
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
