//3rd Party Imports
import { Box, Typography, Paper, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Search } from "@mui/icons-material";

//Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  }
}));

const AnimatedTypography = styled(Typography)({
  animation: "fadeIn 1.5s ease-in-out",
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(-20px)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  }
});

const NoDataFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default"
      }}
    >
      <StyledPaper elevation={3}>
        <IconButton
          aria-label="No data found icon"
          sx={{ mb: 2, fontSize: "3rem", color: "text.secondary" }}
        >
          <Search style={{fontSize: '60px'}} />
        </IconButton>
        <AnimatedTypography
          variant="h4"
          gutterBottom
          color="text.primary"
          fontWeight="bold"
        >
          No Data Found
        </AnimatedTypography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 2, maxWidth: "80%" }}
        >
          We couldn't find any data matching your request. Please try again or adjust your search criteria.
        </Typography>
      </StyledPaper>
    </Box>
  );
};

export default NoDataFound;