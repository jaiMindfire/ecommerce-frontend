import {
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const StyledIcon = styled(ShoppingCart)(({ theme }) => ({
  fontSize: "8rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const NoItemsInCart = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="sm">
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item>
          <StyledIcon aria-hidden="true" />
        </Grid>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Your cart is empty
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" align="center">
            Looks like you haven't added any items to your cart yet.
          </Typography>
        </Grid>
        <Grid item>
          <StyledButton
            variant="contained"
            color="primary"
            size="large"
            aria-label="Start shopping"
            onClick={() => navigate("/")}
          >
            Shop Now
          </StyledButton>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default NoItemsInCart;