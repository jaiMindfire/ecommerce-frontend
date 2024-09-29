import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Skeleton variant="rectangular" width={300} height={200} />
      <Box sx={{ marginTop: 2 }}>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={250} height={30} />
      </Box>
      <Skeleton variant="rounded" width={100} height={40} sx={{ marginTop: 2 }} />
    </Box>
  );
};

export default SkeletonLoader;
