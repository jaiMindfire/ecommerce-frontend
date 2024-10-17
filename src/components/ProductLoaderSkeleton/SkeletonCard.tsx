//3rd party imports
import { CardContent, Skeleton, Box } from "@mui/material";
import { StyledSkeletonCard } from "./styles";

const SkeletonCard: React.FC = () => {
  return (
    <StyledSkeletonCard>
      <Box position="relative">
        <Skeleton variant="rectangular" width="100%" height={140} />
      </Box>
      <CardContent>
        <Skeleton variant="text" height={30} width="80%" />
        <Skeleton variant="text" height={20} width="60%" />
        <Skeleton variant="text" height={20} width="90%" />
        <Skeleton
          variant="rectangular"
          height={36}
          width="100%"
          sx={{ marginTop: 2 }}
        />
      </CardContent>
    </StyledSkeletonCard>
  );
};

export default SkeletonCard;
