//3rd party imports
import { Grid } from "@mui/material";
//static imports
import SkeletonCard from "@components/Products/ProductLoaderSkeleton/SkeletonCard";

//Loading skeleton while products are loading
const LoadingGrid: React.FC = () => {
  const loadingItems = Array.from({ length: 8 });
  return (
    <Grid container spacing={3}>
      {loadingItems.map((_, index) => (
        <Grid item xs={12} sm={6} md={5} lg={3} key={index}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingGrid;
