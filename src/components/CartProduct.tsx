import React from "react";
import { Add, Remove, Delete } from "@mui/icons-material";
import { CartItem } from "../models/cartTypes";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  styled,
  useTheme,
  CircularProgress,
} from "@mui/material";

interface CartItemProps {
  item: CartItem;
  handleUpdateQuantity: (quantity: number, originalQuantity: number) => void;
  onRemove: (productId: string) => void;
  isLoading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: theme.shadows[5],
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 200,
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  paddingLeft: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const QuantityControl = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(2),
}));

const CartProduct: React.FC<CartItemProps> = ({
  item,
  handleUpdateQuantity,
  onRemove,
  isLoading
}) => {
  const theme = useTheme();

  return (
    <StyledCard>
      <StyledCardMedia
        image={item.product?.imageUrl}
        aria-label={`Image of ${item.product?.name}`}
      />
      <StyledCardContent>
        <Box>
          <Typography variant="h6" component="div" gutterBottom>
            {item.product?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Price: ${item.product?.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Total: ${(item.product?.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
        <QuantityControl>
          <IconButton
            onClick={() =>
              handleUpdateQuantity(item.quantity - 1, item.quantity)
            }
            aria-label="Decrease quantity"
            size="small"
            sx={{
              backgroundColor: theme.palette.grey[200],
              "&:hover": {
                backgroundColor: theme.palette.grey[300],
              },
            }}
          >
            <Remove />
          </IconButton>
          <Typography
            sx={{
              margin: "0 10px",
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {item.quantity}
          </Typography>
          <IconButton
            onClick={() =>
              handleUpdateQuantity(item.quantity + 1, item.quantity)
            }
            aria-label="Increase quantity"
            size="small"
            sx={{
              backgroundColor: theme.palette.grey[200],
              "&:hover": {
                backgroundColor: theme.palette.grey[300],
              },
            }}
          >
            <Add />
          </IconButton>
        </QuantityControl>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={() => onRemove(item.product?._id)}
          sx={{ marginTop: 2 }}
          aria-label={`Remove ${item.product?.name} from cart`}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Remove"}
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};

export default CartProduct;
